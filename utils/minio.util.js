const multer = require("multer");

const fs = require("fs");
const { promisify } = require("util");
const minioConfig = require("../config/s3.config");

const unlinkAsync = promisify(fs.unlink);

const uploadMinioStorage = async (bucketName, remotePath, tempPath) => {
	try {
		const metaData = {
			"Content-Type": "application/octet-stream",
		};

		const upload = await minioConfig.fPutObject(
			bucketName,
			remotePath,
			tempPath,
			metaData
		);

		await unlinkAsync(tempPath);
		return upload;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	uploadMinioStorage,
};
