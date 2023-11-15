const yup = require("yup");

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
			},
			order_item: {
				product: v.Product,
				quantity: v.OrderItem?.quantity,
				price: v.OrderItem?.price,
			},
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
		},
		order_item: {
			product: data.Product,
			quantity: data.OrderItem?.quantity,
			price: data.OrderItem?.price,
		},
	};
};

module.exports = {
	listOrderTransactionResponse,
	singleOrderTransactionResponse,
};
