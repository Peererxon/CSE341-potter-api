const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all houses
const collectionName = 'houses';
const getAllHouses = async (req, res) => {
	//#swagger.tags=['Houses']
	try {
		const db = mongodb.getDb();
		const result = await db.collection(collectionName).find();
		const houses = await result.toArray();

		if (houses.length === 0) {
			return res.status(204).send();
		} else {
			return res.status(200).json(houses);
		}
	} catch (err) {
		console.error('Error fetching houses:', err);
		return res.status(500).send('Error fetching houses');
	}
};

// Get single House by ID
const getSingleHouse = async (req, res) => {
	//#swagger.tags=['Houses']
	try {
		const houseId = req.params.id;

		if (!ObjectId.isValid(houseId)) {
			return res.status(400).json({ message: 'Invalid house ID format' });
		}

		const db = mongodb.getDb();
		const house = await db
			.collection(collectionName)
			.findOne({ _id: ObjectId.createFromHexString(houseId) });

		if (!house) {
			return res.status(404).send('House not found');
		} else {
			return res.status(200).json(house);
		}
	} catch (err) {
		console.error('Error fetching single house:', err);
		return res.status(500).send('Error fetching single House');
	}
};

// Create a new House
const createHouse = async (req, res) => {
	//#swagger.tags=['Houses']
	try {
		const house = { ...req.body };

		const db = mongodb.getDb();
		const response = await db.collection(collectionName).insertOne(house);

		if (response.acknowledged) {
			return res.status(201).json({
				message: 'House created successfully',
				houseId: response.insertedId,
			});
		} else {
			return res.status(500).json({ message: 'Error creating House' });
		}
	} catch (err) {
		console.error('Error creating house:', err);
		return res
			.status(500)
			.json({ message: 'Server error while creating house' });
	}
};

// Update a house by ID
const updateHouse = async (req, res) => {
	//#swagger.tags=['Houses']
	try {
		const houseId = req.params.id;

		if (!ObjectId.isValid(houseId)) {
			return res.status(400).json({ message: 'Invalid House ID format' });
		}

		const houseUpdates = {
			...req.body,
		};

		const db = mongodb.getDb();
		const response = await db
			.collection(collectionName)
			.updateOne(
				{ _id: ObjectId.createFromHexString(houseId) },
				{ $set: houseUpdates }
			);

		if (response.modifiedCount > 0) {
			return res.status(204).send();
		} else {
			return res
				.status(500)
				.json({ message: 'Error updating house or house not found' });
		}
	} catch (err) {
		console.error('Error updating house:', err);
		return res
			.status(500)
			.json({ message: 'Server error while updating house' });
	}
};

// Delete a house by ID
const deleteHouse = async (req, res) => {
	//#swagger.tags=['Houses']
	try {
		const houseId = req.params.id;

		if (!ObjectId.isValid(houseId)) {
			return res.status(400).json({ message: 'Invalid house ID format' });
		}

		const db = mongodb.getDb();
		const response = await db
			.collection(collectionName)
			.deleteOne({ _id: ObjectId.createFromHexString(houseId) });

		if (response.deletedCount > 0) {
			return res.status(204).send();
		} else {
			return res
				.status(500)
				.json({ message: 'Failed to delete house or house not found' });
		}
	} catch (err) {
		console.error('Error deleting house:', err);
		return res
			.status(500)
			.json({ message: 'Server error while deleting house' });
	}
};

module.exports = {
	getAllHouses,
	getSingleHouse,
	createHouse,
	updateHouse,
	deleteHouse,
};
