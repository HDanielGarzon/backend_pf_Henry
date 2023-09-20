const { Router } = require("express");
const userRouter = Router();

const {userCustCreate} = require('../handlers/userHandlers/userCustCreate')

// endpoints: ruta de acceso a nuestro backend;
userRouter.post('/create-customer',userCustCreate)

module.exports = userRouter;