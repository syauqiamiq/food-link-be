const yup = require("yup");

const storeProductInput = yup.object().shape({
	stand_id: yup.number().required(),
	product_category_id: yup.number().required(),
	name: yup.string().required(),
	promo_id: yup.number().nullable(),
	price: yup.number().required(),
	description: yup.string().required(),
	stock_quantity: yup.number().required(),
	discount_price: yup.number().nullable(),
});

const storeProductImageInput = yup.object().shape({
	file: yup.string().required(),
});
const updateProductInput = yup.object().shape({
	stand_id: yup.number().nullable(),
	product_category_id: yup.number().nullable(),
	name: yup.string().nullable(),
	promo_id: yup.number().nullable(),
	price: yup.number().nullable(),
	description: yup.string().nullable(),
	stock_quantity: yup.number().nullable(),
	discount_price: yup.number().nullable(),
});
const listProductResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			stand_id: v.stand_id,
			product_category_id: v.product_category_id,
			name: v.name,
			promo_id: v.promo_id,
			price: v.price,
			description: v.description,
			stock_quantity: v.stock_quantity,
			discount_price: v.discount_price,
		});
	});
	return res;
};

const singleProductResponse = (data) => {
	return {
		id: data.id,
		stand_id: data.stand_id,
		product_category_id: data.product_category_id,
		name: data.name,
		promo_id: data.promo_id,
		price: data.price,
		description: data.description,
		stock_quantity: data.stock_quantity,
		discount_price: data.discount_price,
	};
};

module.exports = {
	storeProductImageInput,
	singleProductResponse,
	listProductResponse,
	storeProductInput,
	updateProductInput,
};
