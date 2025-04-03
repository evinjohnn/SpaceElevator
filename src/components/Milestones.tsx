import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MilestonesProps {
  currentHeight: number;
}

interface MilestoneData {
  name: string;
  description: string;
  height: number;
  position: 'left' | 'right';
  icon?: string;
}

const Milestones: React.FC<MilestonesProps> = ({ currentHeight }) => {
  const milestonesRef = useRef<HTMLDivElement>(null);

  // Define all the milestones
  const milestones: MilestoneData[] = [
    {
      name: "Hummingbird",
      description: "Low altitude flyer",
      height: 5,
      position: "left",
    },
    {
      name: "Fireworks",
      description: "Typical maximum height",
      height: 150,
      position: "right",
    },
    {
      name: "Hot Air Balloon",
      description: "Typical cruising altitude",
      height: 1000,
      position: "right",
    },
    {
      name: "Mallard",
      description: "Migration altitude",
      height: 2000,
      position: "left",
    },
    {
      name: "Bar-headed Goose",
      description: "Highest flying bird",
      height: 8000,
      position: "left",
    },
    {
      name: "Mount Everest Peak",
      description: "Earth's highest point",
      height: 8849,
      position: "right",
    },
    {
      name: "Commercial Airliner",
      description: "Cruising altitude",
      height: 10000,
      position: "right",
    },
    {
      name: "Rüppell's Griffon Vulture",
      description: "Highest flying bird",
      height: 11300,
      position: "right",
    },
    {
      name: "Vega 5b",
      description: "Amelia Earhart's plane",
      height: 12200,
      position: "left",
    },
    {
      name: "SR-71 Blackbird",
      description: "Altitude record for jet aircraft",
      height: 25900,
      position: "right",
    },
    {
      name: "Weather Balloon",
      description: "Maximum altitude",
      height: 40000,
      position: "left",
    },
    {
      name: "Felix Baumgartner Jump",
      description: "Red Bull Stratos",
      height: 39045,
      position: "right",
    },
    {
      name: "Space Shuttle",
      description: "Typical orbital altitude",
      height: 400000,
      position: "left",
    },
    {
      name: "International Space Station",
      description: "Orbital altitude",
      height: 420000,
      position: "right",
    },
    {
      name: "Hubble Space Telescope",
      description: "Orbital altitude",
      height: 540000,
      position: "left",
    },
    {
      name: "GOES Weather Satellites",
      description: "Geostationary orbit",
      height: 35786000,
      position: "right",
    },
    {
      name: "Moon",
      description: "Average distance from Earth",
      height: 384400000,
      position: "left",
    }
  ];

  // Set up milestone visibility based on current height
  useEffect(() => {
    // Determine which milestones should be visible
    // Using for...of instead of forEach for better performance
    for (const milestone of milestones) {
      const milestoneElement = document.getElementById(`milestone-${milestone.height}`);

      if (milestoneElement) {
        // Show milestones that are below the current height (with some buffer for animations)
        // We add a 1000m buffer to make milestones appear a bit before reaching their height
        const shouldBeVisible = currentHeight >= milestone.height - 1000;

        // Animate visibility
        gsap.to(milestoneElement, {
          opacity: shouldBeVisible ? 1 : 0,
          y: shouldBeVisible ? 0 : 20,
          duration: 0.5,
          onComplete: () => {
            if (!shouldBeVisible) {
              milestoneElement.style.display = 'none';
            }
          },
          onStart: () => {
            if (shouldBeVisible) {
              milestoneElement.style.display = 'flex';
            }
          }
        });
      }
    }
  }, [currentHeight]); // milestones is defined in the component and doesn't change

  return (
    <div ref={milestonesRef} className="absolute top-0 left-0 w-full">
      {milestones.map((milestone) => {
        // Calculate the visual position (the higher the milestone, the lower it appears in the scroll)
        // This maps the milestone heights to screen positions
        const visualPosition = 100 - ((milestone.height / 36000000) * 100);

        // Don't render milestones that would be positioned below 0% or above 100%
        if (visualPosition < 0 || visualPosition > 100) return null;

        return (
          <div
            key={milestone.height}
            id={`milestone-${milestone.height}`}
            className={`fixed ${milestone.position === 'left' ? 'left-32' : 'right-32'} opacity-0 flex items-center`}
            style={{
              top: `${visualPosition}vh`,
              display: 'none',
            }}
          >
            <div className={`${milestone.position === 'right' ? 'order-1' : 'order-2'} p-4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center mx-4`}>
              <h3 className="text-lg font-bold">{milestone.name}</h3>
              <p className="text-sm text-gray-600">{milestone.description}</p>
            </div>

            {/* Line connecting to the center */}
            <div className={`h-0.5 ${milestone.position === 'left' ? 'order-1' : 'order-2'} bg-gray-400`} style={{ width: '50px' }} />

            {/* This would be where the icon/image goes */}
            <div className={`${milestone.position === 'right' ? 'order-3' : 'order-1'} w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-2`}>
              {/* Icon placeholder - would be replaced with actual icons */}
              <span className="text-xl">🌠</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Milestones;
