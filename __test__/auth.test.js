const request = require("supertest");
const app = require("../app");
require("dotenv").config();

describe("[GET] /auth/login", () => {
	it("should return 200 if no problem", async () => {
		const accountDetail = {
			email: "syauqiamiq12@gmail.com",
			password: "tes123123",
		};

		const response = await request(app)
			.post("/auth/login") // replace with your actual API endpoint
			.send(accountDetail)
			.expect(200);

		expect(response.body.otp_access_key).not.toBeNull();
		// Add more assertions based on your expected response structure
	});
});

describe("[GET] /auth/login", () => {
	it("should return 200 if no problem", async () => {
		const accountDetail = {
			email: "syauqiamiq12@gmail.com",
			password: "tes123123",
		};

		const response = await request(app)
			.post("/auth/login") // replace with your actual API endpoint
			.send(accountDetail)
			.expect(200);

		expect(response.body.otp_access_key).not.toBeNull();
		// Add more assertions based on your expected response structure
	});
});
