"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ProductImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Product);
		}
	}
	ProductImage.init(
		{
			company_id: DataTypes.INTEGER,
			product_id: DataTypes.INTEGER,
			document_name: DataTypes.STRING,
			path: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ProductImage",
			paranoid: true,
			underscored: true,
		}
	);
	return ProductImage;
};
