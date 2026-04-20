import { ProductNotFoundException } from './product-not-found.exception';

describe('ProductNotFoundException', () => {
  it('should have the correct message format', () => {
    const error = new ProductNotFoundException('abc-123');
    expect(error.message).toBe('Product with id "abc-123" not found');
    expect(error.name).toBe('ProductNotFoundException');
    expect(error).toBeInstanceOf(Error);
  });
});
