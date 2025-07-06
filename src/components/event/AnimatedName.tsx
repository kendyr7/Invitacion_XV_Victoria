"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNameProps {
  firstName: string;
  lastName: string;
  className?: string;
}

const AnimatedName: React.FC<AnimatedNameProps> = ({
  firstName,
  lastName,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animar solo una vez al montar
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={cn("mb-4 sm:mb-6 text-center relative w-full overflow-visible", className)}
    >
      <div className="flex flex-col items-center w-full">
        {/* First Name - Victoria */}
        <p className={cn(
          "block w-full text-center font-great-vibes text-9xl sm:text-9xl text-primary transition-all duration-1500 ease-out relative z-0",
          isVisible ? "animate-victoriaSlideIn" : "opacity-0 translate-x-[-100%] scale-90"
        )}>
          {firstName}
        </p>
        {/* Last Name - Pérez */}
        <p className={cn(
          "block w-full text-center font-great-vibes text-8xl sm:text-9xl bg-gradient-to-r from-decorative-gradientFrom to-decorative-gradientTo text-transparent bg-clip-text transition-all duration-1500 ease-out leading-[1.1] pt-4 pb-2 overflow-visible break-words z-10",
          isVisible ? "animate-perezSlideIn" : "opacity-0 translate-x-[100%] scale-90"
        )}>
          {lastName}
        </p>
      </div>

      <style jsx>{`
        .animate-victoriaSlideIn {
          animation: victoriaSlideIn 1.5s ease-out forwards;
        }

        .animate-perezSlideIn {
          animation: perezSlideIn 1.5s ease-out 0.8s forwards;
        }

        @keyframes victoriaSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-100%) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-20%) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes perezSlideIn {
          0% {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateX(20%) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedName; 