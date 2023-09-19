const { Products, Category, PoductsxCategory } = require("../../db");

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, colors, image, measures, description, rating, price, categories } = req.body;

    try {
        const product = await Products.findOne({
            where: { id }
        });

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Actualiza las propiedades del producto con los valores proporcionados en req.body
        product.name = name;
        product.colors = colors;
        product.image = image;
        product.measures = measures;
        product.description = description;
        product.rating = rating;
        product.price = price;

        // Guarda los cambios en el producto
        await product.save();

        // Obtiene las categorías actuales asociadas al producto
        const currentCategories = await product.getCategories();

        // Si se proporcionan categorías en req.body
        if (categories && categories.length > 0) {
            // Elimina las relaciones existentes que no están presentes en req.body
            for (const currentCategory of currentCategories) {
                const categoryName = currentCategory.name;
                if (!categories.includes(categoryName)) {
                    await PoductsxCategory.destroy({
                        where: { ProductId: id, CategoryId: currentCategory.id }
                    });
                }
            }

            // Agrega las nuevas relaciones o actualiza las existentes
            for (const categoryName of categories) {
                const category = await Category.findOne({ where: { name: categoryName } });
                if (category) {
                    // Verifica si la relación ya existe antes de crearla
                    const existingRelation = await PoductsxCategory.findOne({
                        where: { ProductId: id, CategoryId: category.id }
                    });
                    if (!existingRelation) {
                        await PoductsxCategory.create({ ProductId: id, CategoryId: category.id });
                    }
                }
            }
        } else {
            // Si no se proporcionan categorías, no se realiza ninguna acción
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    updateProduct
}
