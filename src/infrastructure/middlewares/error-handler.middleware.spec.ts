import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './error-handler.middleware';
import { ProductNotFoundException } from '../../domain/exceptions';

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockReq = {} as Request;
const mockNext = jest.fn() as NextFunction;

describe('errorHandler middleware', () => {
  it('should return 404 for ProductNotFoundException', () => {
    const error = new ProductNotFoundException('123');
    const res = mockRes();
    errorHandler(error, mockReq, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should return 500 for unknown errors', () => {
    const error = new Error('Unexpected failure');
    const res = mockRes();
    errorHandler(error, mockReq, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
