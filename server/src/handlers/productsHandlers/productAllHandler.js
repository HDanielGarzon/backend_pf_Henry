const { productAllController } = require("../../controllers/productController/productAllController");

const productAllHandler = async (req, res) => {
  try {
    const allProducts = await productAllController();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { productAllHandler };
