import { Product } from '../../domain/entities';
import { IProductRepository } from '../../domain/repositories';

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro',
      description: 'High performance laptop',
      price: 1299.99,
      stock: 10,
      category: 'Electronics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 29.99,
      stock: 50,
      category: 'Accessories',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(): Promise<Product[]> {
    return [...this.products];
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) ?? null;
  }

  async save(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex(p => p.id === product.id);
    this.products[index] = product;
    return product;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== id);
  }
}
