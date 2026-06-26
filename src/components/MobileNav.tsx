import { Home, FolderGit2, Cpu, FileClock, Mail } from 'lucide-react';

export function MobileNav() {
  const navItems = [
    { id: 'hero', icon: Home, label: 'Home' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'skills', icon: Cpu, label: 'Skills' },
    { id: 'experience', icon: FileClock, label: 'Experience' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 sm:hidden">
      <ul className="flex items-center justify-around bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex flex-col items-center justify-center p-2 text-slate-400 transition-colors hover:text-primary-400 focus:text-primary-400"
            >
              <item.icon size={20} className="mb-1" />
              <span className="text-[9px] font-mono uppercase tracking-wider">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
