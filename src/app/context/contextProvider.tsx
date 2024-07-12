'use client'
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface responseContextType {
  response: string | null;
  setResponse: (response: string | null) => void;
}

// Create the context with a default value
const ResponseContext = createContext<responseContextType | undefined>(undefined);

interface responseProviderProps {
  children: ReactNode;
}

// Create a provider component
const ResponseProvider: React.FC<responseProviderProps> = ({ children }) => {
  const [response, setResponse] = useState<string | null>(null);

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};

export { ResponseContext, ResponseProvider };
