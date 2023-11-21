const httpStatus = require("http-status");
const models = require("../../models");
const { v4: uuidv4 } = require("uuid");

const {
	succesResponse,
	errorResponse,
} = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");
const getSessionAccessData = require("../../utils/session_data.util");
const {
	listProductResponse,
	storeProductInput,
	singleProductResponse,
	updateProductInput,
	storeProductImageInput,
} = require("../../dtos/stand-admin/product.dto");
const uploadFileMiddleware = require("../../middleware/multer.middleware");
const minioConfig = require("../../config/s3.config");
const { uploadMinioStorage } = require("../../utils/minio.util");

const ProductModel = models.Product;
const ProductImageModel = models.ProductImage;

const indexController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);

	const data = await ProductModel.findAll({
		where: {
			company_id: accessData.CID,
		},
	});

	const response = listProductResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const storeController = catchAsync(async (req, res) => {
	const validatedInput = await storeProductInput.validate(req.body, {
		abortEarly: false,
	});

	const accessData = await getSessionAccessData(req);

	const createdCompany = await ProductModel.create({
		...validatedInput,
		company_id: accessData.CID,
	});

	const response = singleProductResponse(createdCompany);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const showController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const accessData = await getSessionAccessData(req);
	const data = await ProductModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!data) {
		throw new Error("Record not found");
	}

	const response = singleProductResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const updateController = catchAsync(async (req, res) => {
	const validatedInput = await updateProductInput.validate(req.body, {
		abortEarly: false,
	});

	const { company_id, ...excludeCompanyInput } = validatedInput;

	const { id } = req.params;

	const accessData = await getSessionAccessData(req);

	const result = await ProductModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await ProductModel.update(
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

	const result = await ProductModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!result) {
		throw new Error("Record not found");
	}

	await ProductModel.destroy({
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

const uploadProductImageController = catchAsync(async (req, res) => {
	const { id } = req.params;

	const accessData = await getSessionAccessData(req);
	if (req.file == undefined) {
		return res.status(400).send({ message: "Please upload a file!" });
	}

	const data = await ProductModel.findOne({
		where: {
			id: id,
			company_id: accessData.CID,
		},
	});

	if (!data) {
		throw new Error("Record not found");
	}

	const file = req.file;
	const tempPath = file.path;
	const originalFileName = file.originalname;
	const uniqueFilename = `${uuidv4()}-${file.filename}`;
	const remotePath = `product/${id}/image/${uniqueFilename}`;

	const transaction = await models.sequelize.transaction();
	try {
		await ProductImageModel.create(
			{
				company_id: accessData.CID,
				product_id: id,
				document_name: originalFileName,
				path: remotePath,
			},
			{ transaction }
		);
		await uploadMinioStorage("foodlink-bucket-dev", remotePath, tempPath);
		await transaction.commit();
	} catch (error) {
		await transaction.rollback();
		res
			.status(httpStatus.BAD_REQUEST)
			.json(
				errorResponse(
					"Failed to upload file",
					httpStatus.BAD_REQUEST,
					error.message
				)
			);
		return;
	}

	res
		.status(httpStatus.OK)
		.json(
			succesResponse(
				"Successfully upload the file",
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
	uploadProductImageController,
};
