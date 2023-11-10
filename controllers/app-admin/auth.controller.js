const models = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const {
	succesResponse,
	errorResponse,
} = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");
const { appAdminLoginInput } = require("../../dtos/app-admin/auth.dto");

const JWT_SECRET = process.env.JWT_SECRET;
const UserAdminModel = models.UserAdmin;

const appAdminLoginController = catchAsync(async (req, res) => {
	await appAdminLoginInput.validate(req.body, { abortEarly: false });
	const { email, password } = req.body;

	const userData = await UserAdminModel.findOne({
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
module.exports = {
	appAdminLoginController,
};
