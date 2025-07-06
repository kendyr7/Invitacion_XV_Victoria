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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Reset animation after it completes
          setTimeout(() => {
            setIsVisible(false);
          }, 3000);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("mb-4 sm:mb-6 text-center", className)}
    >
      {/* First Name - Victoria */}
      <p className={cn(
        "font-great-vibes text-9xl sm:text-9xl text-primary transition-all duration-1500 ease-out",
        isVisible ? "animate-victoriaSlideIn" : "opacity-0 translate-x-[-100%] scale-90"
      )}>
        {firstName}
      </p>
      
      {/* Last Name - Pérez */}
      <p className={cn(
        "font-great-vibes text-8xl sm:text-9xl text-secondary transition-all duration-1500 ease-out",
        isVisible ? "animate-perezSlideIn" : "opacity-0 translate-x-[100%] scale-90"
      )}>
        {lastName}
      </p>

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