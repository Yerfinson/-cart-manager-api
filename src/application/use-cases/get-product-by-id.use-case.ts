import { Product } from '../../domain/entities';
import { ProductNotFoundException } from '../../domain/exceptions';
import { IProductRepository } from '../../domain/repositories';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new ProductNotFoundException(id);
    return product;
  }
}
