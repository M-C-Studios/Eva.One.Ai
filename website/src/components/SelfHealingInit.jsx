import { useEffect } from 'react';
import { useSelfHealing } from '../hooks/useSelfHealing';

const SelfHealingInit = () => {
  const { performHealthCheck, logRecovery } = useSelfHealing();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleGlobalError = (event) => {
        if (!event.defaultPrevented) {
          logRecovery('GLOBAL_ERROR', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error?.message || String(event.error)
          });
        }
      };

      window.addEventListener('error', handleGlobalError);
      
      // Perform initial health check
      performHealthCheck();

      return () => {
        window.removeEventListener('error', handleGlobalError);
      };
    }
  }, [logRecovery, performHealthCheck]);
  
  return null;
};

export default SelfHealingInit;
