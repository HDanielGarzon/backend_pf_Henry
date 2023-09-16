// ruta usuarios
const { Router } = require("express");
const userRouter = Router();

const { productAllHandler } = require("../handlers/productsHandlers/productAllHandler");
const { productCreate } = require("../handlers/productsHandlers/productCreate");
const { deleteProduct } = require("../handlers/productsHandlers/deleteProduct");
const { searchProduct } = require("../handlers/productsHandlers/searchProduct");


// endpoints: ruta de acceso a nuestro backend;
userRouter.get("/search/",searchProduct)
userRouter.get("/all", productAllHandler);
userRouter.post("/create",productCreate)
userRouter.delete("/delete/:id",deleteProduct)

module.exports = userRouter;
