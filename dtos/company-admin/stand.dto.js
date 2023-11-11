const yup = require("yup");

const storeStandInput = yup.object().shape({
	canteen_id: yup.number().required(),
	name: yup.string().required(),
	admin_user_id: yup.number().nullable(),
});
const updateStandInput = yup.object().shape({
	canteen_id: yup.number().nullable(),
	name: yup.string().nullable(),
	admin_user_id: yup.number().nullable(),
});
const assignStandAdminInput = yup.object().shape({
	user_id: yup.number().nullable(),
});

const listStandResponse = (data) => {
	let res = [];
	data.forEach((v) => {
		res.push({
			id: v.id,
			name: v.name,
			admin_user_id: v.admin_user_id,
			canteen: {
				name: v.Canteen?.name,
			},
			user_admin: {
				full_name: v.User?.full_name,
				email: v.User?.email,
			},
		});
	});
	return res;
};

const singleStandResponse = (data) => {
	return {
		id: data.id,
		name: data.name,
		admin_user_id: data.admin_user_id,
		canteen: {
			name: data.Canteen?.name,
		},
		user_admin: {
			full_name: data.User?.full_name,
			email: data.User?.email,
		},
	};
};

module.exports = {
	storeStandInput,
	updateStandInput,
	listStandResponse,
	singleStandResponse,
	assignStandAdminInput,
};
