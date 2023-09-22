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
        // unique:true
      },
      category: {
        type: DataTypes.STRING,
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // measures: {
      //   type: DataTypes.JSON,
      //   allowNull: true,
      //   validate: {
      //     isValidMeasures(value) {
      //       // Verifica si el objeto tiene solo las propiedades height, width y depth
      //       if (
      //         !value ||
      //         typeof value !== "object" ||
      //         !("height" in value) ||
      //         !("width" in value) ||
      //         !("deep" in value)
      //       ) {
      //         throw new Error(
      //           "Las medidas deben incluir height, width y deep."
      //         );
      //       }
      //     },
      //   },
      // },
      measures: {
        type: DataTypes.JSON,
        allowNull: true,
      },
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
