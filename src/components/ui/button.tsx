import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className = '', onClick }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 font-semibold rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};