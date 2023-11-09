"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Company extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Company.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			contact_number: DataTypes.STRING,
			address: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Company",
			paranoid: true,
			underscored: true,
			timestamps: false,
		}
	);
	return Company;
};
