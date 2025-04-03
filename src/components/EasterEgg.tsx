import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface EasterEggProps {
  currentHeight: number;
}

const EasterEgg: React.FC<EasterEggProps> = ({ currentHeight }) => {
  const easterEggRef = useRef<HTMLDivElement>(null);

  // Show easter egg at the maximum height
  useEffect(() => {
    if (!easterEggRef.current) return;

    // Define the maximum height (near the moon)
    const maxHeight = 35000000; // 35,000,000 meters

    // Show the easter egg when near the maximum height
    if (currentHeight >= maxHeight) {
      // Animate the easter egg to appear
      gsap.to(easterEggRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      });
    } else {
      // Hide the easter egg
      gsap.to(easterEggRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5
      });
    }
  }, [currentHeight]);

  return (
    <div
      ref={easterEggRef}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-8 rounded-lg shadow-lg z-50 flex flex-col items-center justify-center opacity-0 translate-y-12"
      style={{ maxWidth: '500px' }}
    >
      <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
      <p className="text-xl mb-6">You've reached the end of the Space Elevator!</p>

      <div className="w-32 h-32 mb-6 relative">
        {/* Space station animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-8 bg-gray-300 rounded-lg" />
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-3 bg-blue-400 rounded-full rotate-90" />
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-3 bg-blue-400 rounded-full" />
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center animate-spin" style={{ animationDuration: '20s' }}>
          <div className="w-10 h-10 bg-yellow-400 -ml-20 rounded-md" />
        </div>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
          <div className="w-10 h-10 bg-green-400 ml-20 rounded-md" />
        </div>
      </div>

      <p className="text-center mb-4">
        Welcome to the Neal.fun Space Station! From here, you can see Earth, the Moon, and the vast expanse of our galaxy.
      </p>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        onClick={() => {
          // Scroll back to the top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
      >
        Return to Earth
      </button>
    </div>
  );
};

export default EasterEgg;
