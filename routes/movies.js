const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { validateMovie } = require('../middleware/validate');


router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', validateMovie, moviesController.createMovie);  
router.put('/:id', validateMovie, moviesController.updateMovie);  
router.delete('/:id', moviesController.deleteMovie);


module.exports = router;
