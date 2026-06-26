import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="min-h-screen py-24 px-6 relative flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center text-center perspective-1000">

        <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-secondary-500 mb-4">
          Establish Connection
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mb-12">
          Looking to collaborate on spatial experiences, modern web infrastructures, or boundary-pushing digital constructs?
        </p>

        {/* Contact Info Card */}
        <div className="w-full bg-slate-900/60 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6">

          <a
            href="mailto:abditadesse89@gmail.com"
            className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-primary-500/50 transition-colors duration-300"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-800/80 border border-primary-500/30 flex items-center justify-center text-primary-400 group-hover:shadow-[0_0_15px_rgba(var(--primary-glow),0.4)] transition-shadow">
              <Mail size={20} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-[11px] uppercase font-mono tracking-widest text-slate-500">Email</p>
              <p className="text-slate-200 group-hover:text-primary-300 transition-colors">abditadesse89@gmail.com</p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-800/80 border border-secondary-500/30 flex items-center justify-center text-secondary-400">
              <MapPin size={20} strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-[11px] uppercase font-mono tracking-widest text-slate-500">Location</p>
              <p className="text-slate-200">Addis Abeba, Ethiopia</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 pt-2">
            <a
              href="https://github.com/devAbdiT/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300 hover:text-primary-300 hover:border-primary-500/50 transition-colors duration-300 text-sm font-medium"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdi-tadesse-914a33372/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300 hover:text-secondary-300 hover:border-secondary-500/50 transition-colors duration-300 text-sm font-medium"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
