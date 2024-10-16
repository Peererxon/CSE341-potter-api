const express = require('express');
const router = express.Router();

const characterRoutes = require('./characters');

router.use('/characters', require('./characters'));

router.use('/characters', characterRoutes);


router.get('/test', (_, res) => {
    res.send('API is working!');
});

module.exports = router;