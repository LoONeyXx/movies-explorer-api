import jwt from 'jsonwebtoken';
import AuthError from '../errors/auth-error.js';
import { JWT_SECRET } from '../utils/config.js';

export default async function auth(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      next(new AuthError('Отсутствует токен'));
      return;
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthError('Неудачная авторизация'));
  }
}
