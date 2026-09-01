import { useEffect, useState } from 'react';
import { Activity, Cpu, Palette } from 'lucide-react';

export function Footer() {
  const [latency, setLatency] = useState(12);
  const [load, setLoad] = useState('Low');

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight latency fluctuations between 8ms and 24ms
      const newLatency = Math.floor(Math.random() * (24 - 8 + 1) + 8);
      setLatency(newLatency);

      // Occasional load change
      if (Math.random() > 0.8) {
        setLoad(Math.random() > 0.5 ? 'Optimal' : 'Low');
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-slate-800/50 bg-slate-950/30 backdrop-blur-sm py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 relative z-10">
      <div className="mb-4 sm:mb-0">
        <span className="text-slate-600">&copy; {new Date().getFullYear()} ABDI TADESSE</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 group">
          <Activity size={14} className="text-emerald-500/70 group-hover:text-emerald-400 transition-colors" />
          <span className="group-hover:text-slate-300 transition-colors">LATENCY: {latency}ms</span>
        </div>
        
        <div className="flex items-center gap-2 group">
          <Cpu size={14} className="text-primary-500/70 group-hover:text-primary-400 transition-colors" />
          <span className="group-hover:text-slate-300 transition-colors">SYS LOAD: {load.toUpperCase()}</span>
        </div>
        
        <div className="flex items-center gap-2 group">
          <Palette size={14} className="text-secondary-500/70 group-hover:text-secondary-400 transition-colors" />
          <span className="group-hover:text-slate-300 transition-colors">THEME: ACTIVE</span>
        </div>
      </div>
    </footer>
  );
}
