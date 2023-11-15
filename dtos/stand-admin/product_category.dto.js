const yup = require("yup");

const storeProductCategoryInput = yup.object().shape({
	name: yup.string().required(),
});
const updateProductCategoryInput = yup.object().shape({
	name: yup.string().nullable(),
});
const listProductCategoryResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			name: v.name,
		});
	});
	return res;
};

const singleProductCategoryResponse = (data) => {
	return {
		id: data.id,
		name: data.name,
	};
};

module.exports = {
	storeProductCategoryInput,
	updateProductCategoryInput,
	listProductCategoryResponse,
	singleProductCategoryResponse,
};
