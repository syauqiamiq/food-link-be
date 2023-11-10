"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Product.init(
		{
			company_id: DataTypes.INTEGER,
			stand_id: DataTypes.INTEGER,
			product_category_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			promo_id: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			description: DataTypes.STRING,
			stock_quantity: DataTypes.INTEGER,
			discount_price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Product",
			paranoid: true,
			underscored: true,
		}
	);
	return Product;
};
