const request = require("supertest");
const app = require("../../app");
require("dotenv").config();

describe("[GET] /stand-admin/product-category", () => {
	it("should 200 if no problem", async () => {
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.get("/stand-admin/product-category") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/stand-admin/product-category")
			.expect(401);
	});
});

// SINGLE PRODUCT
describe("[GET] /stand-admin/product-category/:id", () => {
	it("should 200 if no problem", async () => {
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.get("/stand-admin/product-category/1") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
	});

	it("should return 200 and empty array data if not found", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/stand-admin/product-category/99999999999999999")
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.expect(200);

		expect(response.body.data).toStrictEqual([]);
		// Add more assertions based on your expected error response structure
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand

		const response = await request(app)
			.get("/stand-admin/product-category/1")
			.expect(401);
	});
});

// STORE PRODUCT
describe("[POST] /stand-admin/product-category", () => {
	it("should 200 if no problem", async () => {
		exampleData = {
			name: "Promo Menari",
			discount_price: 5000,
			stand_id: 1,
		};
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.post("/stand-admin/product-category") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.send(exampleData)
			.expect(200);

		expect(response.body.message).toBe("OK");
		// Add more assertions based on your expected response structure
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
			.post("/stand-admin/product-category") // replace with your actual API endpoint
			.send(exampleData)
			.expect(401);
	});
});

// UPDATE PRODUCT
describe("[PATCH] /stand-admin/product-category/:id", () => {
	it("should 200 if no problem", async () => {
		exampleData = {
			name: "Soda",
		};
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.patch("/stand-admin/product-category/1") // replace with your actual API endpoint
			.set("Authorization", `Bearer ${process.env.TEST_BEARER_TOKEN}`)
			.send(exampleData)
			.expect(200);

		expect(response.body.message).toBe("OK");
	});

	it("should return 401 if unauthenticated", async () => {
		// Mock StandModel.findAll to return null or an empty array for a non-existent stand
		exampleData = {
			name: "Soda",
		};
		// Mock the getSessionAccessData function if needed
		const response = await request(app)
			.patch("/stand-admin/product-category/1") // replace with your actual API endpoint
			.send(exampleData)
			.expect(401);
	});
});
