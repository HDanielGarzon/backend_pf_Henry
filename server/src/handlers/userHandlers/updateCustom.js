const { User} = require("../../db");

const updateCustom = async (req, res) => {
    const { id } = req.params;
    const {name, lastname,nikName,email,password,gender,phoneNumber,shippingAddress,defaultPaymentMethod} = req.body;

    try {
        const user = await User.findOne({
            where: { id }
        });

        // Actualiza las propiedades del producto con los valores proporcionados en req.body
        user.name = name ;
        user.lastname= lastname;
        user.nikName = nikName;
        user.email= email
        user.password=password
        user.gender = gender
        user.phoneNumber=phoneNumber
        user.shippingAddres=shippingAddress
        user.defaultPaymentMethod=defaultPaymentMethod

        // Guarda los cambios en el producto
        await user.save();

        return res.status(200).json({message:"Complete custom update"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    updateCustom
}
