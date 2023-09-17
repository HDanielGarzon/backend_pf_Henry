const {Products,Category,Op} = require('../../db');

const infProd=async(name)=>{
    const Product= await Products.findAll({
        where:{
            name:{
                [Op.iLike]:`%${name}%`
            }
        },
        include:{
            model:Category,
            through:{// y de la tabla intermedia 
                attributes:[]//ninguno
            }
        }
    });
    return Product
};

module.exports = {
    infProd
  };
