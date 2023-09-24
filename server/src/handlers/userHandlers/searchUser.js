const {infoUsers} = require('../../controllers/userController/userxname')
const searchUser = async (req, res) => {
    const {name, lastname}= req.query;
   
    try {
        if(!name ){
           res.status(404).json({message:"name needed"})
        }
        const user= await infoUsers(name,lastname)
        if(user.length === 0){
            return res.status(404).json({message:"non-existent data"});
        }
        res.status(200).json(user)

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { searchUser};