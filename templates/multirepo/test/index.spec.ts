import addNumbers from '@/index.ts';
import { describe, it, expect } from 'vitest';

describe('addNumbers', () => {
  it('should add two numbers correctly', () => {
    expect(addNumbers(2, 3)).toBe(5);
  });

  it('should add multiple types of numbers correctly', () => {
    expect(addNumbers(0, 0)).toBe(0);
    expect(addNumbers(-1, 1)).toBe(0);
    expect(addNumbers(100, 200)).toBe(300);
  });
});
