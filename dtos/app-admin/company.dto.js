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

const assignCompanyAdminInput = yup.object().shape({
	user_id: yup.number().required(),
	role_id: yup.number().required(),
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
			admin_user_id: v.admin_user_id,
			user_admin: {
				full_name: v.User?.full_name,
				email: v.User?.email,
			},
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
		admin_user_id: data.admin_user_id,
		user_admin: {
			full_name: data.User?.full_name,
			email: data.User?.email,
		},
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
	assignCompanyAdminInput,
};
