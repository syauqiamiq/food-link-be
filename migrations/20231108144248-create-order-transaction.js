"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("order_transactions", {
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
			transactionIdentity: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "transaction_identity",
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
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "user_id",
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			paymentStatus: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "payment_status",
			},
			standStatus: {
				type: Sequelize.STRING,
				field: "stand_status",
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
		await queryInterface.dropTable("order_transactions");
	},
};
