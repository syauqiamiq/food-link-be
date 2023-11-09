"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("order_items", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			companyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "company_id",
				references: {
					model: {
						tableName: "companies",
					},
					key: "id",
				},
			},
			orderTransactionId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "order_transaction_id",
				references: {
					model: {
						tableName: "order_transactions",
					},
					key: "id",
				},
			},
			productId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "product_id",
				references: {
					model: {
						tableName: "products",
					},
					key: "id",
				},
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "quantity",
			},
			price: {
				type: Sequelize.BIGINT,
				allowNull: false,
				field: "price",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: "created_at",
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: "updated_at",
			},
			deletedAt: {
				type: Sequelize.DATE,
				field: "deleted_at",
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("order_items");
	},
};
