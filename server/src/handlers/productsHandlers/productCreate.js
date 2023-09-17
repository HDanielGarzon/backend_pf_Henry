const {Products, Category} = require('../../db');
const productCreate = async (req, res) => {
    const {name,colors,image,measures,description,rating,price,category}= req.body
    try {
      if( !name || !colors || !image || !measures || !description || !rating || !price ){
        return res.status(404).json({message:"insufficient data"});
      };
      if(category.length === 0){
        return res.status(404).json({message:"it is necessary to enter at least one category"})
      };

      const getCategoriesId = await Promise.all(
        category.map(async (cate) => {
          const foundCategory = await Category.findOne({ where: { name: cate } });
          return foundCategory.id;
        })
      );

      const newProduct= await Products.create({
        name,colors,image,measures,description,rating,price
      });
      await newProduct.addCategories(getCategoriesId);
      res.status(200).json({message:"Product created successfully"})

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { productCreate };