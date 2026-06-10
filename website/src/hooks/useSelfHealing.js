import { useState, useEffect, useCallback, useRef } from 'react';

const RECOVERY_LOG_KEY = 'eva_recovery_log';

export function useSelfHealing() {
  const [healthStatus, setHealthStatus] = useState('healthy');
  const [recoveryLog, setRecoveryLog] = useState(() => {
    try {
      const stored = localStorage.getItem(RECOVERY_LOG_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const heartbeatRef = useRef(null);
  const initializedRef = useRef(false);

  const logRecovery = useCallback((action, details) => {
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      success: true
    };
    
    setRecoveryLog(prev => {
      const updated = [...prev, entry].slice(-50);
      try {
        localStorage.setItem(RECOVERY_LOG_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to persist recovery log:', e);
      }
      return updated;
    });
    
    return entry;
  }, []);

  const retryFailedAsset = useCallback((url, maxRetries = 3) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      
      const attemptLoad = () => {
        attempts++;
        
        const img = new Image();
        img.onload = () => {
          logRecovery('ASSET_RETRY_SUCCESS', { url, attempts });
          resolve({ url, success: true, attempts });
        };
        img.onerror = () => {
          if (attempts < maxRetries) {
            logRecovery('ASSET_RETRY_ATTEMPT', { url, attempts, maxRetries });
            setTimeout(attemptLoad, 1000 * Math.pow(2, attempts - 1));
          } else {
            logRecovery('ASSET_RETRY_FAILED', { url, attempts });
            reject({ url, success: false, attempts });
          }
        };
        img.src = url;
      };
      
      attemptLoad();
    });
  }, [logRecovery]);

  const retryAsyncOperation = useCallback(async (operation, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        if (attempt > 1) {
          logRecovery('ASYNC_RETRY_SUCCESS', { attempt });
        }
        return result;
      } catch (error) {
        lastError = error;
        logRecovery('ASYNC_RETRY_ATTEMPT', { attempt, maxRetries, error: error.message });
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }
    
    logRecovery('ASYNC_RETRY_FAILED', { error: lastError?.message });
    throw lastError;
  }, [logRecovery]);

  const performHealthCheck = useCallback(() => {
    try {
      if (typeof document === 'undefined') {
        return { healthy: true, checkedAt: new Date().toISOString() };
      }
      
      const criticalElements = document.querySelectorAll('[data-critical]');
      const hasContent = document.body && document.body.children.length > 0;
      
      const health = {
        healthy: hasContent,
        checkedAt: new Date().toISOString(),
        criticalElementsCount: criticalElements.length
      };
      
      setHealthStatus(health.healthy ? 'healthy' : 'degraded');
      return health;
    } catch (error) {
      setHealthStatus('error');
      logRecovery('HEALTH_CHECK_FAILED', { error: error.message });
      return { healthy: false, checkedAt: new Date().toISOString(), error: error.message };
    }
  }, [logRecovery]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    heartbeatRef.current = setInterval(performHealthCheck, 30000);
    
    const handleUnhandledRejection = (event) => {
      logRecovery('UNHANDLED_REJECTION', { reason: event.reason?.message || String(event.reason) });
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [performHealthCheck, logRecovery]);

  const clearRecoveryLog = useCallback(() => {
    setRecoveryLog([]);
    localStorage.removeItem(RECOVERY_LOG_KEY);
  }, []);

  return {
    healthStatus,
    recoveryLog,
    logRecovery,
    retryFailedAsset,
    retryAsyncOperation,
    performHealthCheck,
    clearRecoveryLog
  };
}
