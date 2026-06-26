import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden sm:block perspective-1000"
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotateX: isHovering ? 180 : 0,
          rotateZ: isHovering ? 90 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-full h-full rounded-full border-2 ${
          isHovering 
            ? 'border-primary-400 bg-primary-400/10 shadow-[0_0_20px_rgba(var(--primary-glow),0.8)]' 
            : 'border-primary-500/50 bg-transparent'
        } flex items-center justify-center preserve-3d`}
      >
        <motion.div 
          animate={{ scale: isHovering ? 0 : 1 }}
          className="w-1.5 h-1.5 bg-primary-300 rounded-full shadow-[0_0_8px_rgba(var(--primary-glow),1)]" 
        />
      </motion.div>
    </motion.div>
  );
}
