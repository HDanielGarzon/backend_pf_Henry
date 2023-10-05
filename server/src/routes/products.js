// ruta usuarios
const { Router } = require("express");
const userRouter = Router();

const { productAllHandler } = require("../handlers/productsHandlers/productAllHandler");
const { productCreate } = require("../handlers/productsHandlers/productCreate");
const { deleteProduct } = require("../handlers/productsHandlers/deleteProduct");
const { searchProduct } = require("../handlers/productsHandlers/searchProduct");
const { updateProduct } = require("../handlers/productsHandlers/updateProduct");
const { productAllHandlerAdmin} = require("../handlers/productsHandlers/productAllAdmin")


// endpoints: ruta de acceso a nuestro backend;
userRouter.get("/search",searchProduct)
userRouter.get("/", productAllHandler);
userRouter.post("/create",productCreate)
userRouter.delete("/:id",deleteProduct)
userRouter.put("/update/:id",updateProduct)
userRouter.get('/all-admin', productAllHandlerAdmin)


module.exports = userRouter;
