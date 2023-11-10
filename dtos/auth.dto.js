const yup = require("yup");

const loginInput = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const registerInput = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
	full_name: yup.string().required(),
	address: yup.string().required(),
	contact_number: yup.string().required(),
	company_id: yup.number().required(),
});

const registerResponse = (data) => {
	return {
		id: data.id,
		full_name: data.full_name,
		contact_number: data.contact_number,
		address: data.address,
		email: data.email,
	};
};

module.exports = {
	loginInput,
	registerInput,
	registerResponse,
};
