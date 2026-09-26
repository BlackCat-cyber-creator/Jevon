import { describe, it, expect } from 'vitest';
import { textVariant } from './motion';

describe('textVariant', () => {
  it('should return the expected variant object', () => {
    const result = textVariant();
    expect(result).toEqual({
      hidden: { y: -12, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { type: 'tween', duration: 0.5, ease: 'easeOut' },
      },
    });
  });
});
