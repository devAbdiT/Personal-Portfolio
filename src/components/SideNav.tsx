import { Home, FolderGit2, Cpu, FileClock, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function SideNav() {
  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'skills', icon: Cpu, label: 'Skills' },
    { id: 'experience', icon: FileClock, label: 'Experience' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 hidden sm:block">
      <ul className="flex flex-col gap-6 bg-slate-900/40 backdrop-blur-md border border-white/10 p-3 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => (
          <li key={item.id} className="relative group">
            <a
              href={`#${item.id}`}
              className="flex items-center justify-center w-10 h-10 rounded-full text-slate-400 transition-all duration-300 hover:text-primary-400 hover:bg-slate-800"
            >
              <item.icon size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(var(--primary-glow),0.8)]" />
            </a>
            {/* Tooltip */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-xs font-mono text-slate-50 rounded opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 border border-slate-700 whitespace-nowrap">
              {item.label}
            </div>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 flex flex-col items-center gap-2 text-slate-500/50">
        <div className="flex flex-col items-center gap-1 group relative">
          <div className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800/50 text-[10px] font-mono leading-none shadow-sm">
            ↑
          </div>
          <div className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800/50 text-[10px] font-mono leading-none shadow-sm">
            ↓
          </div>
          
          <div className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-xs font-mono text-slate-50 rounded opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 border border-slate-700 whitespace-nowrap">
            Navigate
          </div>
        </div>

        {/* Terminal Hint */}
        <div className="mt-2 flex flex-col items-center gap-1 group relative">
          <div className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800/50 text-[10px] font-mono leading-none shadow-sm">
            ~
          </div>
          
          <div className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 text-xs font-mono text-slate-50 rounded opacity-0 translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 border border-slate-700 whitespace-nowrap">
            Terminal
          </div>
        </div>
      </div>
    </nav>
  );
}
