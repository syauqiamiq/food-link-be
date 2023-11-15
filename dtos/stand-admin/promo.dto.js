const yup = require("yup");

const storePromoInput = yup.object().shape({
	name: yup.string().required(),
	discount_price: yup.number().required(),
	stand_id: yup.number().required(),
});
const updatePromoInput = yup.object().shape({
	name: yup.string().nullable(),
	discount_price: yup.number().nullable(),
	stand_id: yup.number().nullable(),
});
const listPromoResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			name: v.name,
			discount_price: v.discount_price,
			stand_id: v.stand_id,
		});
	});
	return res;
};

const singlePromoResponse = (data) => {
	return {
		id: data.id,
		name: data.name,
		discount_price: data.discount_price,
		stand_id: data.stand_id,
	};
};

module.exports = {
	singlePromoResponse,
	listPromoResponse,
	storePromoInput,
	updatePromoInput,
};
