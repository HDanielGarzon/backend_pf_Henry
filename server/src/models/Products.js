const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Products",
    {
      id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // categoria: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   isUrl: true,
        // },
      },
     
     image: {
        type: DataTypes.STRING,
        allowNull: true,
       
      },
      measures: {
        type: DataTypes.JSON, 
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
