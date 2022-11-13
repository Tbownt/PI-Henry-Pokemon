const { Router } = require('express');
const pokemon = require('./pokemon')
const types = require('./types')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/pokemons', pokemon);
router.use('/types', types);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
