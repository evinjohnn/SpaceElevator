import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CloudsProps {
  currentHeight: number;
}

const Clouds: React.FC<CloudsProps> = ({ currentHeight }) => {
  const cloudsContainerRef = useRef<HTMLDivElement>(null);

  // Generate clouds and position them
  useEffect(() => {
    if (!cloudsContainerRef.current) return;

    const cloudsContainer = cloudsContainerRef.current;

    // Remove any existing clouds
    cloudsContainer.innerHTML = '';

    // Create 10 clouds
    for (let i = 0; i < 10; i++) {
      const cloud = document.createElement('div');

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Random size
      const size = Math.random() * 100 + 50;

      // Set styles for the cloud container
      cloud.style.position = 'absolute';
      cloud.style.left = `${x}%`;
      cloud.style.top = `${y}%`;
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size * 0.6}px`;
      cloud.style.borderRadius = '50%';
      cloud.className = 'cloud';

      // Create cloud appearance with multiple circles
      for (let j = 0; j < 5; j++) {
        const cloudPart = document.createElement('div');

        // Randomize positions a bit
        const partX = Math.random() * 40;
        const partY = Math.random() * 10;
        const partSize = Math.random() * 40 + 30;

        // Style the cloud part
        cloudPart.style.position = 'absolute';
        cloudPart.style.left = `${partX}%`;
        cloudPart.style.top = `${partY}%`;
        cloudPart.style.width = `${partSize}%`;
        cloudPart.style.height = `${partSize}%`;
        cloudPart.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        cloudPart.style.borderRadius = '50%';

        // Add to cloud
        cloud.appendChild(cloudPart);
      }

      // Animate cloud movement
      gsap.to(cloud, {
        x: `${Math.random() * 30 - 15}px`,
        y: `${Math.random() * 10 - 5}px`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Add to container
      cloudsContainer.appendChild(cloud);
    }
  }, []);

  // Control clouds visibility based on height
  useEffect(() => {
    if (!cloudsContainerRef.current) return;

    // Clouds disappear after troposphere (around 10-12km)
    const maxCloudHeight = 10000;

    // Calculate opacity based on height
    let opacity = 1;

    if (currentHeight > maxCloudHeight) {
      opacity = 0;
    } else if (currentHeight > maxCloudHeight - 2000) {
      // Fade out the clouds as we approach the stratosphere
      opacity = 1 - ((currentHeight - (maxCloudHeight - 2000)) / 2000);
    }

    // Apply the opacity
    gsap.to(cloudsContainerRef.current, {
      opacity,
      duration: 1
    });
  }, [currentHeight]);

  return (
    <div
      ref={cloudsContainerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default Clouds;
