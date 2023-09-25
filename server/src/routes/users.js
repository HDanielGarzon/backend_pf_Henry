const { Router } = require("express");
const userRouter = Router();

const {userCustCreate} = require('../handlers/userHandlers/userCustCreate');
const { checkRoleAuth } = require("../middlerware/checkRoleAuth");
const { getUsers } = require("../handlers/userHandlers/getUsers");
// const {userCustCreate} = require('../handlers/userHandlers/userCustCreate')
const {userAdmCreate} = require('../handlers/userHandlers/userAdmCreate')
const {allUsers} = require('../handlers/userHandlers/allUsers')
const {searchUser} = require('../handlers/userHandlers/searchUser')
const {updateCustom} = require('../handlers/userHandlers/updateCustom')
const {deleteUser} = require('../handlers/userHandlers/deleteUser')

// endpoints: ruta de acceso a nuestro backend;
userRouter.post('/create-customer',userCustCreate)
userRouter.get('/auth',checkRoleAuth(['administrator']), getUsers)
// endpoints: ruta de acceso a nuestro backend;

userRouter.post('/create-administrator', userAdmCreate)
userRouter.get('/',allUsers)
userRouter.get('/search',searchUser)
userRouter.put('/update-custom/:id',updateCustom)
userRouter.delete('/:id',deleteUser)

module.exports = userRouter;

