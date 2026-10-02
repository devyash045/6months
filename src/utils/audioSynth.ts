// Romantic Ambient Audio Synthesizer using Web Audio API
// Generates a soft, dreamy, romantic chord progression with harp/piano-like chimes

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private gainNode: GainNode | null = null;
  private currentChordIndex = 0;

  // Soft romantic chords: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 -> Cmaj9
  private chordProgression = [
    [261.63, 329.63, 392.0, 493.88, 587.33], // C, E, G, B, D (Cmaj9)
    [220.0, 261.63, 329.63, 392.0, 493.88],  // A, C, E, G, B (Am9)
    [174.61, 261.63, 329.63, 349.23, 440.0], // F, C, E, F, A (Fmaj7)
    [196.0, 261.63, 293.66, 392.0, 440.0],  // G, C, D, G, A (Gadd9)
    [220.0, 277.18, 329.63, 415.3, 493.88],  // Warm romantic alternate
  ];

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, volume: number = 0.15) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Warm sound: sine blended with triangle
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Envelope: slow soft attack, gentle exponential decay
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(volume, startTime + 0.1);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const step = () => {
      if (!this.isPlaying || !this.ctx) return;
      const chord = this.chordProgression[this.currentChordIndex];
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;

      const now = this.ctx.currentTime;
      // Arpeggiate notes in chord gently
      chord.forEach((freq, i) => {
        this.playTone(freq, now + i * 0.45, 3.2, 0.08);
      });
      // Add a subtle high shimmer bell
      const bellFreq = chord[chord.length - 1] * 2;
      this.playTone(bellFreq, now + 1.2, 2.5, 0.03);
    };

    step();
    this.intervalId = window.setInterval(step, 3200);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
