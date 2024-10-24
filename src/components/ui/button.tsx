import React, { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 font-semibold rounded transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
