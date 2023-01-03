import cors from 'cors';
import { Router } from 'express';
import notFound from './notFound.js';

const router = Router();

router.use(cors());

// TODO: Implement
// router.use(authenticate);

// TODO: Add routes

router.use(notFound);

export default router;
