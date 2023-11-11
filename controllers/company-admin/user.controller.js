const httpStatus = require("http-status");

const models = require("../../models");
const { succesResponse } = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");
const getSessionAccessData = require("../../utils/session_data.util");
const bcrypt = require("bcrypt");

const {
	listUserResponse,
	storeUserInput,
	singleUserResponse,
	updateUserInput,
} = require("../../dtos/company-admin/user.dto");

const UserModel = models.User;

const indexController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);

	const data = await UserModel.findAll({
		where: {
			company_id: accessData.CID,
		},
	});

	const response = listUserResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const storeController = catchAsync(async (req, res) => {
	const validatedInput = await storeUserInput.validate(req.body, {
		abortEarly: false,
	});

	const accessData = await getSessionAccessData(req);

	const { password } = validatedInput;
	// HASH PASSWORD
	const hashedPassword = await bcrypt.hash(password, 10);

	const createdCompany = await UserModel.create({
		...validatedInput,
		company_id: accessData.CID,
		password: hashedPassword,
	});

	const response = singleUserResponse(createdCompany);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const showController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const accessData = await getSessionAccessData(req);
	const data = await UserModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!data) {
		throw new Error("Record not found");
	}

	const response = singleUserResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const updateController = catchAsync(async (req, res) => {
	const validatedInput = await updateUserInput.validate(req.body, {
		abortEarly: false,
	});

	const { password, company_id, ...excludeInput } = validatedInput;

	const { id } = req.params;

	const accessData = await getSessionAccessData(req);

	const result = await UserModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await UserModel.update(
		{ ...excludeInput },
		{
			where: {
				id: id,
				company_id: accessData.CID,
			},
		}
	);

	res
		.status(httpStatus.OK)
		.json(
			succesResponse(
				"Successfully update the data",
				httpStatus["200_NAME"],
				httpStatus.OK
			)
		);
});

const deleteController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const accessData = await getSessionAccessData(req);

	const result = await UserModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await UserModel.destroy({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	res
		.status(httpStatus.OK)
		.json(
			succesResponse(
				"Successfully delete the data",
				httpStatus["200_NAME"],
				httpStatus.OK
			)
		);
});

module.exports = {
	indexController,
	storeController,
	showController,
	updateController,
	deleteController,
};
