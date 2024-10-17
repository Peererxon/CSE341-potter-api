const express = require('express');
const router = express.Router();

const characterRoutes = require('./characters');
const movieRoutes = require('./movies');
const spellRoutes = require('./spells');
const houseRoutes = require('./houses');
const swaggerRoutes = require('./swagger'); 

router.use('/characters', characterRoutes);
router.use('/movies', movieRoutes);
router.use('/spells', spellRoutes);
router.use('/houses', houseRoutes);
router.use('/', swaggerRoutes);

router.get('/test', (_, res) => {
	res.send('API is working!');
});

module.exports = router;
