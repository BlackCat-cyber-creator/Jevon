import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { soundEngine } from './audio';

describe('AudioEngine', () => {
  beforeAll(() => {
    // Mock AudioContext because it is not available in jsdom environment
    class AudioContextMock {
      state = 'running';
      currentTime = 0;
      destination = {};
      sampleRate = 44100;
      resume = vi.fn();
      suspend = vi.fn();
      close = vi.fn();
      createBuffer = vi.fn(() => ({ getChannelData: vi.fn(() => new Float32Array(100)) }));
      createBufferSource = vi.fn(() => ({ buffer: null, loop: false, connect: vi.fn(), start: vi.fn(), stop: vi.fn() }));
      createBiquadFilter = vi.fn(() => ({ type: '', frequency: { setValueAtTime: vi.fn() }, Q: { setValueAtTime: vi.fn() }, connect: vi.fn() }));
      createOscillator = vi.fn(() => ({ type: '', frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn(), start: vi.fn(), stop: vi.fn() }));
      createGain = vi.fn(() => ({ gain: { value: 1, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn() }));
    }
    (window as any).AudioContext = AudioContextMock;
  });

  beforeEach(() => {
    // Reset the audio engine state by directly clearing local storage if needed
    localStorage.clear();
  });

  it('should notify listeners when mute state is toggled', () => {
    // 1. Subscribe a mock function
    const mockListener = vi.fn();
    const unsubscribe = soundEngine.subscribe(mockListener);

    // Initial state: mockListener should have been called once with the current mute state (which is true by default or depends on localStorage)
    expect(mockListener).toHaveBeenCalledTimes(1);

    // We get the current mute state to know what the next one should be
    const initialState = soundEngine.getMuted();

    // 2. Toggle mute state
    soundEngine.toggleMute();

    // The listener should be called again with the new state
    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenLastCalledWith(!initialState);

    // 3. Toggle back
    soundEngine.toggleMute();

    expect(mockListener).toHaveBeenCalledTimes(3);
    expect(mockListener).toHaveBeenLastCalledWith(initialState);

    // Clean up
    unsubscribe();
  });
});
