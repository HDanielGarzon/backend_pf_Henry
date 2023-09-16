const { Products, Category } = require("../../db");

const productAllController = async () => {
  const productos = await Products.findAll({
    include :[{model:Category, attribute:["name"]}]
  });
  console.log(":::::::::::::::::", Category);
//   const categoryId = await Products.findByPk(id, {
//       include: {
//         model: Category,
//         attributes: ["name"],
//       },
//     });
//   await productos.setCategory(categoryId)

  return productos;
};
module.exports = {
  productAllController,
};
