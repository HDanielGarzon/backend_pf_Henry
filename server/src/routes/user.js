// ruta usuarios
const { Router } = require("express");
const userRouter = Router();

const {user} = require("../handlers/userHandler");



// endpoints: ruta de acceso a nuestro backend;

userRouter.get("/", user);


module.exports = userRouter;