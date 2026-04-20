import { GetProductByIdUseCase } from './get-product-by-id.use-case';
import { IProductRepository } from '../../domain/repositories';
import { ProductNotFoundException } from '../../domain/exceptions';
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

const makeRepo = (product: Product | null): IProductRepository => ({
  findAll: jest.fn(),
  findById: jest.fn().mockResolvedValue(product),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('GetProductByIdUseCase', () => {
  it('should return the product when found', async () => {
    const useCase = new GetProductByIdUseCase(makeRepo(mockProduct));
    const result = await useCase.execute('1');
    expect(result.id).toBe('1');
  });

  it('should throw ProductNotFoundException when product does not exist', async () => {
    const useCase = new GetProductByIdUseCase(makeRepo(null));
    await expect(useCase.execute('999')).rejects.toThrow(ProductNotFoundException);
  });
});
