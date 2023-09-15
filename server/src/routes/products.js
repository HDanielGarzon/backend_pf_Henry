// ruta usuarios
const { Router } = require("express");
const userRouter = Router();

const { productAllHandler } = require("../handlers/productsHandlers/productAllHandler");

// endpoints: ruta de acceso a nuestro backend;

userRouter.get("/all", productAllHandler);

module.exports = userRouter;
