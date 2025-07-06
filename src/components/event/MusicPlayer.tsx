"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  audioSrc: string;
  className?: string;
  autoPlay?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioSrc, className, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current) {
      console.warn("Audio player not initialized yet or audioSrc is invalid.");
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        if (audioRef.current.readyState === 0) {
            console.warn("Audio source not ready (readyState is 0). Attempting to load...");
            audioRef.current.load();
        }
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error caught during play():", error);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (typeof window !== "undefined" && audioSrc && isClient) {
      const audio = new Audio(audioSrc);
      audio.preload = "metadata";
      audio.loop = false;
      audioRef.current = audio;
      hasAutoPlayed.current = false;

      const handleCanPlay = async () => {
        if (audioRef.current && autoPlay && !hasAutoPlayed.current) {
          hasAutoPlayed.current = true;
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            console.error("Autoplay was prevented by the browser.", error);
            setIsPlaying(false);
          }
        }
      };
      
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      };

      const handleErrorEvent = (e: Event) => {
        console.error("Audio element error event:", e);
        if (audioRef.current?.error) {
          console.error("Audio error code:", audioRef.current.error.code, "message:", audioRef.current.error.message);
        }
        setIsPlaying(false);
      };
      
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleErrorEvent);

      audio.load();

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleErrorEvent);
        audio.pause();
        audioRef.current = null;
      };
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
      if (isClient && !audioSrc) {
        console.warn('MusicPlayer: audioSrc is not provided.');
      }
    }
  }, [audioSrc, isClient, autoPlay]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!isClient) {
    return <div className={cn("w-full max-w-xs mx-auto py-4", className)}>Loading player...</div>; 
  }

  return (
    <div className={cn("w-full max-w-xs mx-auto py-3 flex flex-col items-center space-y-3", className)}>
      <div className="flex items-center justify-center w-full">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={togglePlayPause} 
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-14 w-14 border-2 border-accent shadow-lg"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          disabled={!audioSrc || duration === 0 && !isPlaying}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1"/>}
        </Button>
      </div>
      
      <div className="w-full space-y-2">
        <Slider
          value={[currentTime]}
          max={duration > 0 ? duration : 100}
          step={1}
          onValueChange={handleSeek}
          className="w-full [&>span:first-child>span]:bg-primary [&>span:last-child]:bg-primary [&>span:last-child]:border-primary [&>span:last-child]:h-4 [&>span:last-child]:w-4 [&>span:last-child]:-top-1"
          aria-label="Music progress"
          disabled={duration === 0}
        />
        {(duration > 0 || currentTime > 0) && (
          <div className="text-xs text-accent font-medium w-full flex justify-between px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        )}
      </div>
      
      {audioRef.current?.error && (
        <div className="text-xs text-destructive text-center">
          Audio could not be loaded.
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
