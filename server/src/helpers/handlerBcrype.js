const bcrypt = require('bcryptjs')

const encrypt = async(textPassword)=>{
    const hash = await bcrypt.hash(textPassword,10)
    return hash
}

const compare = async (passwordPlain, hashPassword)=>{
    return await bcrypt.compare(passwordPlain,hashPassword)
}

module.exports={
    encrypt,
    compare,
}