const httpStatus = require("http-status");

const models = require("../../models");
const { succesResponse } = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");
const getSessionAccessData = require("../../utils/session_data.util");
const {
	listStandResponse,
	storeStandInput,
	singleStandResponse,
	updateStandInput,
	assignStandAdminInput,
} = require("../../dtos/company-admin/stand.dto");

const StandModel = models.Stand;
const UserModel = models.User;
const CanteenModel = models.Canteen;
const UserHasRoleModel = models.UserHasRole;

const indexController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);

	const data = await StandModel.findAll({
		include: [
			{
				model: UserModel,
				where: {
					company_id: accessData.CID,
				},
				required: false, //LEFT OUTER JOIN
			},
			{
				model: CanteenModel,
				where: {
					company_id: accessData.CID,
				},
				required: true, //INNER JOIN
			},
		],
		where: {
			company_id: accessData.CID,
		},
	});

	const response = listStandResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const storeController = catchAsync(async (req, res) => {
	const validatedInput = await storeStandInput.validate(req.body, {
		abortEarly: false,
	});

	const accessData = await getSessionAccessData(req);

	const createdCompany = await StandModel.create({
		...validatedInput,
		company_id: accessData.CID,
	});

	const response = singleStandResponse(createdCompany);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const showController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const accessData = await getSessionAccessData(req);
	const data = await StandModel.findOne({
		include: [
			{
				model: UserModel,
				where: {
					company_id: accessData.CID,
				},
				required: false, //LEFT OUTER JOIN
			},
			{
				model: CanteenModel,
				where: {
					company_id: accessData.CID,
				},
				required: true, //INNER JOIN
			},
		],
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!data) {
		throw new Error("Record not found");
	}

	const response = singleStandResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const updateController = catchAsync(async (req, res) => {
	const validatedInput = await updateStandInput.validate(req.body, {
		abortEarly: false,
	});

	const { company_id, ...excludeCompanyInput } = validatedInput;

	const { id } = req.params;

	const accessData = await getSessionAccessData(req);

	const result = await StandModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await StandModel.update(
		{ ...excludeCompanyInput },
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

	const result = await StandModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await StandModel.destroy({
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

const assignStandAdminController = catchAsync(async (req, res) => {
	const validatedInput = await assignStandAdminInput.validate(req.body, {
		abortEarly: false,
	});

	const { id } = req.params;
	const { user_id } = validatedInput;

	const accessData = await getSessionAccessData(req);

	await models.sequelize.transaction(async (t) => {
		try {
			const result = await StandModel.findOne({
				where: {
					id: id,
					company_id: accessData.CID,
				},
				transaction: t,
			});

			if (!result) {
				throw new Error("Record not found");
			}
			const data = await StandModel.update(
				{ admin_user_id: user_id },
				{
					where: {
						id: id,
						company_id: accessData.CID,
					},
					transaction: t,
				}
			);
			await UserHasRoleModel.create(
				{
					user_id: user_id,
					role_id: 2,
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
	assignStandAdminController,
};
