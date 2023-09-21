const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "Administrator",
      {
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        areaOfResponsibility: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      { timestamps: false }
    );
  };