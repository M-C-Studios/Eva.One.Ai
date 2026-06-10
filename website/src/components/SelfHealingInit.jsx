import { useEffect } from 'react';

const SelfHealingInit = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        if (!event.defaultPrevented) {
          console.warn('[EVA Self-Healing] Uncaught error detected:', event.error);
        }
      });
    }
  }, []);
  
  return null;
};

export default SelfHealingInit;
