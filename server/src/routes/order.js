// ruta usuarios
const { Router } = require("express");
const orderRouter = Router();


const {orderCreate} = require('../handlers/orderHandlers/createOrder')
const {allOrder} = require('../handlers/orderHandlers/allOrder')
const {payOrder} = require('../handlers/orderHandlers/payOrder')
const {updateStatus} = require('../handlers/orderHandlers/updateStatus')
const { getOrden } = require('../handlers/orderHandlers/getOrden')

// endpoints: ruta de acceso a nuestro backend;
orderRouter.post('/create',orderCreate)
orderRouter.get('/',allOrder)
orderRouter.post('/pay',payOrder)
orderRouter.put('/update',updateStatus)
orderRouter.get('/get/:email',getOrden)




module.exports = orderRouter;