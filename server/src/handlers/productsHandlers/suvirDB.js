const { Product, Category } = require("../../db"); // Asegúrate de importar los modelos correctos de Sequelize
const { muebles } = require("../../fillDB/data");

const createProductsAndRelations = async () => {
  try {
    // Obtener todas las categorías de la base de datos
    const categories = await Category.findAll();

    // Crear un objeto de mapeo para buscar las categorías por nombre
    const categoryMap = new Map();
    categories.forEach(category => {
      categoryMap.set(category.name, category);
    });

    // Iterar sobre los muebles y agregar las categorías correspondientes
    const createdProducts = await Promise.all(
      muebles.map(async mueble => {
        const category = categoryMap.get(mueble.category);
        if (category) {
          // Crea un producto y establece sus atributos
          const product = await Product.create({
            name: mueble.name,
            color: mueble.color,
            // Agrega otros atributos del producto aquí
          });

          // Asocia el producto con la categoría
          await product.addCategory(category);
          return product;
        }
      })
    );

    // Devolver los productos creados
    return createdProducts.filter(Boolean);
  } catch (error) {
    console.error("Error al buscar categorías o crear productos:", error);
    throw new Error("Error al buscar categorías o crear productos");
  }
};

module.exports = {
  createProductsAndRelations
};
