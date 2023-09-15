const {mueblesdb} = require("../controllers/productController");




const muebles=async (req,res)=>{
    try {
        const allProducts=await mueblesdb();
        res.status(200).json(allProducts)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
    }
    module.exports={muebles};