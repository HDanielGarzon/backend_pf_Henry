//index todas las rutas
const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRouter = require("./products");
const userRouter = require('./users')
const orderRouter = require('./order')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRouter);
router.use("/user",userRouter);
router.use("/order",orderRouter)


module.exports = router;