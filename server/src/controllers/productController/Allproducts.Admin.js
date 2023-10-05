const { default: axios } = require("axios");
const { Products, Category } = require("../../db");

const productAllAdmin = async () => {
 

  const productos = await Products.findAll({
    attributes: {
      exclude: ['category'] 
    },
    include: { model: Category,  through:{// y de la tabla intermedia 
      attributes:[]//ninguno
  } },
  });


    return productos;

};
module.exports = {
  productAllAdmin,
};
