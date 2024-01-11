const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

describe("[GET] /company-admin/stand", () => {
	it("should 200 if no problem", async () => {
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.get("/company-admin/stand") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app).get("/company-admin/stand").expect(401);
	});
});

// SINGLE PRODUCT
describe("[GET] /company-admin/stand/:id", () => {
	it("should 200 if no problem", async () => {
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.get("/company-admin/stand/1") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});

	it("should return 200 and empty array data if not found", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/company-admin/stand/99999999999999999")
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.data).toStrictEqual([]);
		// Add more assertions based on your expected error response structure
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/company-admin/stand/1")
			.expect(401);
	});
});

// STORE PRODUCT
describe("[POST] /company-admin/stand", () => {
	it("should 200 if no problem", async () => {
		exampleData = {
			name: "Stand Soto",
			canteen_id: 2,
		};
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.post("/company-admin/stand") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.send(exampleData)
			.expect(200);

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand
		exampleData = {
			name: "Stand Soto",
			canteen_id: 2,
		};
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.post("/company-admin/stand") // replace with your actual API endpoint
			.send(exampleData)
			.expect(401);
	});
});

// UPDATE PRODUCT
describe("[PATCH] /stand-admin/promo/:id", () => {
	it("should 200 if no problem", async () => {
		exampleData = {
			name: "Promo Menari",
			discount_price: 5000,
			stand_id: 1,
		};
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.patch("/stand-admin/promo/1") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.send(exampleData)
			.expect(200);

		expect(response.body.message).toBe("OK");
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand
		exampleData = {
			name: "Promo Menari",
			discount_price: 5000,
			stand_id: 1,
		};
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.patch("/stand-admin/promo/1") // replace with your actual API endpoint
			.send(exampleData)
			.expect(401);
	});
});
