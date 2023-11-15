const httpStatus = require("http-status");

const models = require("../../models");
const { succesResponse } = require("../../utils/api_formatter.util");
const catchAsync = require("../../utils/catch_async.util");
const getSessionAccessData = require("../../utils/session_data.util");
const { listPromoResponse } = require("../../dtos/stand-admin/promo.dto");
const {
	listOrderTransactionResponse,
} = require("../../dtos/stand-admin/order_transaction.dto");

const StandModel = models.Stand;
const OrderTransactionModel = models.OrderTransaction;
const OrderItemModel = models.OrderItem;
const UserModel = models.User;
const ProductModel = models.Product;

const indexController = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);

	const standData = await StandModel.findOne({
		where: {
			company_id: accessData.CID,
			admin_user_id: accessData.UID,
		},
	});
	console.log(standData);
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
			stand_id: standData.id,
		},
	});

	const response = listOrderTransactionResponse(data);
	res
		.status(httpStatus.OK)
		.json(succesResponse(response, httpStatus["200_NAME"], httpStatus.OK));
});

module.exports = {
	indexController,
};
