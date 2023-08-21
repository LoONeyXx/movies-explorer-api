import express from 'express';
import auth from '../middlewares/auth.js';
import {
  addUser, updateUser, getUser, login,
} from '../controllers/user.js';
import { userValidatorAuth, userValidatorUpdate } from '../utils/validators.js';

const router = express.Router();
router.post('/signup', userValidatorAuth(), addUser);
router.post('/signin', userValidatorAuth(), login);
router.use(auth);
router.get('/user/me', getUser);
router.patch('/users/me', userValidatorUpdate(), updateUser);
export default router;
