import { ErrorRequestHandler } from 'express';

export const handleError: ErrorRequestHandler = (error, _req, res, next) => {
  res.statusCode = 400;
  res.json({
    message: error.message
  });
  
  next();
};
