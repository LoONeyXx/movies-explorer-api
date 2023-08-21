import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import AuthError from '../errors/auth-error.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Некорректный URL поля 'email' ",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, "Минимальная длина поля 'name' - 2"],
    maxlength: [30, "Максимальная длина поля 'name' - 30"],
    default: 'Александр',
  },

}, { versionKey: false });

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new AuthError('Неверный Email');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  }
  throw new AuthError('Неправильный пароль');
};
const model = mongoose.model('user', userSchema);
model.createIndexes();
export default model;
