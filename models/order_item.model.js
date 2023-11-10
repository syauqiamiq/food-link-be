"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrderItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	OrderItem.init(
		{
			company_id: DataTypes.INTEGER,
			order_transaction_id: DataTypes.INTEGER,
			product_id: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "OrderItem",
			paranoid: true,
			underscored: true,
		}
	);
	return OrderItem;
};
