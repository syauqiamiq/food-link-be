const yup = require("yup");

const storeUserInput = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
	full_name: yup.string().required(),
	address: yup.string().required(),
	contact_number: yup.string().required(),
});
const updateUserInput = yup.object().shape({
	email: yup.string().email().nullable(),
	full_name: yup.string().nullable(),
	address: yup.string().nullable(),
	contact_number: yup.string().nullable(),
});
const listUserResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			full_name: v.full_name,
			contact_number: v.contact_number,
			address: v.address,
			email: v.email,
		});
	});
	return res;
};

const singleUserResponse = (data) => {
	return {
		id: data.id,
		full_name: data.full_name,
		contact_number: data.contact_number,
		address: data.address,
		email: data.email,
	};
};

module.exports = {
	storeUserInput,
	updateUserInput,
	listUserResponse,
	singleUserResponse,
};
