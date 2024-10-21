const express = require('express');
const router = express.Router();
const housesController = require('../controllers/houses');
const { validateHouse } = require('../middleware/validate');
const isAuth = require('../middleware/authenticated');

router.get('/', housesController.getAllHouses);
router.get('/:id', housesController.getSingleHouse);
router.post('/', isAuth, validateHouse, housesController.createHouse);
router.put('/:id', isAuth, validateHouse, housesController.updateHouse);
router.delete('/:id', isAuth, housesController.deleteHouse);

module.exports = router;
