const httpStatus = require("http-status");
const {
	listCompanyResponse,
	storeCompanyInput,
	singleCompanyResponse,
	updateCompanyInput,
	listCompanyUserResponse,
} = require("../../dtos/app-admin/company.dto");
const models = require("../../models");
const { succesResponse } = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");

const CompanyModel = models.Company;
const UserModel = models.User;

const indexController = catchAsync(async (req, res) => {
	const data = await CompanyModel.findAll();

	const response = listCompanyResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const storeController = catchAsync(async (req, res) => {
	await storeCompanyInput.validate(req.body, { abortEarly: false });

	const createdCompany = await CompanyModel.create({
		...req.body,
	});

	const response = singleCompanyResponse(createdCompany);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const showController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const data = await CompanyModel.findOne({
		where: {
			id: id,
		},
	});

	const response = singleCompanyResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const updateController = catchAsync(async (req, res) => {
	await updateCompanyInput.validate(req.body, { abortEarly: false });
	const { id } = req.params;

	await CompanyModel.update(
		{ ...req.body },
		{
			where: {
				id: id,
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

	await CompanyModel.destroy({
		where: {
			id: id,
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

const listCompanyUserController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const data = await UserModel.findAll({
		where: {
			company_id: id,
		},
	});

	const response = listCompanyUserResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

module.exports = {
	indexController,
	storeController,
	showController,
	updateController,
	deleteController,
	listCompanyUserController,
};
