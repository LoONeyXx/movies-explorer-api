import express from 'express';
import rateLimit from 'express-rate-limit';
import userRouter from './user.js';
import moviesRouter from './movies.js';
import NotFoundError from '../errors/not-found-error.js';

const router = express.Router();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, //
  standardHeaders: true,
  legacyHeaders: false,
});
router.use(limiter);
router.use(userRouter);
router.use(moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});
export default router;
