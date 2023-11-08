"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("role_has_permissions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
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
			permissionId: {
				allowNull: false,
				field: "permission_id",
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "permissions",
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
		await queryInterface.dropTable("role_has_permissions");
	},
};
