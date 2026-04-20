import { CreateProductUseCase } from './create-product.use-case';
import { IProductRepository } from '../../domain/repositories';
import { CreateProductDto } from '../dto';

const makeRepo = (): IProductRepository => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  save: jest.fn().mockImplementation(p => Promise.resolve(p)),
  update: jest.fn(),
  delete: jest.fn(),
});

const dto: CreateProductDto = {
  name: 'Monitor',
  description: '4K Monitor',
  price: 399.99,
  stock: 10,
  category: 'Electronics',
};

describe('CreateProductUseCase', () => {
  it('should create a product with generated id and timestamps', async () => {
    const useCase = new CreateProductUseCase(makeRepo());
    const result = await useCase.execute(dto);
    expect(result.id).toBeDefined();
    expect(result.name).toBe('Monitor');
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it('should call repository.save once', async () => {
    const repo = makeRepo();
    const useCase = new CreateProductUseCase(repo);
    await useCase.execute(dto);
    expect(repo.save).toHaveBeenCalledTimes(1);
  });
});
