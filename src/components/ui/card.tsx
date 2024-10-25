import * as React from "react";

const Card = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-lg border bg-white shadow-sm ${className || ''}`}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col p-6 ${className || ''}`}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`p-6 pt-0 ${className || ''}`}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardContent };
