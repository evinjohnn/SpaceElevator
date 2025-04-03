import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AtmosphericLayers from './components/AtmosphericLayers';
import Milestones from './components/Milestones';
import Stars from './components/Stars';
import Clouds from './components/Clouds';
import EasterEgg from './components/EasterEgg';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [height, setHeight] = useState(0);
  const [temperature, setTemperature] = useState(15);
  const scrollRef = useRef<HTMLDivElement>(null);
  const elevatorRef = useRef<HTMLDivElement>(null);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)), // Improved from Math.pow
      orientation: 'vertical', // Changed from 'direction' to 'orientation'
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Initialize the height counter and temperature
  useEffect(() => {
    if (!scrollRef.current || !elevatorRef.current) return;

    const elevator = elevatorRef.current;

    // Set the height of the scroll container to allow for long scrolling
    const elevatorHeight = window.innerHeight * 300; // 300 times the viewport height
    elevator.style.height = `${elevatorHeight}px`;

    // Update the height counter as user scrolls
    const updateHeight = () => {
      const scrollPosition = window.scrollY;
      const maxHeight = 36000000; // Max height in meters (to the Moon's approximate distance)
      const calculatedHeight = Math.floor((scrollPosition / elevatorHeight) * maxHeight);
      setHeight(calculatedHeight);

      // Update temperature based on height
      // Temperature decreases roughly 6.5°C per 1000m in troposphere (up to ~12km)
      // Then it varies in different atmospheric layers
      let temp = 15; // Starting temperature at sea level (°C)

      if (calculatedHeight < 12000) {
        // Troposphere: temp decreases by ~6.5°C per 1000m
        temp = temp - (calculatedHeight / 1000) * 6.5;
      } else if (calculatedHeight < 20000) {
        // Stratosphere: temp is constant at first, then increases
        temp = -56;
      } else if (calculatedHeight < 50000) {
        // Mesosphere: temp increases, then decreases
        temp = -56 + ((calculatedHeight - 20000) / 30000) * 16;
      } else if (calculatedHeight < 85000) {
        // Thermosphere: temperature increases rapidly
        temp = -40 - ((calculatedHeight - 50000) / 35000) * 50;
      } else {
        // Space: extremely cold in shadow, extremely hot in sunlight
        temp = -270;
      }

      setTemperature(Math.round(temp));
    };

    window.addEventListener('scroll', updateHeight);

    return () => {
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  // Add "Scroll Up!" indicator at the beginning
  useEffect(() => {
    const initialMessage = document.createElement('div');
    initialMessage.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 text-2xl font-bold';
    initialMessage.textContent = '↑ Scroll Up! ↑';

    document.body.appendChild(initialMessage);

    gsap.to(initialMessage, {
      opacity: 0,
      y: -20,
      duration: 1.5,
      delay: 3,
      ease: 'power2.in',
      onComplete: () => {
        initialMessage.remove();
      }
    });

    return () => {
      initialMessage.remove();
    };
  }, []);

  // Add title on first load
  useEffect(() => {
    const title = document.createElement('div');
    title.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold';
    title.innerHTML = '<div class="text-center"><div style="text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff">SPACE<br>ELEVATOR</div><div class="text-lg mt-3">↑ Scroll Up! ↑</div></div>';

    document.body.appendChild(title);

    gsap.to(title, {
      opacity: 0,
      scale: 1.2,
      duration: 1.5,
      delay: 3,
      ease: 'power2.in',
      onComplete: () => {
        title.remove();
      }
    });

    return () => {
      title.remove();
    };
  }, []);

  return (
    <div className="relative">
      {/* Background layers */}
      <AtmosphericLayers currentHeight={height} />

      {/* Stars (in space) */}
      <Stars currentHeight={height} />

      {/* Clouds (in troposphere) */}
      <Clouds currentHeight={height} />

      {/* Fixed header showing NEAL.FUN */}
      <header className="fixed top-0 left-0 z-50 p-4 font-bold text-2xl text-white">
        SPACE ELEVATOR
      </header>

      {/* Fixed info panel showing current height and temperature */}
      <div className="fixed top-0 right-0 z-50 p-4 font-bold text-right text-white">
        <div className="text-xl">{temperature}°C</div>
      </div>

      {/* Elevator shaft (the character's cable) */}
      <div className="fixed left-16 top-0 w-1 h-full bg-gray-400 z-10" />

      {/* Elevator character (fixed position) */}
      <div className="fixed left-10 top-1/2 transform -translate-y-1/2 z-20">
        <div className="w-20 h-32 bg-blue-200 flex items-center justify-center border-2 border-blue-400 rounded-md">
          <div className="w-12 h-24 flex flex-col items-center justify-center">
            {/* Simple stick figure */}
            <div className="w-8 h-8 bg-white rounded-full mb-1 flex items-center justify-center">
              <div className="w-1 h-1 bg-black rounded-full mr-1" />
              <div className="w-1 h-1 bg-black rounded-full ml-1" />
            </div>
            <div className="w-6 h-12 bg-orange-500 rounded-md" />
          </div>
        </div>
      </div>

      {/* Height counter fixed at bottom */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-300 px-6 py-2 rounded-md flex items-center justify-center text-2xl font-mono">
        <span className="tabular-nums">{height.toString().padStart(6, '0')}</span>
        <span className="ml-2">m</span>
      </div>

      {/* Easter egg at the end */}
      <EasterEgg currentHeight={height} />

      {/* Milestones */}
      <Milestones currentHeight={height} />

      {/* Scrollable content */}
      <div ref={scrollRef} className="relative">
        <div ref={elevatorRef} className="relative">
          {/* Content is mostly empty as our visual elements are fixed position */}
        </div>
      </div>
    </div>
  );
}

export default App;
