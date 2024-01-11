const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const {
	succesResponse,
	errorResponse,
} = require("../utils/api_formatter.util");
const catchAsync = require("../utils/catch_async.util");
const {
	loginInput,
	registerInput,
	registerResponse,
	verifyAuthTokenOtpInput,
	authorizeUserInput,
} = require("../dtos/auth.dto");
const redisClient = require("../config/redis.config");

const JWT_OTP_SECRET = process.env.JWT_OTP_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const UserModel = models.User;
const CompanyModel = models.Company;

const loginController = catchAsync(async (req, res) => {
	await loginInput.validate(req.body, { abortEarly: false });
	const { email, password } = req.body;

	const userData = await UserModel.findOne({
		where: {
			email: email,
		},
	});

	if (!userData) {
		res.status(400).json({
			code: 400,
			error: "Email not found",
		});
		return;
	}

	const isValidPassword = await bcrypt.compare(password, userData.password);

	const expireTTL = 60 * 5;
	if (isValidPassword) {
		const token = jwt.sign(
			{
				UID: userData.id,
			},
			JWT_OTP_SECRET,
			{
				expiresIn: expireTTL,
				algorithm: "HS512",
			}
		);

		const base64token = Buffer.from(token).toString("base64");

		const redis = await redisClient();
		// const otp = Math.floor(Math.random() * 99999);
		const otp = 12345;

		await redis.set(`user:${userData.id}:otp:auth`, otp, {
			EX: expireTTL,
		});
		await redis.set(`user:${userData.id}:token:otp-key-token`, base64token, {
			EX: expireTTL,
		});

		res.status(httpStatus.OK).json(
			succesResponse(
				{
					otp_access_key: base64token,
				},
				httpStatus["200_NAME"],
				httpStatus.OK
			)
		);
	} else {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse("Password not match", httpStatus.FORBIDDEN));
	}
});

const checkAuthOtpTokenController = catchAsync(async (req, res) => {
	await verifyAuthTokenOtpInput.validate(req.body, { abortEarly: false });
	const { token } = req.body;

	let buff = new Buffer(token, "base64");
	let text = buff.toString("ascii");
	const decodedToken = text;

	const tokenData = jwt.verify(
		decodedToken,
		process.env.JWT_OTP_SECRET,
		(err, data) => {
			if (err) {
				res
					.status(httpStatus.FORBIDDEN)
					.json(errorResponse("ERR::1::TOKEN FORBIDDEN", httpStatus.FORBIDDEN));
				return;
			} else {
				return data;
			}
		}
	);

	const redis = await redisClient();
	const savedAuthToken = await redis.get(
		`user:${tokenData.UID}:token:otp-key-token`
	);
	if (!savedAuthToken) {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse("ERR::2::TOKEN INVALID", httpStatus.FORBIDDEN));
		return;
	}
	if (savedAuthToken !== token) {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse("ERR::3::TOKEN NOT MATCH", httpStatus.FORBIDDEN));
		return;
	}

	res.status(httpStatus.OK).json(
		succesResponse(
			{
				verified: true,
			},
			httpStatus["200_NAME"],
			httpStatus.OK
		)
	);
});

const authorizeUserController = catchAsync(async (req, res) => {
	await authorizeUserInput.validate(req.body, { abortEarly: false });
	const { token, otp } = req.body;
	let buff = new Buffer(token, "base64");
	let text = buff.toString("ascii");
	const decodedToken = text;

	// CHECK AUTH TOKEN
	let isVerified = false;
	const tokenData = jwt.verify(
		decodedToken,
		process.env.JWT_OTP_SECRET,
		(err, data) => {
			if (err) {
				res
					.status(httpStatus.FORBIDDEN)
					.json(errorResponse("ERR::1::TOKEN FORBIDDEN", httpStatus.FORBIDDEN));
				return;
			} else {
				isVerified = true;
				return data;
			}
		}
	);
	if (isVerified != true) {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse(httpStatus["403_NAME"], httpStatus.FORBIDDEN));
		return;
	}

	// GET USER
	const userData = await UserModel.findOne({
		where: {
			id: tokenData.UID,
		},
	});

	if (!userData) {
		res
			.status(httpStatus.BAD_REQUEST)
			.json(errorResponse("ERR::2::USER NOT FOUND", httpStatus.BAD_REQUEST));
		return;
	}

	// VERIFY AUTH TOKEN
	const redis = await redisClient();
	const savedAuthToken = await redis.get(
		`user:${tokenData.UID}:token:otp-key-token`
	);
	if (!savedAuthToken) {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse("ERR::3::TOKEN INVALID", httpStatus.FORBIDDEN));
		return;
	}
	if (savedAuthToken !== token) {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse("ERR::4::TOKEN NOT MATCH", httpStatus.FORBIDDEN));
		return;
	}

	// GET OTP ON REDIS
	const savedOtp = await redis.get(`user:${userData.id}:otp:auth`);
	if (!savedOtp) {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse("ERR::5::OTP INVALID", httpStatus.FORBIDDEN));
		return;
	}

	if (parseInt(savedOtp) !== otp) {
		res
			.status(httpStatus.FORBIDDEN)
			.json(errorResponse("OTP NOT MATCH", httpStatus.FORBIDDEN));
		return;
	}

	// GENERATE ACCESS TOKEN
	const expireAccessToken = 60 * 60 * 10;
	const accessToken = jwt.sign(
		{
			UID: userData.id,
			CID: userData.company_id,
		},
		JWT_SECRET,
		{
			expiresIn: expireAccessToken,
			algorithm: "HS512",
		}
	);

	// INVALIDATE THE OTP AND AUTH TOKEN
	await redis.del(`user:${userData.id}:otp:auth`);
	await redis.del(`user:${tokenData.UID}:token:otp-key-token`);

	res.status(httpStatus.OK).json(
		succesResponse(
			{
				expiresIn: expireAccessToken,
				accessToken: accessToken,
			},
			httpStatus["200_NAME"],
			httpStatus.OK
		)
	);
});

const registerController = catchAsync(async (req, res) => {
	await registerInput.validate(req.body, { abortEarly: false });
	const { email, password, full_name, address, contact_number, company_id } =
		req.body;

	// CHECK VALID COMPANY
	const companyData = await CompanyModel.findOne({
		where: {
			id: company_id,
		},
	});
	if (!companyData) {
		res
			.status(httpStatus.BAD_REQUEST)
			.json(errorResponse("Invalid Company", httpStatus.BAD_REQUEST));
		return;
	}
	// CHECK USER IS REGISTERED
	const userData = await UserModel.findOne({
		where: {
			email: email,
			company_id: company_id,
		},
	});
	if (userData) {
		res
			.status(httpStatus.BAD_REQUEST)
			.json(errorResponse("Already Registered", httpStatus.BAD_REQUEST));
		return;
	}
	// HASH PASSWORD
	const hashedPassword = await bcrypt.hash(password, 10);
	// INSERT USER
	const createdData = await UserModel.create({
		email,
		full_name,
		address,
		contact_number,
		company_id,
		password: hashedPassword,
	});

	const response = registerResponse(createdData);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

module.exports = {
	loginController,
	registerController,
	checkAuthOtpTokenController,
	authorizeUserController,
};
