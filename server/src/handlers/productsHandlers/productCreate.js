const {Products} = require('../../db');
const productCreate = async (req, res) => {
    const {name,colors,image,measures,categories}= req.body
    try {
      if( !name || !colors || !image || !measures ){
        return res.status(404).json({message:"insufficient data"});
      };
      if(categories.length === 0){
        return res.status(404).json({message:"it is necessary to enter at least one category"})
      };

      const newProduct= await Products.create({
        name,colors,image,measures
      });
      await newProduct.addCategories(categories);
      res.status(200).json({message:"Product created successfully"})

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { productCreate };