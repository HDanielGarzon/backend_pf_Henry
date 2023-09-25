const { user_db } = require("../fillDB/usersfake")

const authByEmailPwd = (email, password) =>{
    const user = user_db.find((user)=>user.email === email);
    if(!user) throw new Error(); 

    if(user.password !== password ) throw new Error();

    return user;
}

module.exports={authByEmailPwd}