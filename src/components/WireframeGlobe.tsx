import { motion } from 'motion/react';
import { usePowerMode } from '../contexts/PowerModeContext';
import { SiReact, SiNextdotjs, SiMongodb, SiTypescript, SiPostgresql, SiTailwindcss, SiGithub, SiPrisma, SiMysql } from 'react-icons/si';

export function WireframeGlobe() {
  const { powerSaving } = usePowerMode();

  // 'glow' alternates between 'primary' and 'secondary' so badges
  // pick up the active theme's CSS variable colors automatically.
  const orbits = [
    { Icon: SiReact,       color: 'text-[#61DAFB]', rZ: -20,  rX: 60, duration: 8,  size: 'w-9 h-9 md:w-12 md:h-12',   iconSize: 'w-5 h-5 md:w-7 md:h-7', glow: 'primary'   },
    { Icon: SiNextdotjs,   color: 'text-slate-100', rZ: 40,   rX: 70, duration: 12, size: 'w-8 h-8 md:w-11 md:h-11',   iconSize: 'w-4 h-4 md:w-6 md:h-6', glow: 'secondary' },
    { Icon: SiMongodb,     color: 'text-[#47A248]', rZ: 80,   rX: 65, duration: 16, size: 'w-10 h-10 md:w-13 md:h-13', iconSize: 'w-6 h-6 md:w-8 md:h-8', glow: 'primary'   },
    { Icon: SiTypescript,  color: 'text-[#3178C6]', rZ: -60,  rX: 50, duration: 10, size: 'w-9 h-9 md:w-12 md:h-12',   iconSize: 'w-5 h-5 md:w-7 md:h-7', glow: 'secondary' },
    { Icon: SiPostgresql,  color: 'text-[#336791]', rZ: 130,  rX: 75, duration: 14, size: 'w-8 h-8 md:w-11 md:h-11',   iconSize: 'w-4 h-4 md:w-6 md:h-6', glow: 'primary'   },
    { Icon: SiTailwindcss, color: 'text-[#06B6D4]', rZ: -100, rX: 55, duration: 18, size: 'w-10 h-10 md:w-13 md:h-13', iconSize: 'w-6 h-6 md:w-7 md:h-7', glow: 'secondary' },
    { Icon: SiGithub,      color: 'text-slate-300', rZ: 160,  rX: 68, duration: 20, size: 'w-9 h-9 md:w-12 md:h-12',   iconSize: 'w-5 h-5 md:w-7 md:h-7', glow: 'primary'   },
    { Icon: SiPrisma,      color: 'text-[#5A67D8]', rZ: -140, rX: 80, duration: 11, size: 'w-8 h-8 md:w-11 md:h-11',   iconSize: 'w-4 h-4 md:w-6 md:h-6', glow: 'secondary' },
    { Icon: SiMysql,       color: 'text-[#4479A1]', rZ: 110,  rX: 45, duration: 15, size: 'w-10 h-10 md:w-13 md:h-13', iconSize: 'w-6 h-6 md:w-8 md:h-8', glow: 'primary'   },
  ];

  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 perspective-1000 drop-shadow-[0_0_30px_rgba(var(--primary-glow),0.4)]">
      {/* Main spinning globe */}
      <motion.div
        animate={powerSaving ? { rotateY: 20, rotateX: 10 } : { rotateY: [0, 360], rotateX: [180, 180] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="w-full h-full relative preserve-3d"
      >
        {/* Latitude rings — primary theme color */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`lat-${i}`}
            className="absolute inset-0 border-[1.5px] border-primary-500/40 rounded-full"
            style={{ transform: `rotateX(${i * 45}deg)` }}
          />
        ))}
        {/* Longitude rings — secondary theme color */}
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
      {orbits.map((orbit, idx) => {
        const isPrimary = orbit.glow === 'primary';
        // These reference the active theme's CSS variables, so they shift
        // automatically when the user switches themes.
        const borderVar = isPrimary ? 'var(--primary-500)' : 'var(--secondary-500)';
        const glowVar   = isPrimary ? 'var(--primary-glow)' : 'var(--secondary-glow)';

        return (
          <div
            key={`orbit-${idx}`}
            className="absolute inset-0 preserve-3d"
            style={{ transform: `rotateZ(${orbit.rZ}deg) rotateX(${orbit.rX}deg)` }}
          >
            {/* Orbit ring — tinted by theme */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${borderVar}33` }}
            />

            {/* Revolving wrapper */}
            <motion.div
              className="absolute inset-0 preserve-3d"
              animate={powerSaving ? {} : { rotateZ: [0, 360] }}
              transition={{ duration: orbit.duration, ease: "linear", repeat: Infinity }}
            >
              {/* Anchor to left edge of orbit ring */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 preserve-3d">
                {/* Counter-rotate so icon always faces the viewer */}
                <motion.div
                  className={`backdrop-blur-sm rounded-full flex items-center justify-center ${orbit.size}`}
                  animate={powerSaving ? {} : { rotateZ: [0, -360] }}
                  transition={{ duration: orbit.duration, ease: "linear", repeat: Infinity }}
                  style={{
                    transform: `rotateX(${-orbit.rX}deg) rotateZ(${-orbit.rZ}deg)`,
                    backgroundColor: 'rgba(2, 6, 23, 0.85)',
                    border: `1.5px solid ${borderVar}66`,
                    boxShadow: `0 0 14px rgba(${glowVar}, 0.4), inset 0 0 8px rgba(${glowVar}, 0.1)`,
                  }}
                >
                  <orbit.Icon className={`${orbit.color} ${orbit.iconSize}`} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
