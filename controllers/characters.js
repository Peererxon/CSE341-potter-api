const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all characters
const getAllCharacters = async (req, res) => {
	//#swagger.tags=['Characters']
	try {
		const db = mongodb.getDb();
		const result = await db.collection('characters').find();
		const characters = await result.toArray();

		if (characters.length === 0) {
			return res.status(204).send();
		} else {
			return res.status(200).json(characters);
		}
	} catch (err) {
		console.error('Error fetching characters:', err);
		return res.status(500).send('Error fetching characters');
	}
};

// Get single character by ID
const getSingleCharacter = async (req, res) => {
	//#swagger.tags=['Characters']
	try {
		const characterId = req.params.id;

		if (!ObjectId.isValid(characterId)) {
			return res.status(400).json({ message: 'Invalid character ID format' });
		}

		const db = mongodb.getDb();
		const character = await db
			.collection('characters')
			.findOne({ _id: ObjectId.createFromHexString(characterId) });

		if (!character) {
			return res.status(404).send('Character not found');
		} else {
			return res.status(200).json(character);
		}
	} catch (err) {
		console.error('Error fetching single character:', err);
		return res.status(500).send('Error fetching single character');
	}
};

// Get all characters by house
const getCharactersByHouse = async (req, res) => {
	//#swagger.tags=['Characters']
	try {
		const houseName = req.params.house;

		const db = mongodb.getDb();
		const result = await db.collection('characters').find({ house: houseName });
		const characters = await result.toArray();

		if (characters.length === 0) {
			return res
				.status(404)
				.json({ message: 'No characters found for this house' });
		} else {
			return res.status(200).json(characters);
		}
	} catch (err) {
		console.error('Error fetching characters by house:', err);
		return res
			.status(500)
			.json({ message: 'Server error while fetching characters by house' });
	}
};

// Create a new character
const createCharacter = async (req, res) => {
	//#swagger.tags=['Characters']
	try {
		const character = { ...req.body };

		const db = mongodb.getDb();
		const response = await db.collection('characters').insertOne(character);

		if (response.acknowledged) {
			return res.status(201).json({
				message: 'Character created successfully',
				characterId: response.insertedId,
			});
		} else {
			return res.status(500).json({ message: 'Error creating character' });
		}
	} catch (err) {
		console.error('Error creating character:', err);
		return res
			.status(500)
			.json({ message: 'Server error while creating character' });
	}
};

// Update a character by ID
const updateCharacter = async (req, res) => {
	//#swagger.tags=['Characters']
	try {
		const characterId = req.params.id;

		if (!ObjectId.isValid(characterId)) {
			return res.status(400).json({ message: 'Invalid character ID format' });
		}

		const characterUpdates = {
			...(req.body.fullName && { fullName: req.body.fullName }),
			...(req.body.house && { house: req.body.house }),
			...(req.body.birthdate && { birthdate: req.body.birthdate }),
			...(req.body.bloodStatus && { bloodStatus: req.body.bloodStatus }),
			...(req.body.patronus && { patronus: req.body.patronus }),
		};

		const db = mongodb.getDb();
		const response = await db
			.collection('characters')
			.updateOne(
				{ _id: ObjectId.createFromHexString(characterId) },
				{ $set: characterUpdates }
			);

		if (response.modifiedCount > 0) {
			return res.status(204).send();
		} else {
			return res
				.status(500)
				.json({ message: 'Error updating character or character not found' });
		}
	} catch (err) {
		console.error('Error updating character:', err);
		return res
			.status(500)
			.json({ message: 'Server error while updating character' });
	}
};

// Delete a character by ID
const deleteCharacter = async (req, res) => {
	//#swagger.tags=['Characters']
	try {
		const characterId = req.params.id;

		if (!ObjectId.isValid(characterId)) {
			return res.status(400).json({ message: 'Invalid character ID format' });
		}

		const db = mongodb.getDb();
		const response = await db
			.collection('characters')
			.deleteOne({ _id: ObjectId.createFromHexString(characterId) });

		if (response.deletedCount > 0) {
			return res.status(204).send();
		} else {
			return res
				.status(500)
				.json({ message: 'Failed to delete character or character not found' });
		}
	} catch (err) {
		console.error('Error deleting character:', err);
		return res
			.status(500)
			.json({ message: 'Server error while deleting character' });
	}
};

module.exports = {
	getAllCharacters,
	getSingleCharacter,
	getCharactersByHouse,
	createCharacter,
	updateCharacter,
	deleteCharacter,
};
