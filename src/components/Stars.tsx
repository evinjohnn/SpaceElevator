import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StarsProps {
  currentHeight: number;
}

const Stars: React.FC<StarsProps> = ({ currentHeight }) => {
  const starsContainerRef = useRef<HTMLDivElement>(null);

  // Generate random stars
  useEffect(() => {
    if (!starsContainerRef.current) return;

    const starsContainer = starsContainerRef.current;

    // Remove any existing stars
    starsContainer.innerHTML = '';

    // Create 200 stars
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Random size (small)
      const size = Math.random() * 2 + 1;

      // Random opacity
      const opacity = Math.random() * 0.7 + 0.3;

      // Set styles
      star.style.position = 'absolute';
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.opacity = `${opacity}`;

      // Add to container
      starsContainer.appendChild(star);
    }
  }, []);

  // Control stars visibility based on height
  useEffect(() => {
    if (!starsContainerRef.current) return;

    // Space begins around 100km
    const spaceThreshold = 100000;

    // Calculate opacity based on height
    let opacity = 0;

    if (currentHeight > spaceThreshold) {
      // Start to fade in from 100km to 110km
      const transitionRange = 10000;
      const progress = Math.min((currentHeight - spaceThreshold) / transitionRange, 1);
      opacity = progress;
    }

    // Apply the opacity
    gsap.to(starsContainerRef.current, {
      opacity,
      duration: 1
    });
  }, [currentHeight]);

  // Twinkle effect for the stars
  useEffect(() => {
    if (!starsContainerRef.current || currentHeight < 100000) return;

    const stars = starsContainerRef.current.children;

    // Animate random stars to twinkle
    const twinkleStars = () => {
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * stars.length);
        const star = stars[randomIndex] as HTMLElement;

        if (star) {
          gsap.to(star, {
            opacity: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 2 + 1,
            onComplete: () => {
              gsap.to(star, {
                opacity: Math.random() * 0.3 + 0.2,
                duration: Math.random() * 2 + 1
              });
            }
          });
        }
      }
    };

    // Start twinkling on a timer
    const twinkleInterval = setInterval(twinkleStars, 1000);

    return () => {
      clearInterval(twinkleInterval);
    };
  }, [currentHeight]);

  return (
    <div
      ref={starsContainerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-5]"
      style={{ opacity: 0 }}
    />
  );
};

export default Stars;
