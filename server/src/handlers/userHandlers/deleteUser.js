const {User} = require('../../db');

const deleteUser= async (req, res) => {
    const { id } = req.params; 
    try {
     const user = await User.findByPk(id);
     await user.update({isActive: false});
     res.status(200).send("User successfully removed") 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { deleteUser };