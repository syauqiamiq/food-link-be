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
			this.hasMany(models.UserHasRole);
			this.belongsTo(models.Company);
		}
	}
	User.init(
		{
			id: DataTypes.INTEGER,
			companyId: DataTypes.INTEGER,
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			contactNumber: DataTypes.STRING,
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
