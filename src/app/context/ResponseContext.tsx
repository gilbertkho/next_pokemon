'use client'
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context data
export interface responseContextType {
  responseResult: object | null;
  setResponseResult: (response: any | null) => void;
}

// Create the context with a default value
const ResponseContext = createContext<responseContextType | undefined>(undefined);

interface responseProviderProps {
  children: ReactNode;
}

// Create a provider component
const ResponseProvider: React.FC<responseProviderProps> = ({ children }) => {
  const [responseResult, setResponseResult] = useState<object | null>(null);

  return (
    <ResponseContext.Provider value={{ responseResult, setResponseResult }}>
      {children}
    </ResponseContext.Provider>
  );
};

export { ResponseContext, ResponseProvider };
