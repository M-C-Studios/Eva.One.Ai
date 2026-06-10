import { useState } from 'react';
import { useSelfHealing } from '../hooks/useSelfHealing';

const SafeImage = ({ src, alt, className, fallbackSrc = 'https://via.placeholder.com/800x600?text=Asset+Unavailable', ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errorCount, setErrorCount] = useState(0);
  const [prevSrc, setPrevSrc] = useState(src);
  const { retryFailedAsset, logRecovery } = useSelfHealing();

  if (src !== prevSrc) {
    setPrevSrc(src);
    setCurrentSrc(src);
    setErrorCount(0);
  }

  const handleError = async () => {
    if (errorCount < 3) {
      try {
        const result = await retryFailedAsset(src, 3);
        if (result.success) {
          setCurrentSrc(`${src}?retry=${Date.now()}`);
          setErrorCount(prev => prev + 1);
        }
      } catch {
        logRecovery('IMAGE_LOAD_FAILURE', { src, error: 'All retries failed' });
        setCurrentSrc(fallbackSrc);
      }
    } else {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default SafeImage;
