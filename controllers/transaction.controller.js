const httpStatus = require("http-status");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const crypto = require("crypto");

require("dotenv").config();
const midtransClient = require("midtrans-client");
const models = require("../models");
const {
	succesResponse,
	errorResponse,
} = require("../utils/api_formatter.util");
const catchAsync = require("../utils/catch_async.util");
const getSessionAccessData = require("../utils/session_data.util");
const { listStandResponse } = require("../dtos/company-admin/stand.dto");
const {
	listOrderTransactionResponse,
} = require("../dtos/stand-admin/order_transaction.dto");

const { storeTransactionInput } = require("../dtos/transaction.dto");
const { format } = require("date-fns");

const StandModel = models.Stand;
const CanteenModel = models.Canteen;
const UserModel = models.User;
const OrderTransactionModel = models.OrderTransaction;
const OrderItemModel = models.OrderItem;
const ProductModel = models.Product;

const createTransaction = catchAsync(async (req, res) => {
	const accessData = await getSessionAccessData(req);
	const { id } = req.params;

	// VALIDATE INPUT
	const validatedInput = await storeTransactionInput.validate(req.body, {
		abortEarly: false,
	});

	const createdTransactionData = await models.sequelize.transaction(
		async (t) => {
			try {
				// CREATE TRANSACTION
				const createdTransactionData = await OrderTransactionModel.create(
					{
						company_id: accessData.CID,
						transaction_identity: uuidv4(),
						stand_id: validatedInput.stand_id,
						user_id: accessData.UID,
						payment_status: "PENDING",
					},
					{ transaction: t }
				);
				// CREATE TRANSACTION ITEM
				let arrayItem = [];
				validatedInput.order_item.forEach((v) => {
					arrayItem.push({
						company_id: accessData.CID,
						order_transaction_id: createdTransactionData.id,
						product_name: v.product_name,
						quantity: v.quantity,
						price: v.price,
					});
				});
				const createdTransactionItemData = await OrderItemModel.bulkCreate(
					arrayItem,
					{
						transaction: t,
					}
				);

				return {
					transaction: createdTransactionData,
					transaction_items: createdTransactionItemData,
				};
			} catch (error) {
				throw error;
			}
		}
	);

	// CHARGE WITH PAYMENT GATEWAY
	const userData = await UserModel.findOne({
		where: {
			id: accessData.UID,
			company_id: accessData.CID,
		},
	});

	if (!userData) {
		throw new Error("User not found");
	}

	let grossAmount = 0;
	let itemDetailData = [];
	createdTransactionData.transaction_items.forEach((v) => {
		itemDetailData.push({
			id: v.id,
			price: v.price,
			quantity: v.quantity,
			name: v.product_name,
		});
		const fixedAmount = v.price * v.quantity;
		grossAmount += fixedAmount;
	});

	let parameter = {
		transaction_details: {
			order_id: createdTransactionData.transaction.transaction_identity,
			gross_amount: grossAmount,
		},
		credit_card: {
			secure: true,
		},
		item_details: itemDetailData,
		customer_details: {
			first_name: userData.full_name,
			email: userData.email,
			phone: userData.contact_number,
		},
		expiry: {
			start_time: format(new Date(), "yyyy-MM-dd HH:mm:ss XXXX"),
			unit: "minutes",
			duration: 15,
		},
	};

	// Create Snap API instance
	let snap = new midtransClient.Snap({
		// Set to true if you want Production Environment (accept real transaction).
		isProduction: false,
		serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY,
	});

	const transaction = await snap.createTransaction(parameter);

	// RETURN SNAP TOKEN
	res
		.status(httpStatus.OK)
		.json(succesResponse(transaction, httpStatus["200_NAME"], httpStatus.OK));
});

const midtransCallbackController = catchAsync(async (req, res) => {
	const { id } = req.params;
	const { key } = req.query;

	// VALIDATE KEY
	if (key !== process.env.MIDTRANS_INTERNAL_CALLBACK_KEY) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(errorResponse("KEY NOT VALID", httpStatus.INTERNAL_SERVER_ERROR));
		return;
	}

	// Create Core API / Snap instance (both have shared `transactions` methods)
	let apiClient = new midtransClient.Snap({
		isProduction: false,
		serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY,
		clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY,
	});
	const notificationJson = req.body;
	const statusResponse = await apiClient.transaction.notification(
		notificationJson
	);
	let orderId = statusResponse.order_id;
	let transactionStatus = statusResponse.transaction_status;
	let fraudStatus = statusResponse.fraud_status;

	console.log(
		`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
	);

	if (transactionStatus == "capture") {
		if (fraudStatus == "accept") {
			// TODO set transaction status on your database to 'success'
			// and response with 200 OK
			const updateData = await OrderTransactionModel.update(
				{
					payment_status: "SUCCESS",
					stand_status: "WAITING_CONFIRMATION",
				},
				{
					where: {
						transaction_identity: orderId,
					},
				}
			);
			console.log("ORDER_TRANSACTION PAYMENT STATUS UPDATED TO: SUCCESS");
		}
	} else if (transactionStatus == "settlement") {
		// TODO set transaction status on your database to 'success'
		// and response with 200 OK
		await OrderTransactionModel.update(
			{
				payment_status: "SUCCESS",
				stand_status: "WAITING_CONFIRMATION",
			},
			{
				where: {
					transaction_identity: orderId,
				},
			}
		);
		console.log("ORDER_TRANSACTION PAYMENT STATUS UPDATED TO: SUCCESS");
	} else if (
		transactionStatus == "cancel" ||
		transactionStatus == "deny" ||
		transactionStatus == "expire"
	) {
		// TODO set transaction status on your database to 'failure'
		// and response with 200 OK
		await OrderTransactionModel.update(
			{
				payment_status: "FAILURE",
			},
			{
				where: {
					transaction_identity: orderId,
				},
			}
		);
		console.log("ORDER_TRANSACTION PAYMENT STATUS UPDATED TO: FAILURE");
	} else if (transactionStatus == "pending") {
		// TODO set transaction status on your database to 'pending' / waiting payment
		// and response with 200 OK
		await OrderTransactionModel.update(
			{
				payment_status: "PENDING",
			},
			{
				where: {
					transaction_identity: orderId,
				},
			}
		);
		console.log("ORDER_TRANSACTION PAYMENT STATUS UPDATED TO: PENDING");
	}

	res
		.status(httpStatus.OK)
		.json(succesResponse("OK", httpStatus["200_NAME"], httpStatus.OK));
});

module.exports = {
	createTransaction,
	midtransCallbackController,
};
