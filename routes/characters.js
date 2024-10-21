const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/characters');
const { validateCharacter } = require('../middleware/validate');
const isAuth = require('../middleware/authenticated');

router.get('/', charactersController.getAllCharacters);
router.get('/:id', charactersController.getSingleCharacter);
router.get('/house/:house', charactersController.getCharactersByHouse);
router.post(
	'/',
	isAuth,
	validateCharacter,
	charactersController.createCharacter
);
router.put(
	'/:id',
	isAuth,
	validateCharacter,
	charactersController.updateCharacter
);
router.delete('/:id', isAuth, charactersController.deleteCharacter);

module.exports = router;
