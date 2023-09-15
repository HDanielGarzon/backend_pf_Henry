const {Products} = require("../db");




const muebles=async (req,res)=>{
    try {
        const allProducts=await Products.findAll();
        res.status(200).json(allProducts)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
    }
    module.exports={muebles};