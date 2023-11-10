const yup = require("yup");

const appAdminLoginInput = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

module.exports = {
	appAdminLoginInput,
};
