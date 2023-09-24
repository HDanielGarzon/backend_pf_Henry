const { verifyToken } = require("../helpers/generateTokens");
const { User } = require("../db");

const checkRoleAuth =(roles)=> async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    const userData = await User.findByPk(tokenData.id)
if ([].concat(roles).includes(userData.role)){
    next()
}else{
    res.status(409).send({error: "Tu no tienes permiso"})
}

  } catch (error) {
    res.status(409).send({error: "Tu no tienes permiso"})
  }
};

module.exports={
    checkRoleAuth,
}
