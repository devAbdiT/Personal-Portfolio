import { motion } from 'motion/react';
import { usePowerMode } from '../contexts/PowerModeContext';

export function WireframeGlobe() {
  const { powerSaving } = usePowerMode();

  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 perspective-1000 drop-shadow-[0_0_30px_rgba(var(--primary-glow),0.4)]">
      <motion.div
        animate={powerSaving ? { rotateY: 20, rotateX: 10 } : { rotateY: 360, rotateX: 180 }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="w-full h-full relative preserve-3d"
      >
        {/* Latitude rings */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`lat-${i}`}
            className="absolute inset-0 border-[1.5px] border-primary-500/40 rounded-full"
            style={{ transform: `rotateX(${i * 45}deg)` }}
          />
        ))}
        {/* Longitude rings */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`lon-${i}`}
            className="absolute inset-x-0 top-1/4 bottom-1/4 border-[1.5px] border-secondary-500/40 rounded-full"
            style={{ transform: `rotateY(${i * 45}deg)` }}
          />
        ))}
        {/* Central Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-primary-400 rounded-full blur-xl opacity-50" />
      </motion.div>
    </div>
  );
}
