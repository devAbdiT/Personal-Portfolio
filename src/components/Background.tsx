import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { useEffect } from 'react';
import { usePowerMode } from '../contexts/PowerModeContext';

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

  // Grid parallax
  const gridRotateX = useTransform(smoothY, [-0.5, 0.5], [70, 80]);
  const gridTranslateX = useTransform(smoothX, [-0.5, 0.5], ['-5%', '5%']);
  
  // Lights parallax
  const light1X = useTransform(smoothX, [-0.5, 0.5], ['-30%', '10%']);
  const light1Y = useTransform(smoothY, [-0.5, 0.5], ['-30%', '10%']);
  
  const light2X = useTransform(smoothX, [-0.5, 0.5], ['10%', '-30%']);
  const light2Y = useTransform(smoothY, [-0.5, 0.5], ['10%', '-30%']);

  const overlayGridX = useTransform(smoothX, [-0.5, 0.5], ['-20px', '20px']);
  const overlayGridY = useTransform(smoothY, [-0.5, 0.5], ['-20px', '20px']);

  const backgroundGradient = useMotionTemplate`radial-gradient(800px circle at ${smoothPixelX}px ${smoothPixelY}px, rgba(var(--primary-glow), 0.15), transparent 80%)`;

  const particleX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%']);
  const particleY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%']);

  if (powerSaving) {
    return (
      <div className="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden">
        {/* Static Grid Floor */}
        <div 
          className="absolute inset-[-50%] opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--secondary-glow), 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--primary-glow), 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'rotateX(75deg) translateZ(-200px) translateY(-20%) scale(2.5)',
            transformOrigin: 'top center'
          }}
        />
        {/* Simple Ambient Lights */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-950/20 to-secondary-950/20" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden perspective-1000">
      {/* Dynamic Grid Floor */}
      <motion.div 
        className="absolute inset-[-50%] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(rgba(var(--secondary-glow), 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary-glow), 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          rotateX: gridRotateX,
          x: gridTranslateX,
          z: -200,
          y: '-20%',
          scale: 2.5,
          transformOrigin: 'top center'
        }}
      />
      
      {/* Ambient Lights */}
      <motion.div 
        style={{ x: light1X, y: light1Y }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        style={{ x: light2X, y: light2Y }}
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-secondary-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />
      
      {/* Front Overlay Grid */}
      <motion.div
        className="absolute inset-[-10%] opacity-[0.04] pointer-events-none transition-colors duration-1000 mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          x: overlayGridX,
          y: overlayGridY,
        }}
      />
      
      {/* Particle Streams */}
      <motion.div
        style={{ 
          x: particleX, 
          y: particleY 
        }}
        className="absolute inset-0 pointer-events-none preserve-3d"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 120 - 10 + '%',
              left: Math.random() * 120 - 10 + '%',
              backgroundColor: i % 2 === 0 ? 'rgba(var(--primary-glow), 0.8)' : 'rgba(var(--secondary-glow), 0.8)',
              animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Interactive Mouse Light */}
      <motion.div
        className="fixed inset-0 pointer-events-none mix-blend-screen opacity-70"
        style={{
          background: backgroundGradient
        }}
      />
    </div>
  );
}
