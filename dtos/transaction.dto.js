const yup = require("yup");

const storeTransactionInput = yup.object().shape({
	stand_id: yup.number().required(),
	order_item: yup.array().of(
		yup
			.object()
			.shape({
				product_id: yup.number().required("*Product is required"),
				quantity: yup.number().required("*Quantitiy is required"),
				price: yup.number().required("*Price is required"),
			})
			.required()
	),
});

module.exports = {
	storeTransactionInput,
};
