/**
 * BALANCED NUCLEAR MODE - Deep DSP Engine (V6)
 * - 4096 FFT, 75% Overlap (Hop 1024), Hann Window.
 * - Stage 2: Spectral Subtraction (Adaptive Slow Tracking)
 * - Stage 3: Smart HF Taming
 * - Stage 4: 4-Band Downward Expansion
 * - Stage 5: Transient Preservation
 */

class SpectralProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.fftSize = 4096;
        this.hopSize = 1024; // 75% overlap

        this.inputBuffer = new Float32Array(this.fftSize);
        this.outputBuffer = new Float32Array(this.fftSize);
        this.overlapAddBuffer = new Float32Array(this.fftSize + this.hopSize);
        this.window = new Float32Array(this.fftSize);

        // Hann Window
        for (let i = 0; i < this.fftSize; i++) {
            this.window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (this.fftSize - 1)));
        }

        // FFT Arrays
        this.real = new Float32Array(this.fftSize);
        this.imag = new Float32Array(this.fftSize);
        this.mag = new Float32Array(this.fftSize / 2 + 1);
        this.phase = new Float32Array(this.fftSize / 2 + 1);

        // Core tracking
        this.noiseFloor = new Float32Array(this.fftSize / 2 + 1).fill(0.0001);
        this.smoothedMag = new Float32Array(this.fftSize / 2 + 1).fill(0);
        this.lastTransientEnergy = 0;

        this.bufferPointer = 0;
        this.intensity = 100; // 0-100% Slider

        // Dynamic parameter listener
        this.port.onmessage = (e) => {
            if (e.data && e.data.type === 'SET_REDUCTION') {
                this.intensity = Math.max(0, Math.min(100, e.data.value));
            }
        };

        // Precompute Bit-Reversal for speed
        this.bitRev = new Uint32Array(this.fftSize);
        const shift = Math.clz32(this.fftSize) + 1;
        for (let i = 0; i < this.fftSize; i++) {
            this.bitRev[i] = this.reverseBits(i) >>> shift;
        }

        // Precompute twiddle factors for speed
        this.sinTable = new Float32Array(this.fftSize);
        this.cosTable = new Float32Array(this.fftSize);
        for (let i = 0; i < this.fftSize; i++) {
            this.sinTable[i] = Math.sin(-2 * Math.PI * i / this.fftSize);
            this.cosTable[i] = Math.cos(-2 * Math.PI * i / this.fftSize);
        }
    }

    reverseBits(x) {
        x = ((x & 0x55555555) << 1) | ((x & 0xAAAAAAAA) >>> 1);
        x = ((x & 0x33333333) << 2) | ((x & 0xCCCCCCCC) >>> 2);
        x = ((x & 0x0F0F0F0F) << 4) | ((x & 0xF0F0F0F0) >>> 4);
        x = ((x & 0x00FF00FF) << 8) | ((x & 0xFF00FF00) >>> 8);
        return (x << 16) | (x >>> 16);
    }

    // High-performance Cooley-Tukey In-Place FFT 
    // Optimized for V8 Audio rendering threads
    fft(real, imag, inverse = false) {
        const n = this.fftSize;

        // Bit-reverse
        for (let i = 0; i < n; i++) {
            const rev = this.bitRev[i];
            if (i < rev) {
                const tr = real[i], ti = imag[i];
                real[i] = real[rev]; imag[i] = imag[rev];
                real[rev] = tr; imag[rev] = ti;
            }
        }

        // Butterfly
        for (let len = 2; len <= n; len <<= 1) {
            const halfLen = len >> 1;
            const step = n / len;
            for (let i = 0; i < n; i += len) {
                for (let j = 0; j < halfLen; j++) {
                    const idx = j * step;
                    const c = this.cosTable[idx];
                    let s = this.sinTable[idx];
                    if (inverse) s = -s;

                    const p1r = real[i + j + halfLen];
                    const p1i = imag[i + j + halfLen];
                    const tr = p1r * c - p1i * s;
                    const ti = p1r * s + p1i * c;

                    real[i + j + halfLen] = real[i + j] - tr;
                    imag[i + j + halfLen] = imag[i + j] - ti;
                    real[i + j] += tr;
                    imag[i + j] += ti;
                }
            }
        }

        if (inverse) {
            for (let i = 0; i < n; i++) {
                real[i] /= n;
                imag[i] /= n;
            }
        }
    }

    process(inputs, outputs) {
        const input = inputs[0];
        const output = outputs[0];
        if (!input || !input[0] || !output || !output[0]) return true;

        const channelIn = input[0];
        const channelOut = output[0];
        const blockSize = channelIn.length;

        // 128-sample stream ingestion and STFT triggering
        for (let i = 0; i < blockSize; i++) {
            this.inputBuffer[this.fftSize - this.hopSize + this.bufferPointer] = channelIn[i];
            channelOut[i] = this.overlapAddBuffer[this.bufferPointer];
            this.bufferPointer++;

            if (this.bufferPointer >= this.hopSize) {
                this.performNuclearSTFT();

                // Shift Overlap-Add buffer
                for (let j = 0; j < this.fftSize; j++) {
                    this.overlapAddBuffer[j] = this.overlapAddBuffer[j + this.hopSize];
                }
                for (let j = this.fftSize; j < this.fftSize + this.hopSize; j++) {
                    this.overlapAddBuffer[j] = 0;
                }

                // Add new synthesis
                for (let j = 0; j < this.fftSize; j++) {
                    this.overlapAddBuffer[j] += this.outputBuffer[j];
                }

                // Shift Input buffer backward
                for (let j = 0; j < this.fftSize - this.hopSize; j++) {
                    this.inputBuffer[j] = this.inputBuffer[j + this.hopSize];
                }

                this.bufferPointer = 0;
            }
        }
        return true;
    }

    performNuclearSTFT() {
        // Analysis Window
        for (let i = 0; i < this.fftSize; i++) {
            this.real[i] = this.inputBuffer[i] * this.window[i];
            this.imag[i] = 0;
        }

        this.fft(this.real, this.imag, false);

        const numBins = this.fftSize / 2 + 1;
        const nyquist = 24000;
        const hzPerBin = nyquist / numBins;

        // Dynamic Parameter Mapping
        const reductionMaxDb = 12 + (this.intensity / 100) * 20; // 0% -> 12, 100% -> 32
        const minGainLinear = Math.pow(10, -reductionMaxDb / 20);

        const hfAttenDb = 3 + (this.intensity / 100) * 7; // 0% -> 3, 100% -> 10
        const hfMinGain = Math.pow(10, -hfAttenDb / 20);

        const expRatio = 1.3 + (this.intensity / 100) * 0.9; // 0% -> 1.3, 100% -> 2.2

        let transientEnergy = 0;

        // Pass 1: Analysis and Floor estimation
        for (let i = 0; i < numBins; i++) {
            const re = this.real[i];
            const im = this.imag[i];
            const mag = Math.sqrt(re * re + im * im);

            this.mag[i] = mag;
            this.phase[i] = Math.atan2(im, re);

            // Temporal Smoothing (bin-specific)
            this.smoothedMag[i] = 0.6 * this.smoothedMag[i] + 0.4 * mag;

            const hz = i * hzPerBin;

            // STAGE 5: Transient Preservation Detection (1.5k - 4k core region)
            if (hz > 1500 && hz < 4000) {
                transientEnergy += mag;
            }

            // STAGE 2: Adaptive Slow Tracking Noise Estimation
            // Reacts quickly to drops, recovers extremely slowly during speech
            if (this.smoothedMag[i] < this.noiseFloor[i]) {
                this.noiseFloor[i] = this.smoothedMag[i];
            } else {
                this.noiseFloor[i] += 0.00005; // Tight drift
            }
        }

        const isTransient = transientEnergy > (this.lastTransientEnergy || 0) * 2.5;
        this.lastTransientEnergy = transientEnergy * 0.3 + (this.lastTransientEnergy || 0) * 0.7;

        // Pass 2: Spectral Processing
        for (let i = 0; i < numBins; i++) {
            const hz = i * hzPerBin;
            const mag = this.mag[i];
            let gain = 1.0;

            // STAGE 2: Spectral Subtraction Core
            const snr = this.smoothedMag[i] / (this.noiseFloor[i] + 0.000001);
            if (snr < 4.0) {
                gain = Math.max(minGainLinear, Math.pow(snr / 4.0, 1.8)); // Harder curve for 32dB
            }

            // STAGE 3: Smart HF Taming (5kHz - 15kHz)
            if (hz > 5000 && hz < 15000) {
                if (!isTransient || hz > 8000) { // Protect 5-8k during heavy transients
                    const rollOff = 1.0 - ((hz - 5000) / 10000) * (1.0 - hfMinGain);
                    gain = Math.min(gain, Math.max(hfMinGain, rollOff));
                }
            }

            // STAGE 4: Multiband Downward Expansion
            if (!isTransient) { // Bypass expansion entirely if explosive consonant
                if (hz > 100 && hz < 300) {
                    if (snr < 2.0) gain *= Math.max(minGainLinear, Math.pow(snr / 2.0, expRatio - 1));
                } else if (hz >= 300 && hz < 1000) {
                    if (snr < 2.5) gain *= Math.max(minGainLinear, Math.pow(snr / 2.5, expRatio - 1));
                } else if (hz >= 1000 && hz < 4000) {
                    if (snr < 1.8) gain *= Math.max(minGainLinear, Math.pow(snr / 1.8, expRatio - 1));
                } else if (hz >= 4000 && hz < 15000) {
                    if (snr < 2.5) gain *= Math.max(minGainLinear, Math.pow(snr / 2.5, expRatio - 1));
                }
            }

            // Minimum Floor Clamp (Musical Noise Prevention)
            gain = Math.max(gain, minGainLinear * 0.5);

            // Reconstruct Polar
            this.real[i] = gain * mag * Math.cos(this.phase[i]);
            this.imag[i] = gain * mag * Math.sin(this.phase[i]);

            // Mirror conjugate
            if (i > 0 && i < numBins - 1) {
                this.real[this.fftSize - i] = this.real[i];
                this.imag[this.fftSize - i] = -this.imag[i];
            }
        }

        // Synthesis IFFT
        this.fft(this.real, this.imag, true);

        // Synthesis Windowing (COLA)
        // For Hann Windows with 75% overlap, the squared window sum is 1.5.
        // Doing analysis + synthesis windowing preserves phase boundaries perfectly without clicks.
        for (let i = 0; i < this.fftSize; i++) {
            this.outputBuffer[i] = (this.real[i] * this.window[i]) / 1.5;
        }
    }
}

registerProcessor('spectral-processor', SpectralProcessor);
