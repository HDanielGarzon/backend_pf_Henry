//index todas las rutas
const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const usersRouter = require("./userRouter");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/users", usersRouter);


module.exports = router;