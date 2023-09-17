const {Products, Category} = require('../../db');
const productCreate = async (req, res) => {
    const {name,color,image,measures,categories}= req.body
    try {
      if( !name || !color || !image || !measures ){
        return res.status(404).json({message:"insufficient data"});
      };
      if(categories.length === 0){
        return res.status(404).json({message:"it is necessary to enter at least one category"})
      };

      const getCategoriesId = await Promise.all(
        categories.map(async (cate) => {
          const foundCategory = await Category.findOne({ where: { name: cate } });
          return foundCategory.id;
        })
      );

      const newProduct= await Products.create({
        name,color,image,measures
      });
      await newProduct.addCategories(getCategoriesId);
      res.status(200).json({message:"Product created successfully"})

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { productCreate };