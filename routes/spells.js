const express = require('express');
const router = express.Router();
const spellsController = require('../controllers/spells');
const { validateSpell } = require('../middleware/validate');


router.get('/', spellsController.getAllSpells);
router.get('/:id', spellsController.getSingleSpell);
router.post('/', validateSpell, spellsController.createSpell);  
router.put('/:id', validateSpell, spellsController.updateSpell);  
router.delete('/:id', spellsController.deleteSpell);


module.exports = router;