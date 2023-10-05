const { productAllAdmin} = require("../../controllers/productController/Allproducts.Admin");

const productAllHandlerAdmin = async (req, res) => {
  try {
    const allProducts = await productAllAdmin();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { productAllHandlerAdmin };
