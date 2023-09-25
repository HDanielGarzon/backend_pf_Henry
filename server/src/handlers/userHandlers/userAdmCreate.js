const {User, Administrator} = require('../../db');
const bcrypt = require('bcryptjs');
const userAdmCreate = async (req, res) => {
    const {	name,lastName,nikName,email,password,role,address,areaOfResponsibility}= req.body
    
    try {
      if(!name || !lastName || !nikName || !email || !password || !role || !address || !areaOfResponsibility ){
        return res.status(404).json({message:"insufficient data"});
      };

      const existingUser = await User.findOne({ where: { email } });
      if(existingUser){
        return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        lastName,
        nikName,
        email,
        password: hashedPassword,
        role
        // rol:'customer'
      });

      await Administrator.create({
        UserId: newUser.id,
        address,
        areaOfResponsibility
      });
      return res.status(201).json({ message: 'Administador creado con éxito.'});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { userAdmCreate };
