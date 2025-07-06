"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft: TimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return newTimeLeft;
    };
    
    setTimeLeft(calculateTimeLeft()); // Initial calculation

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  if (!isClient) {
    // Render placeholder or skeleton on server/initial client render
    return (
      <div className="inline-block text-center animate-in fade-in duration-1000 delay-500">
        <span className="inline-block mx-3 sm:mx-4">
          <span className="text-3xl sm:text-5xl font-bold text-foreground animate-pulse">--</span>
          <span className="text-xs sm:text-sm text-foreground uppercase tracking-wider ml-1">Loading...</span>
        </span>
        <span className="inline-block mx-3 sm:mx-4">
          <span className="text-3xl sm:text-5xl font-bold text-foreground animate-pulse">--</span>
          <span className="text-xs sm:text-sm text-foreground uppercase tracking-wider ml-1">Loading...</span>
        </span>
        <span className="inline-block mx-3 sm:mx-4">
          <span className="text-3xl sm:text-5xl font-bold text-foreground animate-pulse">--</span>
          <span className="text-xs sm:text-sm text-foreground uppercase tracking-wider ml-1">Loading...</span>
        </span>
        <span className="inline-block mx-3 sm:mx-4">
          <span className="text-3xl sm:text-5xl font-bold text-foreground animate-pulse">--</span>
          <span className="text-xs sm:text-sm text-foreground uppercase tracking-wider ml-1">Loading...</span>
        </span>
      </div>
    );
 }
  
  const timerComponents = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ];

  return (
    <div className="inline-block text-center animate-in fade-in duration-1000 delay-500 w-full text-visible">
      {timerComponents.map((component, index) => (
        component.value !== undefined && (
          <span key={index} className="inline-block mx-4 sm:mx-4 transform transition-all hover:scale-110">
            <span className="text-3xl sm:text-5xl font-headline font-bold bg-gradient-to-r from-decorative-gradientFrom to-decorative-gradientTo text-transparent bg-clip-text text-visible">
              {String(component.value).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm text-foreground uppercase tracking-wider font-body text-visible font-bold ml-1">
              {component.label}
            </span>
          </span>
        )
      ))}
    </div>
  );
};

export default CountdownTimer;

    
