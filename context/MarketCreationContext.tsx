import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { MarketCreate } from '@/types/models';

// export interface Outcome {
//   yes: string;
//   yesDescription: string;
//   no: string;
//   noDescription: string;
//   source: string;
// }

// export interface MarketData {
//   tier: string;
//   title: string;
//   description: string;
//   outcomes: Outcome;
// }

interface MarketCreationContextType {
  marketData: MarketCreate;
  updateMarketData: (data: Partial<MarketCreate>) => void;
  resetMarketData: () => void;
}

const initialMarketData: MarketCreate = {
  tier: '',
  title: '',
  description: '',
  metadata: {
    yes: '',
    yesDescription: '',
    no: '',
    noDescription: '',
    source: ''
  },
  end_time: '',
  resolution_time: '',
  creator_fee_percentage: 0,
  platform_fee_percentage: 0
};

export const MarketCreationContext = createContext<MarketCreationContextType>({
  marketData: initialMarketData,
  updateMarketData: () => {},
  resetMarketData: () => {}
});

interface ProviderProps {
  children: ReactNode;
}

export function MarketCreationProvider({ children }: ProviderProps): JSX.Element {
  const [marketData, setMarketData] = useState<MarketCreate>(initialMarketData);

  const updateMarketData = (data: Partial<MarketCreate>) => {
    setMarketData(prev => ({ ...prev, ...data }));
  };

  const resetMarketData = () => {
    setMarketData(initialMarketData);
  };

  return (
    <MarketCreationContext.Provider value={{ marketData, updateMarketData, resetMarketData }}>
      {children}
    </MarketCreationContext.Provider>
  );
}

export function useMarketCreation(): MarketCreationContextType {
  const context = useContext(MarketCreationContext);
  if (!context) {
    throw new Error('useMarketCreation must be used within a MarketCreationProvider');
  }
  return context;
} 