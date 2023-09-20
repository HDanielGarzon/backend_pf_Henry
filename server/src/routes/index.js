//index todas las rutas
const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRouter = require("./products");
const  authRouter  = require("./auth");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRouter);
router.use("/auth", authRouter)


module.exports = router;