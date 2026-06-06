import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-brand-void/80 backdrop-blur-md border-b border-brand-white/5">
      <div className="font-display text-xl tracking-tighter flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-cyan to-brand-violet rounded-lg shadow-lg shadow-brand-cyan/20"></div>
        <span>MCS</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase text-brand-slate">
        <a href="#ecosystem" className="hover:text-brand-cyan transition-colors">Ecosystem</a>
        <a href="#platforms" className="hover:text-brand-cyan transition-colors">Platforms</a>
        <a href="#ventures" className="hover:text-brand-cyan transition-colors">Ventures</a>
        <a href="#about" className="hover:text-brand-cyan transition-colors">About</a>
      </nav>
      <button className="btn-primary text-xs px-4 py-2 uppercase tracking-widest">
        Get Started
      </button>
    </header>
  );
};

export default Header;
