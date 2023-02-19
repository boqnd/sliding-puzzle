import { Router } from 'express';
import { userService } from '../services/userService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { convictConfig } from '../../config.js';
import createError from 'http-errors';

const router = Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      next(createError(400, 'All input is required'));
    }

    const oldUser = await userService.findByUsername(username);

    if (oldUser.length) {
      next(createError(409, 'Username already in use'));
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userService.create({
      username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user.id, username }, convictConfig.get('jwt.secret'), {
      expiresIn: convictConfig.get('jwt.expiresIn'),
    });

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    next(createError(500, err));
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      next(createError(400, 'All input is required'));
    }

    const users = await userService.findByUsername(username);
    var user;

    if (users.length) user = users[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, username },
        convictConfig.get('jwt.secret'),
        {
          expiresIn: convictConfig.get('jwt.expiresIn'),
        }
      );

      res.status(200).json(token);
    } else {
      next(createError(401, 'Invalid Credentials'));
    }
  } catch (err) {
    next(createError(500, err));
  }
});

export default router;
