import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { soundEngine } from '../services/audioEngine';

interface AudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playHover: () => void;
  playThemeSwitch: () => void;
  playTerminalKey: () => void;
  playTerminalOpen: () => void;
  playSuccess: () => void;
}

const AudioContext = createContext<AudioContextType>({
  soundEnabled: true,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
  playThemeSwitch: () => {},
  playTerminalKey: () => {},
  playTerminalOpen: () => {},
  playSuccess: () => {},
});

export function AudioProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => soundEngine.isEnabled());

  const toggleSound = () => {
    const nextState = soundEngine.toggle();
    setSoundEnabled(nextState);
  };

  const playClick = () => soundEngine.playClick();
  const playHover = () => soundEngine.playHover();
  const playThemeSwitch = () => soundEngine.playThemeSwitch();
  const playTerminalKey = () => soundEngine.playTerminalKey();
  const playTerminalOpen = () => soundEngine.playTerminalOpen();
  const playSuccess = () => soundEngine.playSuccess();

  // Global listener for automatic subtle audio feedback on interactive elements
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('button, a, [role="button"], input[type="checkbox"], input[type="radio"]');
      if (target) {
        soundEngine.playClick();
      }
    };

    const handleGlobalHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('button, a, [role="button"]');
      if (target) {
        soundEngine.playHover();
      }
    };

    document.addEventListener('click', handleGlobalClick, { passive: true });
    document.addEventListener('mouseover', handleGlobalHover, { passive: true });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('mouseover', handleGlobalHover);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick,
        playHover,
        playThemeSwitch,
        playTerminalKey,
        playTerminalOpen,
        playSuccess,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
