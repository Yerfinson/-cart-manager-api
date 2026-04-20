import { Product } from '../../domain/entities';
import { IProductRepository } from '../../domain/repositories';

export class GetProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
