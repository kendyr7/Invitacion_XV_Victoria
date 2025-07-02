"use client";

import type { FC } from "react";
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
  return (
    <div className={cn("flex flex-col items-center text-center w-full max-w-xs mx-auto text-gray-700", className)}>
      
      {/* MONTH */}
      <p className="uppercase tracking-widest text-base sm:text-lg font-body mb-2 animate-in slide-in-from-top-2 duration-700 delay-300 fill-mode-forwards">
        {monthName}
      </p>

      {/* MIDDLE ROW */}
      <div className="flex items-center justify-between w-full">
        {/* LEFT - DAY NAME with LINES */}
        <div className="flex-1 flex flex-col items-center animate-in slide-in-from-left-4 duration-700 delay-500 fill-mode-forwards">
          <div className="w-full border-t border-gray-400 mb-1 animate-in fade-in duration-1000 delay-600"></div>
          <p className="uppercase text-sm sm:text-base font-body">{dayName}</p>
          <div className="w-full border-t border-gray-400 mt-1 animate-in fade-in duration-1000 delay-700"></div>
        </div>

        {/* CENTER - DATE NUMBER */}
        <div className="px-4 animate-in zoom-in-95 duration-800 delay-400 fill-mode-forwards">
          <p className="text-6xl sm:text-7xl font-headline text-primary-900 animate-in bounce-in duration-1000 delay-600 fill-mode-forwards">
            {dayNumber}
          </p>
        </div>

        {/* RIGHT - YEAR with LINES */}
        <div className="flex-1 flex flex-col items-center animate-in slide-in-from-right-4 duration-700 delay-500 fill-mode-forwards">
          <div className="w-full border-t border-gray-400 mb-1 animate-in fade-in duration-1000 delay-600"></div>
          <p className="text-sm sm:text-base font-body">{year}</p>
          <div className="w-full border-t border-gray-400 mt-1 animate-in fade-in duration-1000 delay-700"></div>
        </div>
      </div>

      {/* TIME */}
      <p className="uppercase tracking-wide text-sm sm:text-base font-body mt-3 animate-in slide-in-from-bottom-2 duration-700 delay-800 fill-mode-forwards">
        {time}
      </p>
    </div>
  );
};

export default EventDateDisplay;
