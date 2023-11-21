"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("product_images", {
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
			documentName: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "document_name",
			},
			path: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "path",
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
		await queryInterface.dropTable("product_images");
	},
};
