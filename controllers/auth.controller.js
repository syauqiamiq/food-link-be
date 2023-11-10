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
} = require("../dtos/auth.dto");

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

	const expireToken = 60 * 60 * 10;
	if (isValidPassword) {
		const token = jwt.sign(
			{
				UID: userData.id,
			},
			JWT_SECRET,
			{
				expiresIn: expireToken,
				algorithm: "HS512",
			}
		);

		res.status(httpStatus.OK).json(
			succesResponse(
				{
					access_token: token,
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
};
