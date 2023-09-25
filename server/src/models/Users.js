const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    //  lastName: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    //   nikName:{
    //     type:DataTypes.STRING,
    //     allowNull:false,
    //     unique:true
    //   },
      email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: true,
        }
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      recoveryToken:{
        type:DataTypes.STRING,
        allowNull:true
      },
      role:{
        type:DataTypes.ENUM('customer', 'administrator'),
        allowNull:false
      }
    },
    { timestamps: false }
  );
};
