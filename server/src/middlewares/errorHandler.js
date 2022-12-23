import { errorFormattingService } from '../services/errorFormattingService.js';

// eslint-disable-next-line no-unused-vars
export default function handleError(err, req, res, next) {
  res.status(err.status || 500);

  console.error(JSON.parse(JSON.stringify(err.message || err)));

  const result = {
    method: req.method,
    path: req.path,
    status: err.status,
  };
  result.message = errorFormattingService.getErrorMessage(err);

  if (err.errors) {
    result.errors = err.errors;
  }

  res.json(result);
}
