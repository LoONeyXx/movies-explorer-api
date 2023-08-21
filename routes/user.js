import express from 'express';
import auth from '../middlewares/auth.js';
import {
  addUser, updateUser, getUser, login, logout,
} from '../controllers/user.js';
import { userValidatorAuth, userValidatorUpdate } from '../utils/validators.js';

const router = express.Router();
router.post('/signup', userValidatorAuth(), addUser);
router.post('/signin', userValidatorAuth(), login);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, userValidatorUpdate(), updateUser);
router.get('/logout', auth, logout);
export default router;
