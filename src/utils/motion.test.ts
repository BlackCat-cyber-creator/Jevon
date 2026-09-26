import { describe, it, expect } from 'vitest';
import { fadeIn } from './motion';
import type { TMotion } from '../types';

describe('fadeIn utility', () => {
  it.each([
    ['left', 16, 0],
    ['right', -16, 0],
    ['up', 0, 16],
    ['down', 0, -16],
  ] as const)(
    'should return correct hidden variant for direction "%s"',
    (direction: TMotion['direction'], expectedX, expectedY) => {
      const variants = fadeIn(direction, 'tween', 0, 1);

      expect(variants.hidden).toEqual({
        x: expectedX,
        y: expectedY,
        opacity: 0,
      });
    }
  );

  it('should return correct show variant', () => {
    const variants = fadeIn('left', 'tween', 0.5, 1.5);

    expect(variants.show).toEqual({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: 'tween', delay: 0.5, duration: 1.5, ease: 'easeOut' },
    });
  });

  it('should return correct show variant with spring transition type', () => {
    const variants = fadeIn('right', 'spring', 0.2, 0.8);

    expect(variants.show).toEqual({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: 'spring', delay: 0.2, duration: 0.8, ease: 'easeOut' },
    });
  });
});
