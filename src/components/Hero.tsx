import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { WireframeGlobe } from './WireframeGlobe';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

const LEARNING_ITEMS = [
  { badge: "Currently Exploring", text: "Docker & CI/CD" },
  { badge: "Currently Building", text: "Full-Stack PostgreSQL & Prisma Apps" },
  { badge: "What I'm Learning", text: "Cloud Deployment & DevOps" },
];

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [learningIndex, setLearningIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLearningIndex((prev) => (prev + 1) % LEARNING_ITEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  const globeX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const globeY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  const globeRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const globeRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content Area */}
        <div className="flex flex-col space-y-6 z-10 preserve-3d perspective-1000">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col"
          >
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center space-x-2 bg-slate-900/60 backdrop-blur-sm border border-primary-500/30 px-3 py-1.5 rounded-full w-max shadow-[0_0_12px_rgba(var(--primary-glow),0.15)]">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse shadow-[0_0_8px_rgba(var(--primary-glow),0.8)]" />
                <span className="text-xs font-mono text-primary-400 tracking-wider">SYSTEM.ONLINE</span>
              </div>

              <div className="inline-flex items-center space-x-2.5 bg-slate-900/60 backdrop-blur-sm border border-secondary-500/30 hover:border-secondary-500/60 px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(var(--secondary-glow),0.15)] transition-all">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-400 shadow-[0_0_8px_rgba(var(--secondary-glow),0.8)]" />
                </span>
                <div className="text-xs font-mono text-slate-300 flex items-center overflow-hidden h-5">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={learningIndex}
                      initial={{ opacity: 0, y: 7 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -7 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span className="text-secondary-400 font-semibold">{LEARNING_ITEMS[learningIndex].badge}:</span>
                      <span className="text-slate-200">{LEARNING_ITEMS[learningIndex].text}</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4">
              <span className="block text-slate-100">Elevating</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-500">
                Digital Realities
              </span>
            </motion.h1>
            
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md mt-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <h2 className="text-xl font-medium text-slate-200 mb-2">Abdi Tadesse</h2>
              <p className="text-primary-400 font-mono text-sm mb-4">Frontend Engineer</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Passionate Frontend Engineer crafting modern, responsive web experiences with React and Next.js. I focus on writing clean, elegant code to translate complex requirements into seamless and performant user interfaces.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-500 hover:bg-primary-400 text-slate-950 font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(var(--primary-glow),0.5)] hover:shadow-[0_0_25px_rgba(var(--primary-glow),0.8)]"
                >
                  View Work
                </motion.a>
                <motion.a 
                  href="/Abdi_Tadesse_FullStack_Resume.pdf"
                  download="Abdi_Tadesse_FullStack_Resume.pdf"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-100 font-medium rounded-lg transition-colors"
                >
                  <Download size={16} /> Resume
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right 3D Visual Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ x: globeX, y: globeY, rotateX: globeRotateX, rotateY: globeRotateY }}
          className="flex justify-center items-center pointer-events-none"
        >
          <WireframeGlobe />
        </motion.div>

      </div>
    </section>
  );
}
