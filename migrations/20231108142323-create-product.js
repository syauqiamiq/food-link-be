"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("products", {
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
			standId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "stand_id",
				references: {
					model: {
						tableName: "stands",
					},
					key: "id",
				},
			},
			productCategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "product_category_id",
				references: {
					model: {
						tableName: "product_categories",
					},
					key: "id",
				},
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "name",
			},
			promoId: {
				type: Sequelize.INTEGER,
				field: "promo_id",
				references: {
					model: {
						tableName: "promos",
					},
					key: "id",
				},
			},
			price: {
				type: Sequelize.BIGINT,
				allowNull: false,
				field: "price",
			},
			description: {
				type: Sequelize.TEXT("long"),
				allowNull: false,
				field: "description",
			},
			stockQuantity: {
				type: Sequelize.BIGINT,
				allowNull: false,
				field: "stock_quantity",
			},
			discountPrice: {
				type: Sequelize.BIGINT,
				field: "discount_price",
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
		await queryInterface.dropTable("products");
	},
};
