import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../main';
describe('calculateDiscount', () => {
  it('should return discount amount if they are a valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });
  it('should handle negative prices', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/Invalid/);
  });
  it('should handle invalid discount codes', () => {
    expect(calculateDiscount(10, 'invalid')).toBe(10);
  });
});
