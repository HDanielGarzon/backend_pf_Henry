// const {Products} = require('../../db');
// const deleteProduct= async (req, res) => {
//     const { id } = req.params; 
//     try {
//      const product = await Products.findByPk(id);
//      await product.update({isActive: false});
//      res.status(200).send("Product successfully removed") 
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
//   module.exports = { deleteProduct };


const { Products } = require('../../db');

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Products.findByPk(id);
        
        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Invertir el valor de isActive
        const updatedStatus = !product.isActive;

        // Actualizar la propiedad isActive en la base de datos
        await product.update({ isActive: updatedStatus });

        res.status(200).json({ isActive: updatedStatus, message: "Product status updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { deleteProduct };
