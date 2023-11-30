const redis = require("redis");

require("dotenv").config();

const redisClient = async () => {
	const client = redis.createClient({
		password: process.env.REDIS_PASS,
		socket: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		},
	});

	client.on("error", (err) => console.log("Redis Client Error", err));

	await client.connect();
	return client;
};
module.exports = redisClient;
