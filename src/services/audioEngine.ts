/**
 * Cyberpunk Synthetic UI Audio Engine
 * Pure Web Audio API — Zero external audio files/assets (0 KB download).
 * All frequencies and envelopes synthesized mathematically in real-time.
 */

class SyntheticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled: boolean = false;
  private lastHoverTime: number = 0;

  constructor() {
    // Check localStorage preference; default to true so first click starts sound
    const saved = localStorage.getItem('portfolio_sound_enabled');
    this.enabled = saved === null ? true : saved === 'true';
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.enabled ? 0.22 : 0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(enable: boolean) {
    this.enabled = enable;
    localStorage.setItem('portfolio_sound_enabled', String(enable));
    if (this.ctx && this.masterGain) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.linearRampToValueAtTime(enable ? 0.22 : 0, t + 0.05);
    }
    if (enable) {
      this.initContext();
      this.playSuccess();
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  /**
   * Crisp tactical sci-fi micro-click
   */
  public playClick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // Rapid pitch sweep downwards
    osc.frequency.setValueAtTime(680, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.04);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  /**
   * Gentle high-frequency hover tick / blip (debounced to 35ms)
   */
  public playHover() {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastHoverTime < 35) return;
    this.lastHoverTime = now;

    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.Q.setValueAtTime(3, t);

    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.028);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  /**
   * Ascending futuristic holographic warp sweep on theme change
   */
  public playThemeSwitch() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    // Harmonic arpeggio rise
    osc1.frequency.setValueAtTime(261.63, t); // C4
    osc1.frequency.exponentialRampToValueAtTime(523.25, t + 0.08); // C5
    osc1.frequency.exponentialRampToValueAtTime(1046.5, t + 0.18); // C6

    osc2.frequency.setValueAtTime(329.63, t); // E4
    osc2.frequency.exponentialRampToValueAtTime(659.25, t + 0.12); // E5

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.exponentialRampToValueAtTime(2800, t + 0.18);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.linearRampToValueAtTime(0.24, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.23);
    osc2.stop(t + 0.23);
  }

  /**
   * CRT/Cyberpunk terminal keystroke click with subtle pitch randomization
   */
  public playTerminalKey() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Subtle humanized pitch variance
    const baseFreq = 880 + (Math.random() - 0.5) * 120;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.025);

    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.032);
  }

  /**
   * Cyber terminal open power-up hum
   */
  public playTerminalOpen() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const sub = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.15);

    sub.type = 'triangle';
    sub.frequency.setValueAtTime(90, t);
    sub.frequency.exponentialRampToValueAtTime(220, t + 0.15);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    sub.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    sub.start(t);
    osc.stop(t + 0.19);
    sub.stop(t + 0.19);
  }

  /**
   * Positive dual-tone confirmation chime
   */
  public playSuccess() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, t); // C5
    gain1.gain.setValueAtTime(0.18, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, t + 0.08); // E5
    gain2.gain.setValueAtTime(0.0, t);
    gain2.gain.setValueAtTime(0.22, t + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

    osc1.connect(gain1);
    gain1.connect(this.masterGain);

    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    osc1.start(t);
    osc1.stop(t + 0.13);
    osc2.start(t + 0.08);
    osc2.stop(t + 0.25);
  }
}

export const soundEngine = new SyntheticAudioEngine();
