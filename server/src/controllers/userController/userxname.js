const { User, Administrator, Customer,Op } = require('../../db');

const infoUsers = async (name,lastname) =>{
    console.log(lastname);
    const users= await User.findAll({
        where:{
            name:{
                [Op.iLike]:`%${name}%`
            },
            lastName:{
                [Op.iLike]:`%${lastname}%`
            }
        },
        include: [
            { model: Administrator, required: false },
            { model: Customer, required: false },
        ],
    })
    return users

}

module.exports={
infoUsers
}