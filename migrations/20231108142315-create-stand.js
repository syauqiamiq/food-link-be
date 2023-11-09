"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("stands", {
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
			canteenId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: "canteen_id",
				references: {
					model: {
						tableName: "canteens",
					},
					key: "id",
				},
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				field: "name",
			},
			adminUserId: {
				type: Sequelize.INTEGER,
				field: "admin_user_id",
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
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
		await queryInterface.dropTable("stands");
	},
};
