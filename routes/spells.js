const express = require('express');
const router = express.Router();
const spellsController = require('../controllers/spells');
const { validateSpell } = require('../middleware/validate');
const isAuth = require('../middleware/authenticated');

router.get('/', spellsController.getAllSpells);
router.get('/:id', spellsController.getSingleSpell);
router.post('/', isAuth, validateSpell, spellsController.createSpell);
router.put('/:id', isAuth, validateSpell, spellsController.updateSpell);
router.delete('/:id', isAuth, spellsController.deleteSpell);

module.exports = router;
