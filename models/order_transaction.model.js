"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrderTransaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.OrderItem);
			this.belongsTo(models.Stand);
			this.belongsTo(models.User);
		}
	}
	OrderTransaction.init(
		{
			company_id: DataTypes.INTEGER,
			transaction_identity: DataTypes.STRING,
			stand_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
			payment_status: DataTypes.STRING,
			stand_status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "OrderTransaction",
			paranoid: true,
			underscored: true,
		}
	);
	return OrderTransaction;
};
