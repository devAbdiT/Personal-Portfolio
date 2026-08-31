import { ExternalLink, Github } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { motion } from 'motion/react';

export function Projects() {
  const projects = [
    {
      id: 1,
      title: "Appointment Scheduling System",
      description: "Full-stack web application digitizing hospital appointment booking with real-time doctor availability, role-based access, and queue management.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      repo: "https://github.com/devAbdiT/MediCare",
      demo: "https://medi-care-tan-seven.vercel.app/",
      image: "bg-gradient-to-b from-slate-800 via-slate-900 to-primary-950"
    },
    {
      id: 2,
      title: "DevOverflow (StackOverflow Clone)",
      description: "A full-stack Q&A platform for developers to ask questions, share answers, and engage in technical discussions with upvoting and bookmarking.",
      tags: ["Next.js", "MongoDB", "NextAuth", "Tailwind"],
      repo: "https://github.com/devAbdiT/DevFlow",
      demo: "",
      image: "bg-gradient-to-tl from-slate-900 via-slate-800 to-primary-900"
    },
    {
      id: 3,
      title: "Lumins Shop (E-commerce)",
      description: "A modern e-commerce platform featuring product browsing, shopping cart, and wishlist functionality with Redux Toolkit for state management.",
      tags: ["React", "Redux", "Tailwind", "TypeScript"],
      repo: "https://github.com/devAbdiT/Lumina-Shop",
      demo: "https://lumina-shop-wine.vercel.app/",
      image: "bg-gradient-to-tr from-secondary-900 via-slate-800 to-slate-900"
    },
    {
      id: 4,
      title: "Modern Management Dashboard",
      description: "A high-performance dashboard featuring Server-Side Rendering (SSR) for optimized SEO and data fetching. Fully responsive UI.",
      tags: ["Next.js", "App Router", "Tailwind CSS"],
      repo: "https://github.com/devAbdiT/DashBoard",
      demo: "https://dash-board-rose.vercel.app/",
      image: "bg-gradient-to-br from-primary-900 via-slate-800 to-slate-950"
    },
    {
      id: 5,
      title: "Global Weather Application",
      description: "Real-time weather tracking tool integrating with external APIs to provide live data for cities worldwide with dynamic styling.",
      tags: ["JavaScript", "Fetch API", "CSS"],
      repo: "https://github.com/devAbdiT",
      demo: "",
      image: "bg-gradient-to-br from-slate-900 via-slate-800 to-secondary-950"
    },
    {
      id: 6,
      title: "Full-Stack Job Portal",
      description: "Platform for job listings and applications, focusing on database schema design, CRUD operations, and search functionality.",
      tags: ["PHP", "MySQL", "JavaScript"],
      repo: "https://github.com/devAbdiT",
      demo: "",
      image: "bg-gradient-to-r from-primary-950 via-secondary-900 to-slate-900"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-6 relative">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500 mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest pl-1 border-l-2 border-primary-500">
              Selected Works
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {projects.map((project) => (
              <motion.div variants={itemVariants} key={project.id} className="h-full">
                <TiltCard className="h-full">
                  {/* Card Container */}
                  <div className="h-full bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex flex-col group relative preserve-3d hover:border-primary-500/50 transition-colors duration-500">
                    
                    {/* 3D Extruded Top Image simulation */}
                    <div 
                      className={`h-48 w-full ${project.image} relative isolate`} 
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                      
                      {/* Floating abstract code/nodes */}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse shadow-[0_0_10px_rgba(var(--primary-glow),0.8)]" />
                        <div className="w-3 h-3 rounded-full bg-secondary-500 animate-pulse delay-150 shadow-[0_0_10px_rgba(var(--secondary-glow),0.8)]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col preserve-3d relative">
                      <h3 
                        className="text-xl font-bold font-display text-slate-100 mb-3"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        {project.title}
                      </h3>
                      
                      <p 
                        className="text-slate-400 text-sm mb-6 flex-grow"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div 
                        className="flex flex-wrap gap-2 mb-6"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-slate-800 text-primary-300 rounded border border-primary-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div 
                        className="flex justify-between items-center gap-4 pt-4 border-t border-slate-700/50"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-1 text-sm font-medium">
                          <Github size={16} /> Repository
                        </a>
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary-400 transition-colors flex items-center gap-1 text-sm font-medium">
                            <ExternalLink size={16} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
