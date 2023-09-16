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
        validate: {
          isValidMeasures(value) {
            // Verifica si el objeto tiene solo las propiedades height, width y depth
            if (
              !value ||
              typeof value !== "object" ||
              !("height" in value) ||
              !("width" in value) ||
              !("depth" in value)
            ) {
              throw new Error("Las medidas deben incluir height, width y depth.");
            }
          },
        },
      },
    },
    { timestamps: false }
  );
};
