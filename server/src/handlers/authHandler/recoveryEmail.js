const {User} = require("../../db");
const { sendEmail } = require("../../utils/nodemailer/recoveryEmail");

const recoveryEmail = async (req, res) =>{
    const {email} = req.body;
    
   
    try {
        const result = await sendEmail(email)
        res.send(result)
    } catch (error) {
        res.send({error:error.message})
    }
}
module.exports ={
    recoveryEmail,
}