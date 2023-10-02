const {User} = require("../../db");
const { WellcomeSendEmail } = require("../../utils/nodemailer/wellcomeEmail");

const wellcomeEmail = async (req, res) =>{
    const {email} = req.body;
    
   
    try {
        const result = await WellcomeSendEmail(email)
        res.send(result)
    } catch (error) {
        res.send({error:error.message})
    }
}
module.exports ={
    wellcomeEmail,
}