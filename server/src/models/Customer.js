const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "Customer",
      {
        gender:{
            type:DataTypes.ENUM('male','female')
        },
        phoneNumber:{
            type:DataTypes.STRING,
            allowNull:false
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          defaultPaymentMethod: {
            type: DataTypes.STRING,
            allowNull: true,
          },
      },
      { timestamps: false }
    );
  };