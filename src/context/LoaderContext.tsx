"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0">
                    <div className="w-full h-full border-4 border-orange-500/20 rounded-full" />
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full animate-spin border-t-transparent" />
                  </div>
                </div>
              </div>
              <p className="text-white text-lg">Cargando...</p>
            </div>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader debe ser usado dentro de un LoaderProvider');
  }
  return context;
} 