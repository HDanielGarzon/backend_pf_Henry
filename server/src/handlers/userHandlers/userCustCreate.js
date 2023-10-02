const {User, Customer} = require('../../db');
 const bcrypt = require('bcryptjs');
const userCustCreate = async (req, res) => {
    // const {	name,lastName,nikName,email,password,gender,phoneNumber,shippingAddress,defaultPaymentMethod}= req.body
    const {	name,lastName,email,password}= req.body
    try {
      // if(!name || !lastName || !nikName || !email || !password || !gender || !phoneNumber || !shippingAddress || !defaultPaymentMethod ){
        if(!name || !email || !password ){
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
        // nikName,
        email,
        password: hashedPassword,
        role:'customer'
      });

      // await Customer.create({
      //   UserId: newUser.id,
      //   gender,
      //   phoneNumber,
      //   shippingAddress,
      //   defaultPaymentMethod,
      // });
      return res.status(201).json({data: newUser, message: 'Cliente creado con éxito.'});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  module.exports = { userCustCreate };

