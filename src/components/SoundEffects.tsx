import { useEffect, useRef } from 'react';

interface SoundEffectsProps {
  currentHeight: number;
  isMuted: boolean;
}

const SoundEffects: React.FC<SoundEffectsProps> = ({ currentHeight, isMuted }) => {
  const prevHeightRef = useRef<number>(0);
  const milestoneSoundRef = useRef<HTMLAudioElement | null>(null);
  const atmosphereChangeSoundRef = useRef<HTMLAudioElement | null>(null);
  const spaceReachedSoundRef = useRef<HTMLAudioElement | null>(null);
  const playedAtmosphereChangesRef = useRef<Record<string, boolean>>({});
  const playedMilestonesRef = useRef<Record<number, boolean>>({});

  // Define important milestones that should trigger sounds
  const keyMilestones = [
    1000,    // Hot Air Balloon
    8849,    // Mount Everest
    10000,   // Commercial Airline
    100000,  // Edge of Space (Kármán Line)
    400000,  // Space Shuttle
    420000,  // ISS
    35786000 // Geostationary orbit
  ];

  // Define atmosphere transitions
  const atmosphereTransitions = [
    { name: "troposphere-stratosphere", height: 12000 },
    { name: "stratosphere-mesosphere", height: 50000 },
    { name: "mesosphere-thermosphere", height: 85000 },
    { name: "thermosphere-exosphere", height: 500000 },
    { name: "exosphere-space", height: 10000000 }
  ];

  // Initialize audio elements
  useEffect(() => {
    milestoneSoundRef.current = new Audio('/sounds/milestone.mp3');
    atmosphereChangeSoundRef.current = new Audio('/sounds/atmosphere-change.mp3');
    spaceReachedSoundRef.current = new Audio('/sounds/space-reached.mp3');

    // Set volumes
    if (milestoneSoundRef.current) milestoneSoundRef.current.volume = 0.5;
    if (atmosphereChangeSoundRef.current) atmosphereChangeSoundRef.current.volume = 0.6;
    if (spaceReachedSoundRef.current) spaceReachedSoundRef.current.volume = 0.7;

    return () => {
      // Clean up
      milestoneSoundRef.current = null;
      atmosphereChangeSoundRef.current = null;
      spaceReachedSoundRef.current = null;
    };
  }, []);

  // Play sounds based on height changes
  useEffect(() => {
    if (isMuted) return;

    const prevHeight = prevHeightRef.current;
    prevHeightRef.current = currentHeight;

    // Check if we've crossed any key milestones
    for (const milestone of keyMilestones) {
      if (prevHeight < milestone && currentHeight >= milestone) {
        // We've just reached this milestone
        if (!playedMilestonesRef.current[milestone]) {
          playedMilestonesRef.current[milestone] = true;

          // Special sound for space (100km)
          if (milestone === 100000) {
            spaceReachedSoundRef.current?.play();
          } else {
            // Clone the audio element to allow overlapping sounds
            if (milestoneSoundRef.current) {
              const milestoneSound = milestoneSoundRef.current.cloneNode() as HTMLAudioElement;
              milestoneSound.volume = 0.5;
              milestoneSound.play();
            }
          }
        }
      }
    }

    // Check if we've crossed any atmosphere transitions
    for (const transition of atmosphereTransitions) {
      if (prevHeight < transition.height && currentHeight >= transition.height) {
        // We've just crossed this atmospheric boundary
        if (!playedAtmosphereChangesRef.current[transition.name]) {
          playedAtmosphereChangesRef.current[transition.name] = true;

          // Clone the audio element to allow overlapping sounds
          if (atmosphereChangeSoundRef.current) {
            const atmosphereSound = atmosphereChangeSoundRef.current.cloneNode() as HTMLAudioElement;
            atmosphereSound.volume = 0.6;
            atmosphereSound.play();
          }
        }
      }
    }
  }, [currentHeight, isMuted]);

  // Reset played milestones if height decreases significantly (user scrolled back down)
  useEffect(() => {
    const prevHeight = prevHeightRef.current;

    // If we've gone back down significantly, reset milestone tracking
    if (prevHeight - currentHeight > 5000) {
      playedMilestonesRef.current = {};
      playedAtmosphereChangesRef.current = {};
    }
  }, [currentHeight]);

  // This component doesn't render anything
  return null;
};

export default SoundEffects;
