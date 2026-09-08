import { createContext, useContext, useState, ReactNode } from 'react';

interface PowerModeContextType {
  powerSaving: boolean;
  togglePowerSaving: () => void;
}

const PowerModeContext = createContext<PowerModeContextType>({
  powerSaving: false,
  togglePowerSaving: () => {},
});

export function PowerModeProvider({ children }: { children: ReactNode }) {
  const [powerSaving, setPowerSaving] = useState(false);
  const togglePowerSaving = () => setPowerSaving(prev => !prev);
  
  return (
    <PowerModeContext.Provider value={{ powerSaving, togglePowerSaving }}>
      {children}
    </PowerModeContext.Provider>
  );
}

export const usePowerMode = () => useContext(PowerModeContext);
