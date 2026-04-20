import { Product } from '../../domain/entities';
import { ProductNotFoundException } from '../../domain/exceptions';
import { IProductRepository } from '../../domain/repositories';
import { UpdateProductDto } from '../dto';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Product> {
    const existing = await this.productRepository.findById(id);
    if (!existing) throw new ProductNotFoundException(id);
    const updated: Product = { ...existing, ...dto, updatedAt: new Date() };
    return this.productRepository.update(updated);
  }
}
