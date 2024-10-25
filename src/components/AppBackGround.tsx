import React from "react";
import { AppBackgroundProps } from "../types";

export const AppBackground = ({ children }: AppBackgroundProps) => (
  <div className="min-h-screen p-2 md:p-4 relative overflow-x-hidden bg-gray-50">
    <div className="relative z-10 max-w-full md:max-w-[1400px] mx-auto px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-8">
        {children}
      </div>
    </div>
  </div>
);
