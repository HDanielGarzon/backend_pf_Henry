const { Products, Category } = require("../../db");
const updateProduct = async (req,res) =>{
    const {id} = req.params;
    try {
        const product = await Products.findOne({
            where:{id}
        })

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        product.set(req.body)
        await product.save();
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
   
}

module.exports={
    updateProduct
}

// const { Products, Category } = require("../../db");

// const updateProduct = async (req, res) => {
//     const { id } = req.params;
//     try {
//         // Encontrar el producto por su ID
//         const product = await Products.findOne({
//             where: { id }
//         });

//         if (!product) {
//             return res.status(404).json({ message: "Producto no encontrado" });
//         }

//         // Actualizar los campos del producto con los datos del cuerpo de la solicitud
//         await product.update(req.body);

//         // Si tienes un campo de Category en el cuerpo de la solicitud, actualiza la relación
//         if (req.body.Category) {
//             // Buscar la categoría correspondiente por su ID o crear una nueva si no existe
//             let category = await Category.findOne({
//                 where: { id: req.body.Category.id }
//             });

//             if (!category) {
//                 category = await Category.create({
//                     name: req.body.Category.name
//                 });
//             }

//             // Establecer la relación entre el producto y la categoría
//             await product.setCategory(category);
//         }

//         return res.status(200).json(product);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     updateProduct
// };
