import { Request, Response, NextFunction } from 'express';
import { ProductController } from './product.controller';
import { Product } from '../../domain/entities';

const mockProduct: Product = {
  id: '1',
  name: 'Laptop',
  description: 'A laptop',
  price: 999,
  stock: 5,
  category: 'Electronics',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRes = () => {
  const res = {} as Response;
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockReq = (params = {}, body = {}) => ({ params, body }) as unknown as Request;
const mockNext = jest.fn() as NextFunction;

const makeController = (overrides: Partial<Record<string, jest.Mock>> = {}) => {
  const getAll = overrides.getAll ?? jest.fn().mockResolvedValue([mockProduct]);
  const getById = overrides.getById ?? jest.fn().mockResolvedValue(mockProduct);
  const create = overrides.create ?? jest.fn().mockResolvedValue(mockProduct);
  const update = overrides.update ?? jest.fn().mockResolvedValue(mockProduct);
  const del = overrides.del ?? jest.fn().mockResolvedValue(undefined);
  return new ProductController(
    { execute: getAll } as never,
    { execute: getById } as never,
    { execute: create } as never,
    { execute: update } as never,
    { execute: del } as never
  );
};

describe('ProductController', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('should return all products as json', async () => {
      const controller = makeController();
      const res = mockRes();
      await controller.getAll(mockReq(), res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ data: [mockProduct] });
    });

    it('should call next on error', async () => {
      const next = jest.fn();
      const controller = makeController({ getAll: jest.fn().mockRejectedValue(new Error('fail')) });
      await controller.getAll(mockReq(), mockRes(), next as NextFunction);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a product by id', async () => {
      const controller = makeController();
      const res = mockRes();
      await controller.getById(mockReq({ id: '1' }), res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ data: mockProduct });
    });

    it('should call next on error', async () => {
      const next = jest.fn();
      const controller = makeController({
        getById: jest.fn().mockRejectedValue(new Error('fail')),
      });
      await controller.getById(mockReq({ id: '1' }), mockRes(), next as NextFunction);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should return 201 with created product', async () => {
      const controller = makeController();
      const res = mockRes();
      await controller.create(mockReq({}, { name: 'Laptop' }), res, mockNext);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should call next on error', async () => {
      const next = jest.fn();
      const controller = makeController({ create: jest.fn().mockRejectedValue(new Error('fail')) });
      await controller.create(mockReq(), mockRes(), next as NextFunction);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should return the updated product', async () => {
      const controller = makeController();
      const res = mockRes();
      await controller.update(mockReq({ id: '1' }, { name: 'Updated' }), res, mockNext);
      expect(res.json).toHaveBeenCalledWith({ data: mockProduct });
    });

    it('should call next on error', async () => {
      const next = jest.fn();
      const controller = makeController({ update: jest.fn().mockRejectedValue(new Error('fail')) });
      await controller.update(mockReq({ id: '1' }), mockRes(), next as NextFunction);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should respond with 204 on success', async () => {
      const controller = makeController();
      const res = mockRes();
      await controller.delete(mockReq({ id: '1' }), res, mockNext);
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it('should call next on error', async () => {
      const next = jest.fn();
      const controller = makeController({ del: jest.fn().mockRejectedValue(new Error('fail')) });
      await controller.delete(mockReq({ id: '1' }), mockRes(), next as NextFunction);
      expect(next).toHaveBeenCalled();
    });
  });
});
