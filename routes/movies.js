import express from 'express';
import { movieBodyValidator, movieIdValidator } from '../utils/validators.js';
import { getMovies, addMovie, deleteMovie } from '../controllers/movies.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
router.get('/movies', auth, getMovies);
router.post('/movies', auth, movieBodyValidator(), addMovie);
router.delete('/movies/:movieId', auth, movieIdValidator(), deleteMovie);

export default router;
