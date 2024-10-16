const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { validateCharacter } = require('../middleware/validate');


router.get('/', moviesController.getAllCharacters);
router.get('/:id', moviesController.getSingleCharacter);
router.post('/', validateCharacter, moviesController.createCharacter);  
router.put('/:id', validateCharacter, moviesController.updateCharacter);  
router.delete('/:id', moviesController.deleteCharacter);


module.exports = router;
