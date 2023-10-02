const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
      "Customer",
      {
        // gender:{
        //     type:DataTypes.ENUM('male','female')
        // },
        phoneNumber:{
            type:DataTypes.STRING,
            allowNull:true
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          defaultPaymentMethod: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'targeta',
          },
      },
      { timestamps: false }
    );
  };