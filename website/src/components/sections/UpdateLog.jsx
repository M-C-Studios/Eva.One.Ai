import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, ChevronRight } from 'lucide-react';

const UpdateLog = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/version.json');
        if (response.ok) {
          const data = await response.json();
          setUpdates(data.changelog || []);
        }
      } catch (e) {
        console.warn('Failed to fetch updates for log:', e);
      }
    };
    fetchUpdates();
  }, []);

  if (updates.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-brand-void/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-brand-violet/20 rounded-xl">
            <History className="w-6 h-6 text-brand-violet" />
          </div>
          <div>
            <h2 className="text-2xl font-display tracking-display">What's New</h2>
            <p className="text-brand-slate text-sm uppercase tracking-widest mt-1">EVA System Evolution</p>
          </div>
        </div>

        <div className="space-y-8">
          {updates.map((update, index) => (
            <motion.div
              key={update.version}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l border-brand-white/10"
            >
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-brand-violet border-2 border-brand-void"></div>
              
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-xl font-bold text-brand-white">v{update.version}</h3>
                <span className="text-xs text-brand-slate font-mono">{update.date}</span>
              </div>
              
              <ul className="space-y-3">
                {update.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-slate text-sm leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                    {change}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdateLog;
