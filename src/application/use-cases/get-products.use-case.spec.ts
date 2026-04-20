import { GetProductsUseCase } from './get-products.use-case';
import { IProductRepository } from '../../domain/repositories';
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

describe('GetProductsUseCase', () => {
  it('should return all products from repository', async () => {
    const repository: IProductRepository = {
      findAll: jest.fn().mockResolvedValue([mockProduct]),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const useCase = new GetProductsUseCase(repository);
    const result = await useCase.execute();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no products exist', async () => {
    const repository: IProductRepository = {
      findAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const useCase = new GetProductsUseCase(repository);
    const result = await useCase.execute();
    expect(result).toHaveLength(0);
  });
});
