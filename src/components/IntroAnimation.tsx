import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if intro has already been shown in this session
    const hasSeen = sessionStorage.getItem('portfolio_intro_seen');
    if (!hasSeen) {
      setIsVisible(true);
    }

    // Support replay via custom event
    const handleReplay = () => {
      setIsVisible(true);
    };
    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('portfolio_intro_seen', 'true');
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) return;

    // Automatic transition after 1.6s
    const timer = setTimeout(() => {
      handleComplete();
    }, 1600);

    // Allow user to skip by pressing Escape or Space
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        handleComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden cursor-pointer select-none"
          onClick={handleComplete}
        >
          {/* Subtle Ambient Radial Glow */}
          <div 
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse"
            style={{
              background: `radial-gradient(circle, rgba(var(--primary-glow), 0.6) 0%, rgba(var(--secondary-glow), 0.3) 50%, transparent 70%)`
            }}
          />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b14_1px,transparent_1px),linear-gradient(to_bottom,#1e293b14_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Center Monogram Stage */}
          <div className="relative flex flex-col items-center z-10">
            {/* Brackets & Monogram */}
            <div className="relative flex items-center justify-center">
              {/* Left Tech Bracket */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60, scale: 1.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-mono text-primary-500/50 mr-2 md:mr-4 select-none font-light"
              >
                &lt;
              </motion.div>

              {/* AT Initials Expanding Out */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ 
                  opacity: [0, 1, 1],
                  scale: [0.5, 1.05, 1],
                  filter: ["blur(10px)", "blur(0px)", "blur(0px)"],
                }}
                exit={{ 
                  opacity: 0,
                  scale: 2.2,
                  filter: "blur(12px)",
                  transition: { duration: 0.45, ease: "easeInOut" }
                }}
                transition={{ duration: 0.8, times: [0, 0.7, 1], ease: "easeOut" }}
                className="relative"
              >
                <span className="text-7xl md:text-9xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary-300 via-primary-500 to-secondary-500 drop-shadow-[0_0_35px_rgba(var(--primary-glow),0.6)]">
                  AT
                </span>
                
                {/* Glowing ring aura */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.8, 0.4], scale: [0.8, 1.2, 1.1] }}
                  exit={{ opacity: 0, scale: 1.8 }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  className="absolute inset-0 -m-4 rounded-full border border-primary-500/30 blur-xs pointer-events-none"
                />
              </motion.div>

              {/* Right Tech Bracket */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60, scale: 1.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-mono text-primary-500/50 ml-2 md:ml-4 select-none font-light"
              >
                /&gt;
              </motion.div>
            </div>

            {/* Subtitle / System Initializing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping" />
                <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-slate-300 uppercase font-semibold">
                  Abdi Tadesse
                </span>
              </div>
              <span className="font-mono text-[10px] md:text-xs text-primary-400/80 tracking-widest uppercase">
                Elevating Digital Realities
              </span>

              {/* Fast Futuristic Progress Bar */}
              <div className="w-40 md:w-56 h-[2px] bg-slate-800 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-500 shadow-[0_0_8px_rgba(var(--primary-glow),0.8)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Skip Hint at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="absolute bottom-8 text-slate-500 hover:text-slate-300 text-xs font-mono tracking-wider transition-colors"
          >
            Click or press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">ESC</kbd> to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
