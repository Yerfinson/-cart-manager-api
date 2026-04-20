import { DeleteProductUseCase } from './delete-product.use-case';
import { IProductRepository } from '../../domain/repositories';
import { ProductNotFoundException } from '../../domain/exceptions';
import { Product } from '../../domain/entities';

const existing: Product = {
  id: '1',
  name: 'Laptop',
  description: 'A laptop',
  price: 999,
  stock: 5,
  category: 'Electronics',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('DeleteProductUseCase', () => {
  it('should delete the product successfully', async () => {
    const repo: IProductRepository = {
      findAll: jest.fn(),
      findById: jest.fn().mockResolvedValue(existing),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const useCase = new DeleteProductUseCase(repo);
    await expect(useCase.execute('1')).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith('1');
  });

  it('should throw ProductNotFoundException when product does not exist', async () => {
    const repo: IProductRepository = {
      findAll: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const useCase = new DeleteProductUseCase(repo);
    await expect(useCase.execute('999')).rejects.toThrow(ProductNotFoundException);
  });
});
