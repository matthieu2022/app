import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyle = "px-4 py-2 rounded-lg";
    const variantStyle = {
      default: "bg-white text-gray-800 border hover:bg-gray-50",
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    };

    const finalClassName = `${baseStyle} ${variantStyle[variant]} ${className || ''}`;

    return (
      <button
        className={finalClassName}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
