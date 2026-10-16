import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { useEffect } from 'react';
import { usePowerMode } from '../contexts/PowerModeContext';
import { CyberBackground3D } from './CyberBackground3D';

export function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mousePixelX = useMotionValue(-1000);
  const mousePixelY = useMotionValue(-1000);
  const { powerSaving } = usePowerMode();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
      mousePixelX.set(e.clientX);
      mousePixelY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, mousePixelX, mousePixelY]);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });
  const smoothPixelX = useSpring(mousePixelX, { damping: 40, stiffness: 150 });
  const smoothPixelY = useSpring(mousePixelY, { damping: 40, stiffness: 150 });

  // Lights parallax
  const light1X = useTransform(smoothX, [-0.5, 0.5], ['-30%', '10%']);
  const light1Y = useTransform(smoothY, [-0.5, 0.5], ['-30%', '10%']);
  
  const light2X = useTransform(smoothX, [-0.5, 0.5], ['10%', '-30%']);
  const light2Y = useTransform(smoothY, [-0.5, 0.5], ['10%', '-30%']);

  const overlayGridX = useTransform(smoothX, [-0.5, 0.5], ['-20px', '20px']);
  const overlayGridY = useTransform(smoothY, [-0.5, 0.5], ['-20px', '20px']);

  const backgroundGradient = useMotionTemplate`radial-gradient(800px circle at ${smoothPixelX}px ${smoothPixelY}px, rgba(var(--primary-glow), 0.15), transparent 80%)`;

  if (powerSaving) {
    return (
      <div className="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-950/20 to-secondary-950/20" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden perspective-1000">
      {/* 3D Undulating Cyber Wave Terrain & Floating Polyhedra Mesh */}
      <CyberBackground3D />

      {/* Ambient Radial Lights */}
      <motion.div 
        style={{ x: light1X, y: light1Y }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        style={{ x: light2X, y: light2Y }}
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-secondary-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />
      
      {/* Front Subtle Overlay Grid */}
      <motion.div
        className="absolute inset-[-10%] opacity-[0.03] pointer-events-none transition-colors duration-1000 mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          x: overlayGridX,
          y: overlayGridY,
        }}
      />

      {/* Interactive Mouse Light Spotlight */}
      <motion.div
        className="fixed inset-0 pointer-events-none mix-blend-screen opacity-70"
        style={{
          background: backgroundGradient
        }}
      />
    </div>
  );
}
