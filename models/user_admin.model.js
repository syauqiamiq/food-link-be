"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
	class UserAdmin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	UserAdmin.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			full_name: DataTypes.STRING,
			contact_number: DataTypes.STRING,
			address: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "UserAdmin",
			paranoid: true,
			underscored: true,
		}
	);
	return UserAdmin;
};
