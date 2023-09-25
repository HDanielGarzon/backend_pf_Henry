const {uploadImage}=require('../../utils/cloudinary/cloudinary')
const {Products, Category} = require('../../db');
const fs = require('fs-extra')



const productCreate = async (req, res) => {
    const {name,colors,image,measures,description,rating,price,category}= req.body

    console.log(req.files);
    try {
      // if( !name || !colors || !image || !measures || !description || !rating || !price ){
      //   return res.status(404).json({message:"insufficient data"});
      // };
      // if(category.length === 0){
      //   return res.status(404).json({message:"it is necessary to enter at least one category"})
      // };

      // const getCategoriesId = await Promise.all(
      //   category.map(async (cate) => {
      //     const foundCategory = await Category.findOne({ where: { name: cate } });
      //     return foundCategory.id;
      //   })
      // );
      
      if(req.files?.image){
        const result = await uploadImage(req.files.image.tempFilePath)
        console.log(result);
        const newProduct= await Products.create({
          name,colors,image: result?.secure_url,measures,description,rating,price
        });
        // await newProduct.addCategories(getCategoriesId);
        await fs.unlink(req.files.image.tempFilePath)

        res.status(200).json(newProduct)
      }




    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { productCreate };