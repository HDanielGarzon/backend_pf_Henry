const {infProd} = require('../../controllers/productController/productxId')
const searchProduct = async (req, res) => {
    const {name}= req.query;
    try {
        if(!name){
           res.status(404).json({message:"name needed"})
        }
        const Productinfo= await infProd(name)
        if(Productinfo.length === 0){
            return res.status(404).json({message:"non-existent data"});
        }
        res.status(200).json(Productinfo)

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { searchProduct};