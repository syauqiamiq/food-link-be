"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addColumn(
				"companies",
				"admin_user_id",
				{
					type: Sequelize.INTEGER,
					allowNull: true,
					field: "admin_user_id",
					references: {
						model: {
							tableName: "users",
						},
						key: "id",
					},
				},
				{ transaction }
			);
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeColumn("companies", "admin_user_id", {
				transaction,
			});
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
