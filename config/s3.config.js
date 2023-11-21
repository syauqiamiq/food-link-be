var Minio = require("minio");
require("dotenv").config();

var minioConfig = new Minio.Client({
	endPoint: process.env.S3_ENDPOINT,
	useSSL: true,
	accessKey: process.env.S3_ACCESS_KEY,
	secretKey: process.env.S3_SECRET_KEY,
});

module.exports = minioConfig;
