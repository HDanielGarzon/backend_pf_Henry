const {Products}=require("../db")

const mueblesdb= async()=>{
    const productos = await Products.findAll();
    return productos


}
module.exports={
    mueblesdb
};