// Procedural Web Audio Engine for Cyber-Nautical Ambience & UI Sounds
// Zero external audio files required - 100% synthesized in-browser

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    // Check saved preference
    const saved = localStorage.getItem("capn_j_audio_muted");
    if (saved !== null) {
      this.isMuted = saved === "true";
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Subscribe to mute state changes
  public subscribe(listener: (muted: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isMuted));
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem("capn_j_audio_muted", String(this.isMuted));
    
    if (!this.isMuted) {
      this.initContext();
      this.startSeaAmbience();
      this.playChime(587.33, 0.15); // D5 chime
    } else {
      this.stopSeaAmbience();
    }

    this.notify();
    return this.isMuted;
  }

  // Start gentle ambient ocean waves + wind swell
  private startSeaAmbience() {
    if (this.isMuted || !this.ctx) return;

    try {
      this.stopSeaAmbience();

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      
      // Generate pink noise for soft water texture
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Low-pass filter for deep ocean rumble
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      // Low Frequency Oscillator for wave swell
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec wave cycle

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(180, this.ctx.currentTime); // modulate filter frequency +/- 180Hz

      lfo.connect(filter.frequency);

      // Master ambience gain
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      lfo.start();

      this.noiseNode = whiteNoise;
      this.lfo = lfo;
      this.gainNode = gain;
    } catch (e) {
      console.warn("Audio error:", e);
      // AudioContext might still require gesture
    }
  }

  private stopSeaAmbience() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.noiseNode) {
            try { (this.noiseNode as AudioScheduledSourceNode).stop(); } catch (e) { console.warn("Audio error:", e); }
            this.noiseNode = null;
          }
          if (this.lfo) {
            try { this.lfo.stop(); } catch (e) { console.warn("Audio error:", e); }
            this.lfo = null;
          }
        }, 500);
      } catch (e) {
        console.warn("Audio error:", e);
        this.noiseNode = null;
        this.lfo = null;
      }
    }
  }

  // Play subtle high-tech UI click
  public playClick(freq = 800, duration = 0.04) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Play hover tick
  public playHover() {
    this.playClick(1200, 0.02);
  }

  // Play golden treasure chime
  public playLootChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 0.4);
        }, idx * 60);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  private playChime(freq: number, duration: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
}

export const soundEngine = new AudioEngine();
