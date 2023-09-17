const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Products",
    {
      // id: {
      //   type:DataTypes.UUID,
      //   primaryKey:true,
      //   defaultValue:DataTypes.UUIDV4,
      // },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // categoria: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      // color: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
     
     image: {
        type: DataTypes.STRING,
        allowNull: true,
       
      },
      // measures: {
      //   type: DataTypes.JSON, 
      //   allowNull: false,
      // },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
     
       
    
    
    },
    { timestamps: false }
  );
};
