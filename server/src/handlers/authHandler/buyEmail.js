const { buySendEmail } = require("../../utils/nodemailer/buyEmail");


const buyEmail = async (req, res) =>{
    const {email} = req.body;
    
   
    try {
        const result = await buySendEmail(email)
        res.send(result)
    } catch (error) {
        res.send({error:error.message})
    }
}
module.exports ={
    buyEmail,
}