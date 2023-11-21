"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeColumn("order_items", "product_id");
			await queryInterface.addColumn(
				"order_items",
				"product_name",
				{
					type: Sequelize.STRING,
					allowNull: false,
					field: "product_name",
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
			await queryInterface.removeColumn("order_items", "product_name");
			await queryInterface.addColumn(
				"order_items",
				"product_id",
				{
					type: Sequelize.INTEGER,
					allowNull: true,
					field: "product_id",
					references: {
						model: {
							tableName: "products",
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
};
