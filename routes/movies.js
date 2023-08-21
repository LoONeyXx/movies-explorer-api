import express from 'express';
import { movieBodyValidator, movieIdValidator } from '../utils/validators.js';
import { getMovies, addMovie, deleteMovie } from '../controllers/movies.js';
import auth from '../middlewares/auth.js';

const router = express.Router();
router.use(auth);
router.get('/movies', getMovies());
router.post('/movies', movieBodyValidator(), addMovie);
router.delete('/movies/:movieId', movieIdValidator(), deleteMovie);

export default router;
