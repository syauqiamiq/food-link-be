"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Canteen extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Company);
		}
	}
	Canteen.init(
		{
			company_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			admin_user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Canteen",
			paranoid: true,
			underscored: true,
		}
	);
	return Canteen;
};
