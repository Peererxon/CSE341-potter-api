const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { validateMovie } = require('../middleware/validate');
const isAuth = require('../middleware/authenticated');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', isAuth, validateMovie, moviesController.createMovie);
router.put('/:id', isAuth, validateMovie, moviesController.updateMovie);
router.delete('/:id', isAuth, moviesController.deleteMovie);

module.exports = router;
