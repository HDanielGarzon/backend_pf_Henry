// const {User} = require('../../db');

// const deleteUser= async (req, res) => {
//     const { id } = req.params; 
//     try {
//      const user = await User.findByPk(id);
//      await user.update({isActive: false});
//      res.status(200).send("User successfully removed") 
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
//   module.exports = { deleteUser };

const { User } = require('../../db');

const deleteUser = async (req, res) => {
    const { id } = req.params; 
    try {
        const user = await User.findByPk(id);
        // Cambiar el valor de isActive usando un operador ternario
        const updatedIsActive = user.isActive ? false : true;
        await user.update({ isActive: updatedIsActive });
        res.status(200).send("user successfully deactivated") 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { deleteUser };






