import { Request, Response, NextFunction } from 'express';
import { ProductNotFoundException } from '../../domain/exceptions';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ProductNotFoundException) {
    res.status(404).json({ error: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};
