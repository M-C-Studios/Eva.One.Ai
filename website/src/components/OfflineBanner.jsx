import { useOffline } from '../hooks/useOffline';
import { WifiOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OfflineBanner = () => {
  const { isOffline, clearOfflineNotice } = useOffline();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-brand-pink/90 to-brand-violet/90 backdrop-blur-md px-4 py-2"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WifiOff className="w-4 h-4 text-brand-white" />
              <span className="text-sm font-semibold text-brand-white">
                You're offline — EVA is still running locally
              </span>
            </div>
            
            <button
              onClick={clearOfflineNotice}
              className="p-1 hover:bg-brand-white/10 rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-brand-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
