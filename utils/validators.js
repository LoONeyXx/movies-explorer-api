import { celebrate, Joi } from 'celebrate';
import { pattern } from './config.js';

export const movieIdValidator = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().alphanum().length(24),
  }),
});

export const movieBodyValidator = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(pattern).required(),
    trailerLink: Joi.string().regex(pattern).required(),
    thumbnail: Joi.string().regex(pattern).required(),
    owner: Joi.string().hex().alphanum().length(24)
      .required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

export const userValidatorAuth = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
export const userValidatorUpdate = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2),
    email: Joi.string().email().required(),
  }),
});
