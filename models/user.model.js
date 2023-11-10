"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			company_id: DataTypes.INTEGER,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			full_name: DataTypes.STRING,
			contact_number: DataTypes.STRING,
			address: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
			paranoid: true,
			underscored: true,
		}
	);
	return User;
};
