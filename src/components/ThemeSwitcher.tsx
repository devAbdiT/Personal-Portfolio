import { Palette } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../contexts/AudioContext';

type Theme = 'default' | 'crimson' | 'matrix' | 'sunset' | 'abyss' | 'synthetic';

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('default');
  const { playThemeSwitch } = useAudio();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const themes: { id: Theme; name: string; colors: string }[] = [
    { id: 'default', name: 'Electric', colors: 'from-cyan-400 to-purple-500' },
    { id: 'crimson', name: 'Crimson', colors: 'from-red-400 to-amber-500' },
    { id: 'matrix', name: 'Matrix', colors: 'from-green-400 to-lime-500' },
    { id: 'sunset', name: 'Sunset', colors: 'from-orange-400 to-pink-500' },
    { id: 'abyss', name: 'Abyss', colors: 'from-indigo-400 to-sky-500' },
    { id: 'synthetic', name: 'Synthetic', colors: 'from-pink-500 to-purple-500' }
  ];

  return (
    <div className="fixed sm:bottom-6 sm:right-6 top-4 right-4 sm:top-auto z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-16 sm:top-auto sm:bottom-16 right-0 bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-2 min-w-[140px]"
          >
            <div className="text-xs font-mono text-slate-400 px-2 pb-1 uppercase tracking-wider border-b border-slate-700">Themes</div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  playThemeSwitch();
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  theme === t.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${t.colors}`} />
                {t.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-primary-400 hover:text-primary-300 hover:bg-slate-800 transition-colors shadow-[0_0_15px_rgba(var(--primary-glow),0.5)] group ${isOpen ? 'bg-slate-800 text-primary-300' : ''}`}
      >
        <Palette size={20} className="group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
