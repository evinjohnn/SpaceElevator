import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParallaxElementsProps {
  currentHeight: number;
}

const ParallaxElements: React.FC<ParallaxElementsProps> = ({ currentHeight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsCreatedRef = useRef(false);

  // Create the parallax elements
  useEffect(() => {
    if (!containerRef.current || elementsCreatedRef.current) return;

    const container = containerRef.current;
    elementsCreatedRef.current = true;

    // Create distant clouds (below 15000m)
    for (let i = 0; i < 15; i++) {
      createCloud(container, i);
    }

    // Create birds (below 8000m)
    for (let i = 0; i < 5; i++) {
      createBird(container, i);
    }

    // Create satellites (above 100000m)
    for (let i = 0; i < 8; i++) {
      createSatellite(container, i);
    }

    // Create stars (above 100000m)
    for (let i = 0; i < 50; i++) {
      createStar(container, i);
    }
  }, []);

  // Control element visibility based on height
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Handle clouds visibility
    const clouds = container.querySelectorAll('.parallax-cloud');
    for (const cloud of Array.from(clouds)) {
      const cloudElement = cloud as HTMLElement;
      if (currentHeight < 15000) {
        cloudElement.style.display = 'block';
        gsap.to(cloudElement, { opacity: 1, duration: 0.5 });
      } else {
        gsap.to(cloudElement, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            cloudElement.style.display = 'none';
          }
        });
      }
    }

    // Handle birds visibility
    const birds = container.querySelectorAll('.parallax-bird');
    for (const bird of Array.from(birds)) {
      const birdElement = bird as HTMLElement;
      if (currentHeight < 8000) {
        birdElement.style.display = 'block';
        gsap.to(birdElement, { opacity: 1, duration: 0.5 });
      } else {
        gsap.to(birdElement, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            birdElement.style.display = 'none';
          }
        });
      }
    }

    // Handle satellites visibility
    const satellites = container.querySelectorAll('.parallax-satellite');
    for (const satellite of Array.from(satellites)) {
      const satelliteElement = satellite as HTMLElement;
      if (currentHeight > 100000) {
        satelliteElement.style.display = 'block';
        gsap.to(satelliteElement, { opacity: 1, duration: 0.5 });
      } else {
        gsap.to(satelliteElement, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            satelliteElement.style.display = 'none';
          }
        });
      }
    }

    // Handle stars visibility
    const stars = container.querySelectorAll('.parallax-star');
    for (const star of Array.from(stars)) {
      const starElement = star as HTMLElement;
      if (currentHeight > 100000) {
        starElement.style.display = 'block';
        gsap.to(starElement, { opacity: 1, duration: 0.5 });
      } else {
        gsap.to(starElement, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            starElement.style.display = 'none';
          }
        });
      }
    }
  }, [currentHeight]);

  // Function to create a cloud element
  const createCloud = (container: HTMLElement, index: number) => {
    const cloud = document.createElement('div');
    cloud.className = 'parallax-cloud';

    // Randomize position
    const x = Math.random() * 100;
    const y = Math.random() * 80 + 10; // Keep clouds in upper area

    // Randomize size
    const size = Math.random() * 150 + 50;

    // Create cloud appearance
    cloud.innerHTML = `
      <svg viewBox="0 0 200 100" width="${size}" height="${size / 2}">
        <path fill="rgba(255, 255, 255, 0.7)" d="M30,90 C10,90 0,75 0,60 C0,45 10,30 30,30 C30,10 45,0 65,0 C85,0 100,10 100,30 C120,30 135,45 135,60 C135,75 120,90 100,90 L30,90 Z"/>
      </svg>
    `;

    // Set styles
    cloud.style.position = 'absolute';
    cloud.style.left = `${x}%`;
    cloud.style.top = `${y}%`;
    cloud.style.zIndex = '-2';
    cloud.style.opacity = '0';
    cloud.style.transform = 'translateZ(-5px)';
    cloud.style.filter = 'blur(1px)';

    // Animate cloud movement
    gsap.to(cloud, {
      x: `${Math.random() * 100 - 50}px`,
      duration: Math.random() * 60 + 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Add to container
    container.appendChild(cloud);
  };

  // Function to create a bird element
  const createBird = (container: HTMLElement, index: number) => {
    const bird = document.createElement('div');
    bird.className = 'parallax-bird';

    // Randomize position
    const x = Math.random() * 100;
    const y = Math.random() * 70 + 20; // Keep birds in middle/upper area

    // Randomize size
    const size = Math.random() * 20 + 10;

    // Create bird appearance (simple "M" shape)
    bird.innerHTML = `
      <svg viewBox="0 0 30 20" width="${size}" height="${size * 0.67}">
        <path fill="rgba(0, 0, 0, 0.7)" d="M0,10 L15,0 L30,10 L15,20 Z"/>
      </svg>
    `;

    // Set styles
    bird.style.position = 'absolute';
    bird.style.left = `${x}%`;
    bird.style.top = `${y}%`;
    bird.style.zIndex = '-2';
    bird.style.opacity = '0';

    // Animate bird movement (flying across screen)
    gsap.to(bird, {
      x: `${window.innerWidth + 100}px`,
      duration: Math.random() * 30 + 20,
      repeat: -1,
      ease: "none"
    });

    // Add to container
    container.appendChild(bird);
  };

  // Function to create a satellite element
  const createSatellite = (container: HTMLElement, index: number) => {
    const satellite = document.createElement('div');
    satellite.className = 'parallax-satellite';

    // Randomize position
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Randomize size
    const size = Math.random() * 40 + 20;

    // Choose a random rotation
    const rotation = Math.random() * 360;

    // Create satellite appearance
    satellite.innerHTML = `
      <svg viewBox="0 0 100 30" width="${size}" height="${size * 0.3}">
        <rect fill="#DDD" x="40" y="10" width="20" height="10"/>
        <rect fill="#4169E1" x="0" y="5" width="30" height="20"/>
        <rect fill="#4169E1" x="70" y="5" width="30" height="20"/>
      </svg>
    `;

    // Set styles
    satellite.style.position = 'absolute';
    satellite.style.left = `${x}%`;
    satellite.style.top = `${y}%`;
    satellite.style.zIndex = '-2';
    satellite.style.opacity = '0';
    satellite.style.transform = `rotate(${rotation}deg)`;
    satellite.style.display = 'none';

    // Animate satellite movement
    gsap.to(satellite, {
      x: `${Math.random() * 200 - 100}px`,
      y: `${Math.random() * 200 - 100}px`,
      rotation: `+=${Math.random() * 360}`,
      duration: Math.random() * 100 + 50,
      repeat: -1,
      yoyo: true,
      ease: "linear"
    });

    // Add to container
    container.appendChild(satellite);
  };

  // Function to create a star element
  const createStar = (container: HTMLElement, index: number) => {
    const star = document.createElement('div');
    star.className = 'parallax-star';

    // Randomize position
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Randomize size
    const size = Math.random() * 3 + 1;

    // Randomize brightness
    const brightness = Math.random() * 0.5 + 0.5;

    // Set styles
    star.style.position = 'absolute';
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`;
    star.style.borderRadius = '50%';
    star.style.zIndex = '-3';
    star.style.opacity = '0';
    star.style.display = 'none';

    // Animate star twinkling
    gsap.to(star, {
      opacity: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 2 + 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Add to container
    container.appendChild(star);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ perspective: '10px' }}
    />
  );
};

export default ParallaxElements;
