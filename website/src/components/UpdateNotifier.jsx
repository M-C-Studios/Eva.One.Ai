import { useState, useEffect } from 'react';
import { X, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VERSION_STORAGE_KEY = 'eva_app_version';
const CURRENT_VERSION = '1.0.0';

const UpdateNotifier = () => {
  const [updateState, setUpdateState] = useState(() => {
    return {
      updateAvailable: false,
      newVersion: null,
      dismissed: false,
      showChangelog: false
    };
  });

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch('/version.json');
        if (!response.ok) return;
        
        const data = await response.json();
        const storedVersion = localStorage.getItem(VERSION_STORAGE_KEY);
        
        if (data.version !== CURRENT_VERSION && data.version !== storedVersion) {
          setUpdateState(prev => ({
            ...prev,
            updateAvailable: true,
            newVersion: data.version
          }));
        }
      } catch (e) {
        console.warn('Version check failed:', e);
      }
    };
    
    checkForUpdates();
    
    const handleOnline = () => checkForUpdates();
    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleDismiss = () => {
    if (updateState.newVersion) {
      localStorage.setItem(VERSION_STORAGE_KEY, updateState.newVersion);
    }
    setUpdateState(prev => ({ ...prev, dismissed: true }));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!updateState.updateAvailable || updateState.dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full glass"
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-brand-cyan/20 rounded-full flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-brand-cyan" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">
                Update Available
              </h3>
              <p className="text-xs text-brand-slate mt-1">
                Version {updateState.newVersion} is ready. Check out the new features!
              </p>
              
              <button
                onClick={() => setUpdateState(prev => ({ ...prev, showChangelog: !prev.showChangelog }))}
                className="flex items-center gap-1 text-xs text-brand-cyan mt-2 hover:underline"
              >
                {updateState.showChangelog ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    Hide changelog
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    What's new?
                  </>
                )}
              </button>
              
              {updateState.showChangelog && (
                <div className="mt-3 p-3 bg-brand-grey/50 rounded-lg text-xs">
                  <h4 className="font-semibold text-brand-cyan mb-2">v{updateState.newVersion}</h4>
                  <ul className="space-y-1 text-brand-slate">
                    <li>• Offline-first architecture</li>
                    <li>• Self-healing system</li>
                    <li>• Local contact messaging</li>
                    <li>• PWA support</li>
                  </ul>
                </div>
              )}
            </div>
            
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-brand-white/5 rounded-full transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4 text-brand-slate" />
            </button>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleDismiss}
              className="btn-secondary flex-1 text-xs py-2"
            >
              Later
            </button>
            <button
              onClick={handleRefresh}
              className="btn-primary flex-1 text-xs py-2"
            >
              Refresh Now
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateNotifier;
