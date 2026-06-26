import { Code2, Database, Layout, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';

export function Skills() {
  const skillGroups = [
    {
      title: "Frontend Engineering",
      icon: Layout,
      color: "text-primary-400",
      glow: "rgba(var(--primary-glow), 0.5)",
      skills: ['React', 'Next.js', 'JavaScript', 'Tailwind', 'HTML', 'CSS']
    },
    {
      title: "Databases",
      icon: Database,
      color: "text-secondary-400",
      glow: "rgba(var(--secondary-glow), 0.5)",
      skills: ['PostgreSQL', 'MongoDB', 'MySQL']
    },
    {
      title: "Languages",
      icon: Code2,
      color: "text-emerald-400",
      glow: "rgba(52, 211, 153, 0.5)",
      skills: ['Java', 'C++', 'JavaScript']
    },
    {
      title: "Development Tools",
      icon: Terminal,
      color: "text-purple-400",
      glow: "rgba(192, 132, 252, 0.5)",
      skills: ['GitHub', 'VS Code']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="min-h-screen py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-100 mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500">Arsenal</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest pl-1 border-l-2 border-primary-500 inline-block">
            Technologies & Tools
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000"
        >
          {skillGroups.map((group, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <TiltCard className="h-full">
                <div className="h-full p-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col preserve-3d hover:border-primary-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-6" style={{ transform: "translateZ(30px)" }}>
                    <div 
                      className={`p-2 rounded-lg bg-slate-950/50 border border-white/5`}
                      style={{ boxShadow: `0 0 15px ${group.glow}` }}
                    >
                      <group.icon size={24} className={group.color} />
                    </div>
                    <h3 className="font-display font-bold text-slate-200">{group.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(20px)" }}>
                    {group.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-950/50 border border-white/10 rounded-md hover:text-primary-300 hover:border-primary-500/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm font-mono leading-loose">
            <span className="text-primary-400">{'/*'}</span> Structuring robust, scalable user interfaces powered by 
            modern web technologies and modular databases. <span className="text-primary-400">{'*/'}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
