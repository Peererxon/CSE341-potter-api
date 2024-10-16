const express = require('express');
const router = express.Router();

const characterRoutes = require('./characters');
const movieRoutes = require('./movies');

router.use('/characters', require('./characters'));
router.use('/movies', require('./movies'));

router.use('/characters', characterRoutes);
router.use('/movies', movieRoutes);


router.get('/test', (_, res) => {
    res.send('API is working!');
});

module.exports = router;