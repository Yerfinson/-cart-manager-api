import { InMemoryProductRepository } from './in-memory-product.repository';
import { Product } from '../../domain/entities';

const newProduct: Product = {
  id: 'test-1',
  name: 'Keyboard',
  description: 'Mechanical keyboard',
  price: 89.99,
  stock: 20,
  category: 'Accessories',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('InMemoryProductRepository', () => {
  let repo: InMemoryProductRepository;

  beforeEach(() => {
    repo = new InMemoryProductRepository();
  });

  describe('findAll', () => {
    it('should return the seeded products', async () => {
      const products = await repo.findAll();
      expect(products.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('findById', () => {
    it('should return product when it exists', async () => {
      const product = await repo.findById('1');
      expect(product).not.toBeNull();
      expect(product?.id).toBe('1');
    });

    it('should return null when product does not exist', async () => {
      const product = await repo.findById('nonexistent');
      expect(product).toBeNull();
    });
  });

  describe('save', () => {
    it('should persist and return the new product', async () => {
      const saved = await repo.save(newProduct);
      expect(saved.id).toBe('test-1');
      const all = await repo.findAll();
      expect(all.find(p => p.id === 'test-1')).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const updated = { ...(await repo.findById('1'))!, name: 'Laptop Ultra' };
      const result = await repo.update(updated);
      expect(result.name).toBe('Laptop Ultra');
      const found = await repo.findById('1');
      expect(found?.name).toBe('Laptop Ultra');
    });
  });

  describe('delete', () => {
    it('should remove the product from the list', async () => {
      await repo.delete('1');
      const found = await repo.findById('1');
      expect(found).toBeNull();
    });

    it('should not alter list when deleting a non-existent id', async () => {
      const before = (await repo.findAll()).length;
      await repo.delete('nonexistent');
      const after = (await repo.findAll()).length;
      expect(after).toBe(before);
    });
  });
});
