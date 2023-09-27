const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      ordenId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        //autoIncrement: true, // Hace que el número de orden sea autoincrementable
      },
      nombre:{
        type:DataTypes.STRING
      },
      apellido:{
        type:DataTypes.STRING
      },
      telefono:{
        type:DataTypes.STRING
      },
      email:{
        type:DataTypes.STRING
      },
      direccion:{
        type:DataTypes.STRING
      },
      nota:{
        type:DataTypes.STRING
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pendiente', 'procesando', 'completado', 'cancelado'),
        //allowNull: false,
        defaultValue: 'pendiente',
      },
    },
    { timestamps: false }
  );
};
