import React, { ReactNode } from 'react';

interface AppBackgroundProps {
  children: ReactNode;
}

export function AppBackground({ children }: AppBackgroundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {children}
    </div>
  );
}
