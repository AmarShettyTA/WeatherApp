// Web Audio API Retro Chiptune Sound Synthesizer

class RetroSoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playBleep(freq: number = 440, duration: number = 0.08, type: OscillatorType = 'square') {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignore audio context errors silently
    }
  }

  playClick() {
    this.playBleep(600, 0.04, 'square');
  }

  playSelect() {
    this.playBleep(523.25, 0.06, 'square');
    setTimeout(() => this.playBleep(659.25, 0.08, 'square'), 60);
  }

  playSuccess() {
    this.playBleep(523.25, 0.05, 'square'); // C5
    setTimeout(() => this.playBleep(659.25, 0.05, 'square'), 50); // E5
    setTimeout(() => this.playBleep(783.99, 0.1, 'square'), 100); // G5
  }

  playToggle() {
    this.playBleep(350, 0.04, 'triangle');
    setTimeout(() => this.playBleep(450, 0.06, 'triangle'), 40);
  }
}

export const soundFx = new RetroSoundFX();
