import { randomUUID } from 'crypto';
import { Product } from '../../domain/entities';
import { IProductRepository } from '../../domain/repositories';
import { CreateProductDto } from '../dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const now = new Date();
    const product: Product = {
      id: randomUUID(),
      ...dto,
      createdAt: now,
      updatedAt: now,
    };
    return this.productRepository.save(product);
  }
}
