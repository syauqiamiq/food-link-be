const succesResponse = (data, message, code, meta) => {
	if (data && meta) {
		return {
			code: code,
			message: message,
			meta: meta,
			data: data,
		};
	}

	if (data) {
		return {
			code: code,
			message: message,
			data: data,
		};
	}

	return {
		code: code,
		message: message,
	};
};

const errorResponse = (message, code, data) => {
	return {
		code: code,
		message: message,
		data: data,
	};
};

module.exports = {
	succesResponse,
	errorResponse,
};
