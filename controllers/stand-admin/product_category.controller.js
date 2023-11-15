const httpStatus = require("http-status");

const models = require("../../models");
const { succesResponse } = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");
const getSessionAccessData = require("../../utils/session_data.util");
const {
	listProductCategoryResponse,
	storeProductCategoryInput,
	singleProductCategoryResponse,
	updateProductCategoryInput,
} = require("../../dtos/stand-admin/product_category.dto");

const ProductCategoryModel = models.ProductCategory;

const indexController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);

	const data = await ProductCategoryModel.findAll({
		where: {
			company_id: accessData.CID,
		},
	});

	const response = listProductCategoryResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const storeController = catchAsync(async (req, res) => {
	const validatedInput = await storeProductCategoryInput.validate(req.body, {
		abortEarly: false,
	});

	const accessData = await getSessionAccessData(req);

	const createdCompany = await ProductCategoryModel.create({
		...validatedInput,
		company_id: accessData.CID,
	});

	const response = singleProductCategoryResponse(createdCompany);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const showController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const accessData = await getSessionAccessData(req);
	const data = await ProductCategoryModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!data) {
		throw new Error("Record not found");
	}

	const response = singleProductCategoryResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const updateController = catchAsync(async (req, res) => {
	const validatedInput = await updateProductCategoryInput.validate(req.body, {
		abortEarly: false,
	});

	const { company_id, ...excludeCompanyInput } = validatedInput;

	const { id } = req.params;

	const accessData = await getSessionAccessData(req);

	const result = await ProductCategoryModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await ProductCategoryModel.update(
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

	const result = await ProductCategoryModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await ProductCategoryModel.destroy({
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
