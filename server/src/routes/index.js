//index todas las rutas
const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRouter = require("./products");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRouter);


module.exports = router;