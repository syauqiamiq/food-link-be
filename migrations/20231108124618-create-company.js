"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("companies", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
				field: "id",
			},
			name: {
				type: Sequelize.STRING,
				field: "name",
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				field: "email",
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
		await queryInterface.dropTable("companies");
	},
};
