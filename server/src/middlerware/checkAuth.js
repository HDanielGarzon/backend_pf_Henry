const { verifyToken } = require("../helpers/generateTokens");

const checkAuth = async (req, res, next) => {
  try {
    const token =req.headers.authorization.split(' ').pop();
    const tokenData = await verifyToken(token)
    console.log("tokenData", tokenData);
    if(tokenData.id){
        next()
    }else(
        res.status(409).send({error: "Tu por aqui no pasas!"})
    )
  } catch (error) {

  }
};

module.exports={
    checkAuth,
}
