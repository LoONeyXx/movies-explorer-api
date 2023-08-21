import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import ValidationError from '../errors/validation-error.js';
import NotFoundError from '../errors/not-found-error.js';

export async function getMovies(req, res, next) {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(200).send({ data: movies });
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
          || err instanceof mongoose.Error.CastError
    ) {
      next(new ValidationError(err));
      return;
    }

    next(err);
  }
}

export async function addMovie(req, res, next) {
  try {
    const movie = req.body;
    const newMovie = await Movie.create({ ...movie, owner: req.user?._id });
    res.status(200).send({ data: newMovie });
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
          || err instanceof mongoose.Error.CastError
    ) {
      next(new ValidationError(err));
      return;
    }

    next(err);
  }
}

export async function deleteMovie(req, res, next) {
  try {
    const { movieId } = req.params;
    await Movie.findById({ _id: movieId }).orFail();
    const data = await Movie.deleteOne({ _id: movieId });
    res.status(200).send({ data });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Такой карточки не существует'));
      return;
    }
    next(err);
  }
}
