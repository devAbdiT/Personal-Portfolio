import { motion } from 'motion/react';
import { usePowerMode } from '../contexts/PowerModeContext';
import { SiReact, SiNextdotjs, SiMongodb } from 'react-icons/si';

export function WireframeGlobe() {
  const { powerSaving } = usePowerMode();

  const orbits = [
    { Icon: SiReact, color: 'text-[#61DAFB]', rZ: -20, rX: 60, duration: 8, size: 'w-10 h-10 md:w-14 md:h-14', iconSize: 'w-6 h-6 md:w-8 md:h-8' },
    { Icon: SiNextdotjs, color: 'text-slate-100', rZ: 40, rX: 70, duration: 12, size: 'w-8 h-8 md:w-12 md:h-12', iconSize: 'w-5 h-5 md:w-7 md:h-7' },
    { Icon: SiMongodb, color: 'text-[#47A248]', rZ: 80, rX: 65, duration: 16, size: 'w-12 h-12 md:w-16 md:h-16', iconSize: 'w-7 h-7 md:w-9 md:h-9' },
  ];

  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 perspective-1000 drop-shadow-[0_0_30px_rgba(var(--primary-glow),0.4)]">
      {/* Main spinning globe */}
      <motion.div
        animate={powerSaving ? { rotateY: 20, rotateX: 10 } : { rotateY: [0, 360], rotateX: [180, 180] }}
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

      {/* Orbiting Icons */}
      {orbits.map((orbit, idx) => (
        <div
          key={`orbit-${idx}`}
          className="absolute inset-0 preserve-3d"
          style={{ transform: `rotateZ(${orbit.rZ}deg) rotateX(${orbit.rX}deg)` }}
        >
          {/* Ring path visual (optional, but looks cool) */}
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          
          {/* The revolving container */}
          <motion.div
            className="absolute inset-0 preserve-3d"
            animate={powerSaving ? {} : { rotateZ: [0, 360] }}
            transition={{ duration: orbit.duration, ease: "linear", repeat: Infinity }}
          >
            {/* Positioned on the left edge of the ring */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 preserve-3d">
              {/* Counter-rotation to keep icon facing front */}
              <motion.div
                className={`bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] ${orbit.size}`}
                animate={powerSaving ? {} : { rotateZ: [0, -360] }}
                transition={{ duration: orbit.duration, ease: "linear", repeat: Infinity }}
                style={{
                  transform: `rotateX(${-orbit.rX}deg) rotateZ(${-orbit.rZ}deg)`
                }}
              >
                <orbit.Icon className={`${orbit.color} ${orbit.iconSize}`} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
