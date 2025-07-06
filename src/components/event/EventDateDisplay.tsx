"use client";

import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EventDateDisplayProps {
  monthName: string;
  dayName: string;
  dayNumber: string;
  year: string;
  time?: string;
  className?: string;
}

const EventDateDisplay: FC<EventDateDisplayProps> = ({
  monthName,
  dayName,
  dayNumber,
  year,
  time = "7:00 PM",
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
          }, 2500);
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
      className={cn("flex flex-col items-center text-center w-full max-w-xs mx-auto text-gray-700 text-visible", className)}
    >
      
      {/* MONTH - Aparece primero con efecto de deslizamiento desde arriba */}
      <p className={cn(
        "uppercase tracking-widest text-base sm:text-lg font-body mb-2 transition-all duration-1000 ease-out",
        isVisible ? "animate-fadeInSlideDown" : "opacity-0 translate-y-[-30px] scale-75"
      )}>
        {monthName}
      </p>

      {/* MIDDLE ROW */}
      <div className="flex items-center justify-between w-full">
        {/* LEFT - DAY NAME with LINES - Aparece desde la izquierda */}
        <div className={cn(
          "flex-1 flex flex-col items-center transition-all duration-1200 ease-out",
          isVisible ? "animate-fadeInSlideLeft" : "opacity-0 translate-x-[-40px] scale-90"
        )}>
          <div className={cn(
            "w-full border-t border-gray-400 mb-1 transition-all duration-800 ease-out",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}></div>
          <p className={cn(
            "uppercase text-sm sm:text-base font-body text-visible transition-all duration-800 ease-out",
            isVisible ? "animate-fadeInScale" : "opacity-0 scale-80"
          )}>{dayName}</p>
          <div className={cn(
            "w-full border-t border-gray-400 mt-1 transition-all duration-800 ease-out",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}></div>
        </div>

        {/* CENTER - DATE NUMBER - Aparece con efecto de zoom y rebote */}
        <div className={cn(
          "px-4 transition-all duration-1500 ease-out",
          isVisible ? "animate-fadeInZoomBounce" : "opacity-0 scale-30 rotate-[-10deg]"
        )}>
          <p className="text-6xl sm:text-7xl font-headline text-primary text-visible">
            {dayNumber}
          </p>
        </div>

        {/* RIGHT - YEAR with LINES - Aparece desde la derecha */}
        <div className={cn(
          "flex-1 flex flex-col items-center transition-all duration-1200 ease-out",
          isVisible ? "animate-fadeInSlideRight" : "opacity-0 translate-x-[40px] scale-90"
        )}>
          <div className={cn(
            "w-full border-t border-gray-400 mb-1 transition-all duration-800 ease-out",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}></div>
          <p className={cn(
            "text-sm sm:text-base font-body text-visible transition-all duration-800 ease-out",
            isVisible ? "animate-fadeInScale" : "opacity-0 scale-80"
          )}>{year}</p>
          <div className={cn(
            "w-full border-t border-gray-400 mt-1 transition-all duration-800 ease-out",
            isVisible ? "animate-fadeIn" : "opacity-0"
          )}></div>
        </div>
      </div>

      {/* TIME - Aparece último con efecto de deslizamiento desde abajo */}
      <p className={cn(
        "uppercase tracking-wide text-sm sm:text-base font-body mt-3 transition-all duration-1000 ease-out",
        isVisible ? "animate-fadeInSlideUp" : "opacity-0 translate-y-[30px] scale-75"
      )}>
        {time}
      </p>

      <style jsx>{`
        .animate-fadeInSlideDown {
          animation: fadeInSlideDown 1s ease-out forwards;
        }

        .animate-fadeInSlideLeft {
          animation: fadeInSlideLeft 1.2s ease-out 0.2s forwards;
        }

        .animate-fadeInSlideRight {
          animation: fadeInSlideRight 1.2s ease-out 0.2s forwards;
        }

        .animate-fadeInZoomBounce {
          animation: fadeInZoomBounce 1.5s ease-out 0.4s forwards;
        }

        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 1s ease-out 0.6s forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out forwards;
        }

        @keyframes fadeInSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-30px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInSlideLeft {
          0% {
            opacity: 0;
            transform: translateX(-40px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes fadeInSlideRight {
          0% {
            opacity: 0;
            transform: translateX(40px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes fadeInZoomBounce {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes fadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default EventDateDisplay;
