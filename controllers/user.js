import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';
import ValidationError from '../errors/validation-error.js';
import NotFoundError from '../errors/not-found-error.js';
import AlreadyExistError from '../errors/already-exist-error.js';
import { JWT_SECRET } from '../utils/config.js';

export async function addUser(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      password: hash,
      email,
    });
    const userData = newUser.toObject();
    delete userData.password;
    res.status(201).send({ data: userData });
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError
    ) {
      next(new ValidationError(err));
      return;
    }
    if (err.code === 11000) {
      next(new AlreadyExistError('Пользователь с таким Email уже существует'));
      return;
    }
    next(err);
  }
}
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredential(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 36000000,
      httpOnly: true,
    });
    res.status(200).send({ token, _id: user._id });
  } catch (err) {
    next(err);
  }
}
export async function logout(req, res, next) {
  try {
    res.clearCookie('jwt').send({ message: 'Выход' });
  } catch (error) {
    next(error);
  }
}
export async function getUser(req, res, next) {
  try {
    const user = await User.find({ _id: req.user._id }).orFail();
    res.status(200).send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Такого пользователя не существует'));
      return;
    }
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { email, name } = req.body;
    // const isAlreadyExistEmail = await User.find({ email })
    // if (isAlreadyExistEmail) {
    //   throw new AlreadyExistError('Такой Email уже существует')
    // }
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, {
      $set: { email, name },

    }, {
      returnOriginal: false,
      runValidators: true,
    }).orFail();
    res.status(200).send({ data: user });
  } catch (err) {
    if (
      err instanceof mongoose.Error.ValidationError
        || err instanceof mongoose.Error.CastError
    ) {
      next(new ValidationError(err));
      return;
    }
    if (err instanceof mongoose.Error.NotFoundError) {
      next(new NotFoundError('Такого пользователя не существует'));
      return;
    }
    next(err);
  }
}
