"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("promos", {
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
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "name",
			},
			discountPrice: {
				type: Sequelize.BIGINT,
				allowNull: false,
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
		await queryInterface.dropTable("promos");
	},
};
