import { Router } from 'express';
import { userService } from '../services/userService.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const router = Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await userService.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await userService.findByPk(id));
  } catch (err) {
    next(err);
  }
});

router.get('/:id/full', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await userService.getFullUser(id));
  } catch (err) {
    next(err);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await userService.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await userService.update(id, req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    res.send(await userService.delete(id));
  } catch (err) {
    next(err);
  }
});

export default router;
