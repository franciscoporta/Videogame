const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const videogames = require('./videogames');
const videogame = require('./videogame');
const genre = require('./genre')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogames)

router.use('/videogame', videogame)

router.use('/genres', genre)

module.exports = router;
