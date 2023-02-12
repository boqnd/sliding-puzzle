import { Router } from 'express';
import { scoreService } from '../services/scoreService.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const router = Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await scoreService.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await scoreService.findByPk(id));
  } catch (err) {
    next(err);
  }
});

router.get('/:id/full', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await scoreService.getScoresWithGameAndWinner(id));
  } catch (err) {
    next(err);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await scoreService.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await scoreService.update(id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await scoreService.delete(id));
  } catch (err) {
    next(err);
  }
});

export default router;
