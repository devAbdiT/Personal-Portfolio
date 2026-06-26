import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      type: 'work',
      title: "Frontend Engineer",
      organization: "Personal Projects & Freelance",
      date: "Present",
      description: "Developing robust data-driven interfaces, responsive dashboards, and modern end-to-end web applications."
    },
    {
      type: 'edu',
      title: "ALX ProDev Frontend Certificate",
      organization: "ALX Africa",
      date: "Completed",
      description: "Successfully completed rigorous professional training in Frontend Development, specializing in React, Next.js, and modern architectural practices."
    },
    {
      type: 'edu',
      title: "Undergraduate Student",
      organization: "University",
      date: "Present",
      description: "Pursuing higher education while actively translating academic theory into real-world software engineering practice."
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-24 px-6 relative">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500 mb-20 text-center sm:text-left">
          Experience & Education
        </h2>

        {/* 3D Depth-aware timeline container */}
        <div className="relative perspective-1000">
          
          {/* Vertical Glowing Line */}
          <div className="absolute left-[23px] sm:left-1/2 top-0 bottom-0 w-[2px] sm:-translate-x-1/2 bg-gradient-to-b from-primary-500/0 via-primary-500/50 to-secondary-500/0 shadow-[0_0_15px_rgba(var(--primary-glow),0.5)]" />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col sm:flex-row items-center gap-8 group ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              >
                
                {/* Node Dot */}
                <div className="absolute left-[15px] sm:left-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-primary-400 sm:-translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-150 group-hover:bg-primary-400 group-hover:shadow-[0_0_20px_rgba(var(--primary-glow),0.8)]" />

                {/* Content Panel */}
                <div className="w-full sm:w-1/2 pl-14 sm:pl-0">
                  <div className={`p-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-primary-500/30 ${idx % 2 === 0 ? 'sm:mr-12 text-left' : 'sm:ml-12 sm:text-right text-left'}`}>
                    
                    <div className={`flex items-center gap-3 mb-2 text-primary-400 ${idx % 2 !== 0 ? 'sm:justify-end' : ''}`}>
                      {exp.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                      <span className="font-mono text-xs tracking-wider font-semibold uppercase">{exp.date}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-slate-100 mb-1">{exp.title}</h3>
                    <h4 className="text-secondary-400 font-medium text-sm mb-4">{exp.organization}</h4>
                    
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16 relative z-10">
            <a 
              href="https://www.linkedin.com/in/abdi-tadesse-914a33372/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-primary-500/50 text-primary-400 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-primary-950/30 hover:shadow-[0_0_20px_rgba(var(--primary-glow),0.4)] transition-all group"
            >
              View Full History 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
