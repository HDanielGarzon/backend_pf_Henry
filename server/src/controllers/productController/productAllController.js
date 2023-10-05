const { default: axios } = require("axios");
const { Products, Category } = require("../../db");

const  productAllController = async()=>{
  const product =await Products.findAll({
    attributes: {
        exclude: ['category'] 
    },
    where: {
        isActive: true // Filtra los productos donde isActive sea true
    },
    include: { 
        model: Category,  
        through: {
            attributes: [] // Ninguna propiedad de la tabla intermedia
        }
    },
  });
  return product
}


module.exports = {
  productAllController,
};

