const httpStatus = require("http-status");

const models = require("../models");
const { succesResponse } = require("../utils/api_formatter.util");
const catchAsync = require("../utils/catch_async.util");
const getSessionAccessData = require("../utils/session_data.util");
const { listStandResponse } = require("../dtos/company-admin/stand.dto");
const {
	listOrderTransactionResponse,
} = require("../dtos/stand-admin/order_transaction.dto");
const { listProductResponse } = require("../dtos/stand-admin/product.dto");

const StandModel = models.Stand;
const CanteenModel = models.Canteen;
const UserModel = models.User;
const OrderTransactionModel = models.OrderTransaction;
const OrderItemModel = models.OrderItem;
const ProductModel = models.Product;

const listStandByCanteenController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);
	const { id } = req.params;
	const standData = await StandModel.findAll({
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
			canteen_id: id,
		},
	});
	if (!standData) {
		throw new Error("Stand not found");
	}

	const response = listStandResponse(standData);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});
const listProductByStandController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);
	const { id } = req.params;
	const standData = await StandModel.findOne({
		where: {
			company_id: accessData.CID,
			id: id,
		},
	});
	if (!standData) {
		throw new Error("Stand not found");
	}
	const data = await ProductModel.findAll({
		where: {
			stand_id: standData.id,
			company_id: accessData.CID,
		},
	});

	const response = listProductResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

const listMyTranscation = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);
	const { id } = req.params;
	const data = await OrderTransactionModel.findAll({
		include: [
			UserModel,
			StandModel,
			{
				model: OrderItemModel,
				include: [ProductModel],
				required: true,
			},
		],
		where: {
			company_id: accessData.CID,
			user_id: accessData.UID,
		},
	});

	const response = listOrderTransactionResponse(data);

	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

module.exports = {
	listStandByCanteenController,
	listMyTranscation,
	listProductByStandController,
};
