import { ProductNotFoundException } from '../../domain/exceptions';
import { IProductRepository } from '../../domain/repositories';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.productRepository.findById(id);
    if (!existing) throw new ProductNotFoundException(id);
    await this.productRepository.delete(id);
  }
}
