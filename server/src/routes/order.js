// ruta usuarios
const { Router } = require("express");
const orderRouter = Router();


const {orderCreate} = require('../handlers/orderHandlers/createOrder')
const {allOrder} = require('../handlers/orderHandlers/allOrder')

// endpoints: ruta de acceso a nuestro backend;
orderRouter.post('/create',orderCreate)
orderRouter.get('/',allOrder)




module.exports = orderRouter;