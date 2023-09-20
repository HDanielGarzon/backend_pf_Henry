const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      orderNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Hace que el número de orden sea autoincrementable
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pendiente', 'procesando', 'completado', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
    },
    { timestamps: false }
  );
};
