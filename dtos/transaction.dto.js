const yup = require("yup");

const storeTransactionInput = yup.object().shape({
	stand_id: yup.number().required(),
	order_item: yup.array().of(
		yup
			.object()
			.shape({
				product_name: yup.string().required("*Product Name is required"),
				quantity: yup.number().required("*Quantitiy is required"),
				price: yup.number().required("*Price is required"),
			})
			.required()
	),
});

tes;
module.exports = {
	storeTransactionInput,
};
