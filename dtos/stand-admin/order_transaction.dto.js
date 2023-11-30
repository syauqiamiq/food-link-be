const yup = require("yup");

const listOrderItemResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			product_name: v.product_name,
			price: v.price,
			quantity: v.quantity,
		});
	});
	return res;
};

const listOrderTransactionResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			transaction_identity: v.transaction_identity,
			stand_id: v.stand_id,
			user_id: v.user_id,
			payment_status: v.payment_status,
			stand_status: v.stand_status,
			stand: {
				name: v.Stand?.name,
			},
			user: {
				full_name: v.User?.full_name,
				contact_number: v.User?.contact_number,
			},
			order_item: listOrderItemResponse(v.OrderItems),
			created_at: v.createdAt,
		});
	});
	return res;
};

const singleOrderTransactionResponse = (data) => {
	return {
		id: data.id,
		transaction_identity: data.transaction_identity,
		stand_id: data.stand_id,
		user_id: data.user_id,
		payment_status: data.payment_status,
		stand_status: data.stand_status,
		stand: {
			name: data.Stand?.name,
		},
		user: {
			full_name: data.User?.full_name,
			contact_number: data.User?.contact_number,
		},
		order_item: listOrderItemResponse(data.OrderItems),
		created_at: data.createdAt,
	};
};

module.exports = {
	listOrderTransactionResponse,
	singleOrderTransactionResponse,
};
