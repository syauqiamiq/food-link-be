const httpStatus = require("http-status");

const models = require("../../models");
const { succesResponse } = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");
const getSessionAccessData = require("../../utils/session_data.util");
const {
	listPromoResponse,
	storePromoInput,
	singlePromoResponse,
	updatePromoInput,
} = require("../../dtos/stand-admin/promo.dto");

const PromoModel = models.Promo;

const indexController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);

	const data = await PromoModel.findAll({
		where: {
			company_id: accessData.CID,
		},
	});

	const response = listPromoResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const storeController = catchAsync(async (req, res) => {
	const validatedInput = await storePromoInput.validate(req.body, {
		abortEarly: false,
	});

	const accessData = await getSessionAccessData(req);

	const createdCompany = await PromoModel.create({
		...validatedInput,
		company_id: accessData.CID,
	});

	const response = singlePromoResponse(createdCompany);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const showController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const accessData = await getSessionAccessData(req);
	const data = await PromoModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!data) {
		throw new Error("Record not found");
	}

	const response = singlePromoResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const updateController = catchAsync(async (req, res) => {
	const validatedInput = await updatePromoInput.validate(req.body, {
		abortEarly: false,
	});

	const { company_id, ...excludeCompanyInput } = validatedInput;

	const { id } = req.params;

	const accessData = await getSessionAccessData(req);

	const result = await PromoModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await PromoModel.update(
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

	const result = await PromoModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await PromoModel.destroy({
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
