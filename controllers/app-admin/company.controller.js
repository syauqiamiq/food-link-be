const httpStatus = require("http-status");
const {
	listCompanyResponse,
	storeCompanyInput,
	singleCompanyResponse,
	updateCompanyInput,
	listCompanyUserResponse,
	assignCompanyAdminInput,
} = require("../../dtos/app-admin/company.dto");
const models = require("../../models");
const {
	succesResponse,
	errorResponse,
} = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");

const CompanyModel = models.Company;
const UserModel = models.User;
const UserHasRoleModel = models.UserHasRole;

const indexController = catchAsync(async (req, res) => {
	const data = await CompanyModel.findAll({
		include: [UserModel],
	});

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
		include: [UserModel],
		where: {
			id: id,
		},
	});

	if (!data) {
		throw new Error("Record not found");
	}

	const response = singleCompanyResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const updateController = catchAsync(async (req, res) => {
	await updateCompanyInput.validate(req.body, { abortEarly: false });
	const { id } = req.params;

	const result = await CompanyModel.findOne({
		where: {
			id: id,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

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

	const result = await CompanyModel.findOne({
		where: {
			id: id,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

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

const assignCompanyAdminController = catchAsync(async (req, res) => {
	await assignCompanyAdminInput.validate(req.body, { abortEarly: false });

	const { id } = req.params;
	const { user_id, role_id } = req.body;
	await models.sequelize.transaction(async (t) => {
		try {
			const result = await CompanyModel.findOne({
				where: {
					id: id,
				},
				transaction: t,
			});

			if (!result) {
				throw new Error("Record not found");
			}
			const data = await CompanyModel.update(
				{ admin_user_id: user_id },
				{
					where: {
						id: id,
					},
					transaction: t,
				}
			);
			await UserHasRoleModel.create(
				{
					user_id: user_id,
					role_id: role_id,
				},
				{ transaction: t }
			);
			return data;
		} catch (error) {
			throw error;
		}
	});

	res
		.status(httpStatus.OK)
		.json(
			succesResponse(
				"Successfully assign company admin",
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
	listCompanyUserController,
	assignCompanyAdminController,
};
