"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Promo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Promo.init(
		{
			company_id: DataTypes.INTEGER,
			stand_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			discount_price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Promo",
			paranoid: true,
			underscored: true,
		}
	);
	return Promo;
};
