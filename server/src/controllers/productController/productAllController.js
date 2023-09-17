const { Products, Category } = require("../../db");

const productAllController = async () => {
  const productos = await Products.findAll({
    include :[{model:Category, attribute:["name"]}]
  });

  return productos;
};
module.exports = {
  productAllController,
};
