const { Router } = require("express");
const userRouter = Router();

const {userCustCreate} = require('../handlers/userHandlers/userCustCreate');
const { checkRoleAuth } = require("../middlerware/checkRoleAuth");
const { getUsers } = require("../handlers/userHandlers/getUsers");

// endpoints: ruta de acceso a nuestro backend;
userRouter.post('/create-customer',userCustCreate)
userRouter.get('/',checkRoleAuth(['administrator']), getUsers)

module.exports = userRouter;