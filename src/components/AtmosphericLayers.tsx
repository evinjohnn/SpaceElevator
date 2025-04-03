import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AtmosphericLayersProps {
  currentHeight: number;
}

const AtmosphericLayers: React.FC<AtmosphericLayersProps> = ({ currentHeight }) => {
  const troposphereRef = useRef<HTMLDivElement>(null);
  const stratosphereRef = useRef<HTMLDivElement>(null);
  const mesosphereRef = useRef<HTMLDivElement>(null);
  const thermosphereRef = useRef<HTMLDivElement>(null);
  const exosphereRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  // Update the background color based on the current height
  useEffect(() => {
    // Define the height range for each layer
    const troposphereEnd = 12000; // 12km
    const stratosphereEnd = 50000; // 50km
    const mesosphereEnd = 85000; // 85km
    const thermosphereEnd = 500000; // 500km
    const exosphereEnd = 10000000; // 10,000km

    // Calculate opacity based on height
    let troposphereOpacity = 1;
    let stratosphereOpacity = 0;
    let mesosphereOpacity = 0;
    let thermosphereOpacity = 0;
    let exosphereOpacity = 0;
    let spaceOpacity = 0;

    // Transition zone size (meters)
    const transitionSize = 3000;

    if (currentHeight < troposphereEnd) {
      // In troposphere
      troposphereOpacity = 1;

      // Start transitioning to stratosphere near the end of troposphere
      if (currentHeight > troposphereEnd - transitionSize) {
        const progress = (currentHeight - (troposphereEnd - transitionSize)) / transitionSize;
        stratosphereOpacity = Math.min(progress, 1);
        troposphereOpacity = 1 - stratosphereOpacity;
      }
    } else if (currentHeight < stratosphereEnd) {
      // In stratosphere
      stratosphereOpacity = 1;

      // Start transitioning to mesosphere near the end of stratosphere
      if (currentHeight > stratosphereEnd - transitionSize) {
        const progress = (currentHeight - (stratosphereEnd - transitionSize)) / transitionSize;
        mesosphereOpacity = Math.min(progress, 1);
        stratosphereOpacity = 1 - mesosphereOpacity;
      }
    } else if (currentHeight < mesosphereEnd) {
      // In mesosphere
      mesosphereOpacity = 1;

      // Start transitioning to thermosphere near the end of mesosphere
      if (currentHeight > mesosphereEnd - transitionSize) {
        const progress = (currentHeight - (mesosphereEnd - transitionSize)) / transitionSize;
        thermosphereOpacity = Math.min(progress, 1);
        mesosphereOpacity = 1 - thermosphereOpacity;
      }
    } else if (currentHeight < thermosphereEnd) {
      // In thermosphere
      thermosphereOpacity = 1;

      // Start transitioning to exosphere near the end of thermosphere
      if (currentHeight > thermosphereEnd - transitionSize) {
        const progress = (currentHeight - (thermosphereEnd - transitionSize)) / transitionSize;
        exosphereOpacity = Math.min(progress, 1);
        thermosphereOpacity = 1 - exosphereOpacity;
      }
    } else if (currentHeight < exosphereEnd) {
      // In exosphere
      exosphereOpacity = 1;

      // Start transitioning to space near the end of exosphere
      if (currentHeight > exosphereEnd - transitionSize) {
        const progress = (currentHeight - (exosphereEnd - transitionSize)) / transitionSize;
        spaceOpacity = Math.min(progress, 1);
        exosphereOpacity = 1 - spaceOpacity;
      }
    } else {
      // In space
      spaceOpacity = 1;
    }

    // Update the opacity of each layer
    if (troposphereRef.current) {
      gsap.to(troposphereRef.current, { opacity: troposphereOpacity, duration: 0.5 });
    }

    if (stratosphereRef.current) {
      gsap.to(stratosphereRef.current, { opacity: stratosphereOpacity, duration: 0.5 });
    }

    if (mesosphereRef.current) {
      gsap.to(mesosphereRef.current, { opacity: mesosphereOpacity, duration: 0.5 });
    }

    if (thermosphereRef.current) {
      gsap.to(thermosphereRef.current, { opacity: thermosphereOpacity, duration: 0.5 });
    }

    if (exosphereRef.current) {
      gsap.to(exosphereRef.current, { opacity: exosphereOpacity, duration: 0.5 });
    }

    if (spaceRef.current) {
      gsap.to(spaceRef.current, { opacity: spaceOpacity, duration: 0.5 });
    }
  }, [currentHeight]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Troposphere (0-12km): Blue sky with clouds */}
      <div
        ref={troposphereRef}
        className="absolute inset-0 w-full h-full bg-blue-400 opacity-100"
        style={{
          background: 'linear-gradient(to bottom, #62bfe6 0%, #a7d3f2 100%)',
          backgroundSize: '100% 100%',
          opacity: 1
        }}
      />

      {/* Stratosphere (12-50km): Darker blue */}
      <div
        ref={stratosphereRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{
          background: 'linear-gradient(to bottom, #2a4880 0%, #6b8cc8 100%)',
          backgroundSize: '100% 100%',
          opacity: 0
        }}
      />

      {/* Mesosphere (50-85km): Deep blue to purple */}
      <div
        ref={mesosphereRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{
          background: 'linear-gradient(to bottom, #1a1a40 0%, #533b78 100%)',
          backgroundSize: '100% 100%',
          opacity: 0
        }}
      />

      {/* Thermosphere (85-500km): Purple to dark purple */}
      <div
        ref={thermosphereRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{
          background: 'linear-gradient(to bottom, #0a0a20 0%, #201637 100%)',
          backgroundSize: '100% 100%',
          opacity: 0
        }}
      />

      {/* Exosphere (500-10,000km): Near black to dark blue */}
      <div
        ref={exosphereRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{
          background: 'linear-gradient(to bottom, #030311 0%, #0a0a22 100%)',
          backgroundSize: '100% 100%',
          opacity: 0
        }}
      />

      {/* Outer Space (beyond 10,000km): Black with stars */}
      <div
        ref={spaceRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{
          background: '#000000',
          backgroundSize: '100% 100%',
          opacity: 0
        }}
      />

      {/* Grid overlay for the neal.fun style */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default AtmosphericLayers;
