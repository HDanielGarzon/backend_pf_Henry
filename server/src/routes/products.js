// ruta usuarios
const { Router } = require("express");
const userRouter = Router();

const {muebles} = require("../handlers/productHandler");



// endpoints: ruta de acceso a nuestro backend;

userRouter.get("/all", muebles);


module.exports = userRouter;