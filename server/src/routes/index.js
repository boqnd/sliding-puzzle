import cors from 'cors';
import { Router } from 'express';
import notFound from './notFound.js';
import authenticate from './authenticate.js';
import games from './games.js';
import users from './users.js';
import scores from './scores.js';

const router = Router();

router.use(cors());

router.use('/auth', authenticate);
router.use('/games', games);
router.use('/users', users);
router.use('/scores', scores);

// TODO: Add routes

router.use(notFound);

export default router;
