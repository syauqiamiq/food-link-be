"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Stand extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Canteen);
			this.belongsTo(models.Company);
		}
	}
	Stand.init(
		{
			company_id: DataTypes.INTEGER,
			canteen_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			admin_user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Stand",
			paranoid: true,
			underscored: true,
		}
	);
	return Stand;
};
