import { Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="min-h-screen py-24 px-6 relative flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center perspective-1000">
        
        {/* Left Side: Copy */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-secondary-500 mb-2">
            Establish Connection
          </h2>
          <p className="text-slate-400 text-lg">
            Looking to collaborate on spatial experiences, modern web infrastructures, or boundary-pushing digital constructs?
          </p>
          <div className="font-mono text-sm text-primary-400/80 pt-4 flex flex-col gap-2">
            <p>PING: abditadesse89@gmail.com</p>
            <p>LOC: Addis Abeba, Ethiopia</p>
            <div className="flex gap-4 mt-2">
              <a href="https://github.com/devAbdiT/" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary-400 transition-colors uppercase tracking-widest text-xs">
                [ GitHub ]
              </a>
              <a href="https://www.linkedin.com/in/abdi-tadesse-914a33372/" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary-400 transition-colors uppercase tracking-widest text-xs">
                [ LinkedIn ]
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Futuristic Form */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] preserve-3d rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700">
          <form className="flex flex-col space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-slate-500 ml-1">Identity</label>
              <input 
                type="text" 
                placeholder="Name or Alias" 
                className="w-full bg-slate-950 border border-slate-800 border-b-4 border-r-4 rounded-xl px-4 py-3 outline-none text-slate-200 placeholder:text-slate-600 transition-all duration-300 focus:border-primary-500 focus:border-b-[1px] focus:border-r-[1px] focus:translate-y-[3px] focus:translate-x-[3px] focus:bg-slate-900 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-slate-500 ml-1">Comms Link</label>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-slate-950 border border-slate-800 border-b-4 border-r-4 rounded-xl px-4 py-3 outline-none text-slate-200 placeholder:text-slate-600 transition-all duration-300 focus:border-secondary-500 focus:border-b-[1px] focus:border-r-[1px] focus:translate-y-[3px] focus:translate-x-[3px] focus:bg-slate-900 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-slate-500 ml-1">Payload</label>
              <textarea 
                rows={4}
                placeholder="Your message..." 
                className="w-full bg-slate-950 border border-slate-800 border-b-4 border-r-4 rounded-xl px-4 py-3 outline-none text-slate-200 placeholder:text-slate-600 transition-all duration-300 focus:border-primary-500 focus:border-b-[1px] focus:border-r-[1px] focus:translate-y-[3px] focus:translate-x-[3px] focus:bg-slate-900 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] resize-none"
              ></textarea>
            </div>

            <button 
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(var(--primary-glow),0.3)] hover:shadow-[0_0_30px_rgba(var(--secondary-glow),0.6)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-1 active:shadow-none"
            >
              <Send size={18} />
              TRANSMIT SECURE
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
