const request = require("supertest");
const app = require("../app");
require("dotenv").config();

describe("[GET] /dashboard/my-transaction", () => {
	it("should 200 if no problem", async () => {
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.get("/dashboard/my-transaction") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200)
			.catch((err) => {
				console.error("Test Error:", err);
				throw err;
			});

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});
});

describe("[GET] /dashboard/canteen/:id/stand", () => {
	it("should 200 if no problem", async () => {
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.get("/dashboard/canteen/1/stand") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200)
			.catch((err) => {
				console.error("Test Error:", err);
				throw err;
			});

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});

	it("should return 200 and empty array data if not found", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/dashboard/canteen/9999999999999/stand")
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.data).toStrictEqual([]);
		// Add more assertions based on your expected error response structure
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/dashboard/canteen/9999999999999/stand")
			.expect(401);
	});
});

describe("[GET] /dashboard/stand/:id/product", () => {
	it("should 200 if no problem", async () => {
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.get("/dashboard/stand/1/product") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200)
			.catch((err) => {
				console.error("Test Error:", err);
				throw err;
			});

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});

	it("should return 200 and empty array data if not found", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/dashboard/stand/9999999999999/product")
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.data).toStrictEqual([]);
		// Add more assertions based on your expected error response structure
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/dashboard/stand/9999999999999/product")
			.expect(401);
	});
});
