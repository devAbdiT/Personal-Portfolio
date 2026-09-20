import { useState, useEffect, useRef, ReactNode, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X } from 'lucide-react';

type CommandRecord = {
  command: string;
  output: ReactNode;
};

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandRecord[]>([
    { command: '', output: 'SYSTEM INITIALIZED. TYPE "help" FOR COMMANDS.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on ~ or ` or Ctrl+K or Cmd+K
      if (
        e.key === '`' || 
        e.key === '~' || 
        ((e.ctrlKey || e.metaKey) && e.key === 'k')
      ) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isOpen]);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    const lowerCmd = cmd.toLowerCase();
    setInput('');

    if (!cmd) return;

    let output: ReactNode = '';

    switch (lowerCmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 mt-1 text-slate-300">
            <span>Available commands:</span>
            <span>  <span className="text-primary-400">help</span>       - Show this message</span>
            <span>  <span className="text-primary-400">whoami</span>     - Display user info</span>
            <span>  <span className="text-primary-400">skills</span>     - Navigate to Skills</span>
            <span>  <span className="text-primary-400">projects</span>   - Navigate to Projects</span>
            <span>  <span className="text-primary-400">experience</span> - Navigate to Experience</span>
            <span>  <span className="text-primary-400">contact</span>    - Navigate to Contact</span>
            <span>  <span className="text-primary-400">resume</span>     - View / download resume</span>
            <span>  <span className="text-primary-400">clear</span>      - Clear terminal</span>
            <span>  <span className="text-primary-400">exit</span>       - Close terminal</span>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      case 'whoami':
        output = 'Abdi Tadesse — Frontend Engineer. Loc: Addis Abeba, Ethiopia.';
        break;
      case 'resume':
      case 'cv':
        window.open('/Abdi_Tadesse_FullStack_Resume.pdf', '_blank');
        output = 'Opening Abdi_Tadesse_FullStack_Resume.pdf...';
        break;
      case 'skills':
      case 'projects':
      case 'contact':
      case 'experience':
        document.getElementById(lowerCmd)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        output = `Navigating to ${lowerCmd}...`;
        break;
      case 'sudo':
        output = "Permission denied. This incident will be reported.";
        break;
      case 'date':
        output = new Date().toString();
        break;
      default:
        if (lowerCmd.startsWith('echo ')) {
          output = cmd.substring(5);
        } else {
          output = `Command not found: ${cmd}. Type "help" for a list of commands.`;
        }
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-slate-950/40 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-slate-950/95 border border-slate-700/60 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-mono text-sm relative">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-2 text-slate-400">
                <TerminalIcon size={16} />
                <span className="text-xs tracking-wider">abdi@portfolio:~</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              className="p-4 h-[50vh] max-h-[400px] overflow-y-auto text-slate-300 flex flex-col gap-2"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((record, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  {record.command && (
                    <div className="flex gap-2">
                      <span className="text-emerald-400">➜</span>
                      <span className="text-secondary-400">~</span>
                      <span className="text-slate-200">{record.command}</span>
                    </div>
                  )}
                  <div className="text-slate-400 pl-4">{record.output}</div>
                </div>
              ))}
              
              {/* Input Line */}
              <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                <span className="text-emerald-400">➜</span>
                <span className="text-secondary-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-200 caret-primary-400"
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
