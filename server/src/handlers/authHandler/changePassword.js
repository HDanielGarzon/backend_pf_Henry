const { changePasswordController } = require("../../controllers/authController.js/changePasswordController");

const changePassword = async (req,res)=>{
    const {token, newPassword} = req.body;
    try {
        const result = await changePasswordController(token, newPassword);
        res.send(result)
    } catch (error) {
        res.send({error:error.message})
    }
}
module.exports={
    changePassword,
}