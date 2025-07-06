"use client";
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react'; 

interface LocationButton {
  text: string;
  url: string;
  icon?: ReactNode;
}

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  locationButton?: LocationButton;
  locationButtons?: LocationButton[];
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  animationDelay?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, icon, children, locationButton, locationButtons, className, titleClassName, contentClassName, animationDelay }) => {
  const handleLocationClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Use locationButtons if provided, otherwise fall back to single locationButton
  const buttons = locationButtons || (locationButton ? [locationButton] : []);

  return (
    <Card 
      className={`w-full max-w-md bg-transparent border-none shadow-none animate-in fade-in duration-700 mx-auto ${className}`} 
      style={{ animationDelay: animationDelay }}
    >
      <CardHeader className="pb-3 pt-5">
        <CardTitle className={`font-headline text-2xl sm:text-3xl text-primary flex items-center justify-center text-center ${titleClassName}`}>
          {icon && <span className="mr-3 text-accent">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={`font-body text-base sm:text-lg text-foreground/90 space-y-2 text-center ${contentClassName}`}>
        {children}
        {buttons.length > 0 && (
          <div className="mt-4 text-center space-y-2">
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleLocationClick(button.url)}
                variant="outline"
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary hover:border-primary/90 mx-1"
              >
                {button.icon || <MapPin className="mr-2 h-4 w-4" />}
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionCard;

    