// ruta usuarios
const { Router } = require("express");
const orderRouter = Router();


const {orderCreate} = require('../handlers/orderHandlers/createOrder')
const {allOrder} = require('../handlers/orderHandlers/allOrder')
const {payOrder} = require('../handlers/orderHandlers/payOrder')
const {updateStatus} = require('../handlers/orderHandlers/updateStatus')
const { getOrden } = require('../handlers/orderHandlers/getOrden')
const {updateOrden} = require('../handlers/orderHandlers/updateOrden')
// endpoints: ruta de acceso a nuestro backend;
orderRouter.post('/create',orderCreate)
orderRouter.get('/',allOrder)
orderRouter.post('/pay',payOrder)
orderRouter.put('/update',updateStatus)
orderRouter.get('/get/:email',getOrden)
orderRouter.put('/update-orden',updateOrden)




module.exports = orderRouter;