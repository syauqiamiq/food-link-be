"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user_admins", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
				field: "email",
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				field: "password",
				allowNull: false,
			},
			fullName: {
				type: Sequelize.STRING,
				field: "full_name",
				allowNull: false,
			},
			companyId: {
				type: Sequelize.INTEGER,
				field: "company_id",
				allowNull: false,
			},
			contactNumber: {
				type: Sequelize.STRING,
				field: "contact_number",
			},
			address: {
				type: Sequelize.TEXT("long"),
				field: "address",
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
		await queryInterface.dropTable("user_admins");
	},
};
