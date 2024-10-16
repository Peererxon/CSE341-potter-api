const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all spells
const getAllSpells = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const result = await db.collection('spells').find();
        const spells = await result.toArray();

        if (spells.length === 0) {
            return res.status(204).send();
        } else {
            return res.status(200).json(spells);
        }
    } catch (err) {
        console.error('Error fetching spells:', err);
        return res.status(500).send('Error fetching spells'); 
    }
};

// Get single spell by ID
const getSingleSpell = async (req, res) => {
    try {
        const spellId = req.params.id;

        if (!ObjectId.isValid(spellId)) {
            return res.status(400).json({ message: 'Invalid spell ID format' });
        }

        const db = mongodb.getDb();
        const spell = await db.collection('spells').findOne({ _id: ObjectId.createFromHexString(spellId) });

        if (!spell) {
            return res.status(404).send('Spell not found');
        } else {
            return res.status(200).json(spell);
        }
    } catch (err) {
        console.error('Error fetching single spell:', err);
        return res.status(500).send('Error fetching single spell');
    }
};

// Create a new spell
const createSpell = async (req, res) => {
    try {
        const spell = { ...req.body };

        const db = mongodb.getDb();
        const response = await db.collection('spells').insertOne(spell);

        if (response.acknowledged) {
            return res.status(201).json({ message: 'Spell created successfully', spellId: response.insertedId });
        } else {
            return res.status(500).json({ message: 'Error creating spell' });
        }
    } catch (err) {
        console.error('Error creating spell:', err);
        return res.status(500).json({ message: 'Server error while creating spell' });
    }
};

// Update a spell by ID
const updateSpell = async (req, res) => {
    try {
        const spellId = req.params.id;

        if (!ObjectId.isValid(spellId)) {
            return res.status(400).json({ message: 'Invalid spell ID format' });
        }

        const spellUpdates = {
            ...(req.body.spellName && { spellName: req.body.spellName }),
            ...(req.body.spellType && { director: req.body.spellType }),
            ...(req.body.use && { runtime: req.body.use }),
            ...(req.body.difficulty && { seriesNumber: req.body.difficulty }),
            ...(req.body.effects && { duration: req.body.effects })
        };

        const db = mongodb.getDb();
        const response = await db.collection('spells').updateOne({ _id: ObjectId.createFromHexString(spellId) }, { $set: spellUpdates });

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(500).json({ message: 'Error updating spell or spell not found' });
        }
    } catch (err) {
        console.error('Error updating spell:', err);
        return res.status(500).json({ message: 'Server error while updating spell' });
    }
};

// Delete a spell by ID
const deleteSpell = async (req, res) => {
    try {
        const spellId = req.params.id;

        if (!ObjectId.isValid(spellId)) {
            return res.status(400).json({ message: 'Invalid spell ID format' });
        }

        const db = mongodb.getDb();
        const response = await db.collection('spells').deleteOne({ _id: ObjectId.createFromHexString(spellId) });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(500).json({ message: 'Failed to delete spell or spell not found' });
        }
    } catch (err) {
        console.error('Error deleting spell:', err);
        return res.status(500).json({ message: 'Server error while deleting spell' });
    }
};

module.exports = {
    getAllSpells,
    getSingleSpell,
    createSpell,
    updateSpell,
    deleteSpell
};
