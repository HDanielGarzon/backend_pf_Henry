const {Products} = require('../../db');
const deleteProduct= async (req, res) => {
    const { id } = req.params; 
    try {
     const product = await Products.findByPk(id);
     await product.destroy();
     res.status(200).send("Product successfully removed") 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { deleteProduct };