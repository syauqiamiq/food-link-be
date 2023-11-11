const yup = require("yup");

const storeCanteenInput = yup.object().shape({
	name: yup.string().required(),
});
const updateCanteenInput = yup.object().shape({
	name: yup.string().nullable(),
});
const listCanteenResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			name: v.name,
		});
	});
	return res;
};

const singleCanteenResponse = (data) => {
	return {
		id: data.id,
		name: data.name,
	};
};

module.exports = {
	storeCanteenInput,
	updateCanteenInput,
	listCanteenResponse,
	singleCanteenResponse,
};
