import { Router } from 'express';
import createError from 'http-errors';

const router = Router();

router.use((req, res, next) => {
  next(createError(404, `Route ${req.path} not found`));
});

export default router;
