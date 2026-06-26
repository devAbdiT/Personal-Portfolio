import { Code2, Cpu, Database, Globe, Layout, Server, Terminal, Layers } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export function Skills() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  const coreX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const coreY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const orbitX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const orbitY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const orbitRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const orbitRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const skills = [
    { icon: Layout, color: "text-red-400 border-red-400/50 shadow-[0_0_15px_rgba(248,113,113,0.3)]", bg: "bg-red-950/40" },
    { icon: Server, color: "text-purple-400 border-purple-400/50 shadow-[0_0_15px_rgba(192,132,252,0.3)]", bg: "bg-purple-950/40" },
    { icon: Database, color: "text-emerald-400 border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]", bg: "bg-emerald-950/40" },
    { icon: Globe, color: "text-blue-400 border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.3)]", bg: "bg-blue-950/40" },
    { icon: Cpu, color: "text-orange-400 border-orange-400/50 shadow-[0_0_15px_rgba(251,146,60,0.3)]", bg: "bg-orange-950/40" },
    { icon: Terminal, color: "text-cyan-400 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]", bg: "bg-cyan-950/40" },
    { icon: Layers, color: "text-pink-400 border-pink-400/50 shadow-[0_0_15px_rgba(244,114,182,0.3)]", bg: "bg-pink-950/40" }
  ];

  return (
    <section id="skills" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-secondary-600/10 blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-primary-600/10 blur-[100px] pointer-events-none mix-blend-screen" />

      <h2 className="text-4xl md:text-5xl font-display font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500 drop-shadow-sm">
        Skill Architecture
      </h2>

      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center perspective-1000">
        
        {/* Central Element */}
        <motion.div 
          style={{ x: coreX, y: coreY }}
          className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24 bg-slate-900/80 backdrop-blur-xl border border-primary-500/50 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-glow),0.4)] rotate-45 preserve-3d hover:scale-110 transition-transform duration-500"
        >
          <Code2 size={40} strokeWidth={1.5} className="text-primary-400 -rotate-45 drop-shadow-[0_0_8px_rgba(var(--primary-glow),0.8)]" />
        </motion.div>

        {/* Orbit Rings */}
        <motion.div 
          style={{ x: orbitX, y: orbitY, rotateX: orbitRotateX, rotateY: orbitRotateY }}
          className="absolute inset-0 preserve-3d"
        >
          <div className="absolute inset-0 border-[1px] border-dashed border-slate-700/60 rounded-full" />
          <div className="absolute inset-8 sm:inset-12 border-[1px] border-slate-800/80 rounded-full" />

          {/* Spinning Container */}
          <div className="absolute inset-0 rounded-full animate-spin-slow preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
            {skills.map((skill, i) => {
              const offset = (360 / skills.length) * i;
              return (
                <div 
                  key={`skill-${i}`} 
                  className="absolute inset-0 preserve-3d" 
                  style={{ transform: `rotate(${offset}deg)` }}
                >
                  <div 
                    className={`absolute left-1/2 top-0 w-12 h-12 -ml-6 -mt-6 sm:w-14 sm:h-14 sm:-ml-7 sm:-mt-7 ${skill.bg} border backdrop-blur-md rounded-full flex items-center justify-center animate-spin-reverse ${skill.color}`}
                    style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
                  >
                    <skill.icon size={22} strokeWidth={1.5} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      <div className="mt-16 max-w-2xl text-center px-4 relative z-10 w-full flex flex-wrap justify-center gap-3">
        {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind', 'MySQL', 'MongoDB', 'PostgreSQL', 'Java', 'C++', 'GitHub', 'VS Code'].map(skill => (
          <span key={skill} className="px-4 py-2 font-mono text-sm border border-primary-500/30 bg-slate-900/50 text-slate-300 rounded-full shadow-[0_0_10px_rgba(var(--primary-glow),0.1)] hover:border-primary-400 hover:text-primary-300 hover:shadow-[0_0_15px_rgba(var(--primary-glow),0.4)] transition-all cursor-default">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-12 max-w-2xl text-center">
        <p className="text-slate-400 text-sm font-mono leading-loose">
          <span className="text-primary-400">{'/*'}</span> Structuring robust, scalable user interfaces powered by 
          modern web technologies and modular databases. <span className="text-primary-400">{'*/'}</span>
        </p>
      </div>

    </section>
  );
}
