import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  Shield, 
  Settings, 
  Video, 
  FlaskConical, 
  Trophy,
  ArrowRight,
  MousePointer2
} from 'lucide-react';

const divisions = [
  {
    id: 'eva-one',
    name: 'EvaOne',
    tagline: 'Executive Operating System',
    description: 'AI-powered OS that centralizes strategic planning, project execution, and AI orchestration.',
    icon: Zap,
    color: '#00F2FF', // Electric Cyan
    link: '/eva-one'
  },
  {
    id: 'boardroom-ai',
    name: 'Boardroom AI',
    tagline: 'Strategic Intelligence',
    description: 'Virtual executive leadership delivering strategic guidance and decision support.',
    icon: Brain,
    color: '#BC00FF', // Creative Violet (approx)
    link: '/boardroom-ai'
  },
  {
    id: 'localmobile-ai',
    name: 'LocalMobile AI',
    tagline: 'Offline Infrastructure',
    description: 'Secure, resilient AI capabilities designed to operate without internet connectivity.',
    icon: Shield,
    color: '#00FF9D', // Custom Green/Cyan
    link: '/localmobile-ai'
  },
  {
    id: 'automation-labs',
    name: 'Automation Labs',
    tagline: 'Intelligent Operations',
    description: 'Systems that eliminate repetitive work and optimize business process efficiency.',
    icon: Settings,
    color: '#FF00E5', // Plasma Pink
    link: '/automation-labs'
  },
  {
    id: 'creative-media',
    name: 'Mentally Creative Media',
    tagline: 'Creative Production',
    description: 'High-end content production and branding at the intersection of AI and human creativity.',
    icon: Video,
    color: '#FFB800', // Multi-color (Gold-ish base)
    link: '/media'
  },
  {
    id: 'tech-lab',
    name: 'Creative Technology Lab',
    tagline: 'Research & Development',
    description: 'Innovation engine exploring emerging tech and developing future products.',
    icon: FlaskConical,
    color: '#FFFFFF', // White/Silver
    link: '/lab'
  },
  {
    id: 'riftline',
    name: 'Riftline Racing',
    tagline: 'Interactive Entertainment',
    description: 'Original racing franchise combining simulation mechanics and competitive gameplay.',
    icon: Trophy,
    color: '#FF3D00', // Red/Purple (Red-ish base)
    link: '/riftline'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-brand-void text-brand-white font-body">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-brand-void/80 backdrop-blur-md border-b border-brand-white/5">
        <div className="font-display text-xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-cyan to-brand-violet rounded-lg shadow-lg shadow-brand-cyan/20"></div>
          <span>MCS</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase text-brand-slate">
          <a href="#" className="hover:text-brand-cyan transition-colors">Ecosystem</a>
          <a href="#" className="hover:text-brand-cyan transition-colors">Platforms</a>
          <a href="#" className="hover:text-brand-cyan transition-colors">Ventures</a>
          <a href="#" className="hover:text-brand-cyan transition-colors">About</a>
        </nav>
        <button className="btn-primary text-xs px-4 py-2 uppercase tracking-widest">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-cyan/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-brand-violet/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display mb-6 tracking-tight"
          >
            Mentally Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-pink">Studios</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-brand-slate text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Technology should expand human capability, not replace human creativity. 
            We build the future of AI platforms, software, and creative intelligence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="btn-primary px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2">
              Enter the Ecosystem <ArrowRight size={20} />
            </button>
            <button className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Division Grid */}
      <section className="py-20 px-6 bg-brand-grey/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl mb-4">The Seven Pillars</h2>
            <p className="text-brand-slate max-w-2xl mx-auto">
              Our ecosystem is comprised of seven specialized divisions that synergize to push the boundaries of technology and creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {divisions.map((division, idx) => (
              <motion.div
                key={division.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass p-8 flex flex-col items-start group cursor-pointer relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: division.color }}
                ></div>
                
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${division.color}15`, color: division.color }}
                >
                  <division.icon size={24} />
                </div>
                
                <h3 className="text-xl mb-1 group-hover:text-brand-cyan transition-colors">{division.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider mb-4 opacity-70" style={{ color: division.color }}>{division.tagline}</p>
                <p className="text-brand-slate text-sm mb-6 flex-grow leading-relaxed">
                  {division.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                  Explore <MousePointer2 size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-6 border-t border-brand-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl mb-8 leading-tight">Our objective is to redefine how people create, work, lead, and innovate.</h2>
          <p className="text-brand-slate text-lg leading-relaxed mb-10">
            We are building an interconnected platform of products, services, and experiences that collectively expand human potential. From executive AI to interactive entertainment, we are the Creative Intelligence Ecosystem.
          </p>
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-pink">
            <div className="bg-brand-void px-8 py-2 rounded-full text-sm font-display uppercase tracking-widest">
              The Future is Mentally Creative
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-white/5 bg-brand-void">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display text-xl tracking-tighter flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 bg-brand-white rounded-md"></div>
            <span>MCS</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-brand-slate">
            <a href="#" className="hover:text-brand-white">Privacy</a>
            <a href="#" className="hover:text-brand-white">Terms</a>
            <a href="#" className="hover:text-brand-white">Contact</a>
            <a href="#" className="hover:text-brand-white">X</a>
            <a href="#" className="hover:text-brand-white">Discord</a>
          </div>
          <p className="text-brand-slate text-xs opacity-50">
            &copy; 2026 Mentally Creative Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
