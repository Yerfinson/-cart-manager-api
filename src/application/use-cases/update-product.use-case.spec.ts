import { UpdateProductUseCase } from './update-product.use-case';
import { IProductRepository } from '../../domain/repositories';
import { ProductNotFoundException } from '../../domain/exceptions';
import { Product } from '../../domain/entities';

const existing: Product = {
  id: '1',
  name: 'Laptop',
  description: 'Old description',
  price: 999,
  stock: 5,
  category: 'Electronics',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UpdateProductUseCase', () => {
  it('should update and return the modified product', async () => {
    const repo: IProductRepository = {
      findAll: jest.fn(),
      findById: jest.fn().mockResolvedValue(existing),
      save: jest.fn(),
      update: jest.fn().mockImplementation(p => Promise.resolve(p)),
      delete: jest.fn(),
    };
    const useCase = new UpdateProductUseCase(repo);
    const result = await useCase.execute('1', { name: 'Laptop Pro' });
    expect(result.name).toBe('Laptop Pro');
    expect(result.description).toBe('Old description');
  });

  it('should throw ProductNotFoundException when product does not exist', async () => {
    const repo: IProductRepository = {
      findAll: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const useCase = new UpdateProductUseCase(repo);
    await expect(useCase.execute('999', { name: 'X' })).rejects.toThrow(ProductNotFoundException);
  });
});
