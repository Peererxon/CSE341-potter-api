const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all movies
const getAllMovies = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const result = await db.collection('movies').find();
        const movies = await result.toArray();

        if (movies.length === 0) {
            return res.status(204).send();
        } else {
            return res.status(200).json(movies);
        }
    } catch (err) {
        console.error('Error fetching movies:', err);
        return res.status(500).send('Error fetching movies'); 
    }
};

// Get single movie by ID
const getSingleMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!ObjectId.isValid(movieIdId)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const db = mongodb.getDb();
        const movie = await db.collection('movies').findOne({ _id: new ObjectId.createFromHexString(movieId) });

        if (!movie) {
            return res.status(404).send('Movie not found');
        } else {
            return res.status(200).json(movies);
        }
    } catch (err) {
        console.error('Error fetching single movie:', err);
        return res.status(500).send('Error fetching single movie');
    }
};

// Create a new movie
const createMovie = async (req, res) => {
    try {
        const movie = { ...req.body };

        const db = mongodb.getDb();
        const response = await db.collection('movies').insertOne(movie);

        if (response.acknowledged) {
            return res.status(201).json({ message: 'Movie created successfully', movieId: response.insertedId });
        } else {
            return res.status(500).json({ message: 'Error creating movie' });
        }
    } catch (err) {
        console.error('Error creating movie:', err);
        return res.status(500).json({ message: 'Server error while creating movie' });
    }
};

// Update a movie by ID
const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const movieUpdates = {
            ...(req.body.fullName && { fullName: req.body.fullName }),
            ...(req.body.house && { house: req.body.house }),
            ...(req.body.birthdate && { birthdate: req.body.birthdate }),
            ...(req.body.bloodStatus && { bloodStatus: req.body.bloodStatus }),
            ...(req.body.patronus && { patronus: req.body.patronus })
        };

        const db = mongodb.getDb();
        const response = await db.collection('movies').updateOne({ _id: new ObjectId.createFromHexString(movieId) }, { $set: movieUpdates });

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(500).json({ message: 'Error updating movie or movie not found' });
        }
    } catch (err) {
        console.error('Error updating movie:', err);
        return res.status(500).json({ message: 'Server error while updating movie' });
    }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: 'Invalid movie ID format' });
        }

        const db = mongodb.getDb();
        const response = await db.collection('movies').deleteOne({ _id: new ObjectId.createFromHexString(movieId) });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(500).json({ message: 'Failed to delete movie or movie not found' });
        }
    } catch (err) {
        console.error('Error deleting movie:', err);
        return res.status(500).json({ message: 'Server error while deleting movie' });
    }
};

module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovie,
    deleteMovie
};
