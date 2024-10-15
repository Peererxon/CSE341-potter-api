const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/characters');
const { validateCharacter } = require('../middleware/validate');


router.get('/', charactersController.getAllCharacters);
router.get('/:id', charactersController.getSingleCharacter);
router.post('/', validateCharacter, charactersController.createCharacter);  
router.put('/:id', validateCharacter, charactersController.updateCharacter);  
router.delete('/:id', charactersController.deleteCharacter);


module.exports = router;