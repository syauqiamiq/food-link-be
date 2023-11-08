"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserHasRole extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User);
			this.belongsTo(models.Role);
		}
	}
	UserHasRole.init(
		{
			user_id: DataTypes.INTEGER,
			role_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "UserHasRole",
			paranoid: true,
			underscored: true,
		}
	);
	return UserHasRole;
};
