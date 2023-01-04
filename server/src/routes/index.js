import cors from 'cors';
import { Router } from 'express';
import notFound from './notFound.js';
import authenticate from './authenticate.js';

const router = Router();

router.use(cors());

router.use('/auth', authenticate);

// TODO: Add routes

router.use(notFound);

export default router;
