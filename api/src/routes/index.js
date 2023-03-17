const { Router } = require("express");
const videogamesRoute = require("./videoGamesRoutes.js");
const genresRoute = require("./genresRoutes.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", videogamesRoute);
router.use("/", genresRoute);

module.exports = router;
