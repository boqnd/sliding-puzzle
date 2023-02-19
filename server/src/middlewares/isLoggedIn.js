import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { convictConfig } from '../../config.js';

export default function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    next(createError(403, 'A token is required for authentication'));
  }
  try {
    const [tokenType, jwtToken] = token.split(' ');
    if (tokenType !== 'Bearer') {
      next(createError(401, 'Invalid token type.'));
    }

    const decoded = jwt.verify(jwtToken, convictConfig.get('jwt.secret'));
    req.user = decoded;
  } catch (err) {
    next(createError(401, 'Invalid token'));
  }
  return next();
};