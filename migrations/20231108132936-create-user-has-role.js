"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user_has_roles", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				field: "user_id",
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			roleId: {
				allowNull: false,
				field: "role_id",
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "roles",
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
		await queryInterface.dropTable("user_has_roles");
	},
};
