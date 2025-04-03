import { useEffect, useState } from 'react';

interface MobileControlsProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ isMuted, setIsMuted }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      setIsMobile(isMobileDevice || window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Hide controls after 5 seconds
  useEffect(() => {
    if (isMobile) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isMobile]);

  // Only render for mobile devices
  if (!isMobile) return null;

  return (
    <>
      {/* Control panel */}
      <div
        className={`fixed bottom-16 left-1/2 transform -translate-x-1/2 p-4 bg-white bg-opacity-40 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 flex items-center gap-4 z-50 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setShowControls(true)}
      >
        {/* Sound toggle button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-90 shadow-md"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          )}
        </button>

        {/* Info button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-90 shadow-md"
          onClick={() => {
            alert('Scroll up to ascend the Space Elevator. You will pass through different atmospheric layers and see various milestones as you go higher. Tap anywhere to show/hide controls.');
          }}
          aria-label="Info"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>

        {/* Return to top button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-90 shadow-md"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
          aria-label="Return to Earth"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
      </div>

      {/* Tap anywhere to show controls */}
      {!showControls && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowControls(true)}
        />
      )}
    </>
  );
};

export default MobileControls;
