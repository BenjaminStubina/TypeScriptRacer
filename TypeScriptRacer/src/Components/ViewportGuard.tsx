import { useEffect, useState } from 'react';
import './ViewportGuard.css';

export const ViewportGuard = () => {
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      // Consider viewport too small if width < 600px
      const isTooSmall = window.innerWidth < 600;
      setIsSmallViewport(isTooSmall);
    };

    // Check on mount
    checkViewport();

    // Add event listener for window resize
    window.addEventListener('resize', checkViewport);

    // Cleanup
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (!isSmallViewport) return null;

  return (
    <div className="viewport-guard-overlay">
      <div className="viewport-guard-content">
        <h2>Screen Too Small</h2>
        <p>
          TypeScriptRacer is designed for desktop use. Please increase your browser window size or switch to a larger device to enjoy the full experience.
        </p>
      </div>
    </div>
  );
};
