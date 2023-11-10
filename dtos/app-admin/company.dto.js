const yup = require("yup");

const storeCompanyInput = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	contact_number: yup.string().required(),
	address: yup.string().required(),
});
const updateCompanyInput = yup.object().shape({
	name: yup.string().nullable(),
	email: yup.string().email().nullable(),
	contact_number: yup.string().nullable(),
	address: yup.string().nullable(),
});

const listCompanyResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			name: v.name,
			email: v.email,
			contact_number: v.contact_number,
			address: v.address,
		});
	});
	return res;
};

const singleCompanyResponse = (data) => {
	return {
		id: data.id,
		name: data.name,
		email: data.email,
		contact_number: data.contact_number,
		address: data.address,
	};
};

const listCompanyUserResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			company_id: v.company_id,
			email: v.email,
			full_name: v.full_name,
			contact_number: v.contact_number,
			address: v.address,
		});
	});
	return res;
};

module.exports = {
	storeCompanyInput,
	listCompanyResponse,
	singleCompanyResponse,
	updateCompanyInput,
	listCompanyUserResponse,
};
