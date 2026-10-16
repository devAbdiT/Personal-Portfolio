import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { motion } from 'motion/react';

export function AudioToggle() {
  const { soundEnabled, toggleSound } = useAudio();

  return (
    <div className="fixed sm:bottom-22 sm:right-6 top-4 right-20 sm:top-auto z-50">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleSound}
        title={soundEnabled ? 'Cyber Sound FX: ON (Click to mute)' : 'Cyber Sound FX: MUTED (Click to enable)'}
        aria-label={soundEnabled ? 'Mute audio engine' : 'Enable audio engine'}
        className={`w-12 h-12 rounded-full bg-slate-900 border flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group relative ${
          soundEnabled
            ? 'border-secondary-500/50 text-secondary-400 shadow-[0_0_15px_rgba(var(--secondary-glow),0.35)]'
            : 'border-white/10 text-slate-500 hover:text-slate-300'
        }`}
      >
        {soundEnabled ? (
          <div className="flex items-center justify-center gap-1">
            <Volume2 size={18} />
            {/* Animated Equalizer Waveform Bars */}
            <div className="flex items-end gap-[1.5px] h-3">
              <span className="w-[2px] h-2 bg-secondary-400 rounded-full animate-pulse" />
              <span className="w-[2px] h-3 bg-secondary-400 rounded-full animate-pulse delay-100" />
              <span className="w-[2px] h-1.5 bg-secondary-400 rounded-full animate-pulse delay-200" />
            </div>
          </div>
        ) : (
          <VolumeX size={18} />
        )}

        {/* Pulse beacon when enabled */}
        {soundEnabled && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-500" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
