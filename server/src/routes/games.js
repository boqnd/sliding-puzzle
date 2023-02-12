import { Router } from 'express';
import { gameService } from '../services/gameService.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';


const router = Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await gameService.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await gameService.findByPk(id));
  } catch (err) {
    next(err);
  }
});

router.get('/:id/full', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await gameService.getGameWithPlayers(id));
  } catch (err) {
    next(err);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await gameService.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await gameService.update(id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await gameService.delete(id));
  } catch (err) {
    next(err);
  }
});

export default router;
