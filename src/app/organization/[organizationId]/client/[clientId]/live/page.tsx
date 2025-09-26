
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClientHeader } from '@/components/client-header';
import { Play, Pause, Maximize, Minimize, Rewind, FastForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export default function LivePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  let controlsTimeout: NodeJS.Timeout;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Start muted
      video.play().catch(error => {
        setIsPlaying(false);
        console.error("Autoplay was prevented: ", error)
      });
      setIsPlaying(true);

      const handleTimeUpdate = () => setProgress((video.currentTime / video.duration) * 100);
      const handleLoadedMetadata = () => setDuration(video.duration);

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);
  
  const handleMouseMove = () => {
    setIsControlsVisible(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => setIsControlsVisible(false), 3000);
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        clearTimeout(controlsTimeout);
        setIsControlsVisible(false);
      });
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', () => clearTimeout(controlsTimeout));
      }
      clearTimeout(controlsTimeout);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };
  
  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if(video) {
      video.currentTime = (value / 100) * video.duration;
      setProgress(value);
    }
  }

  const handleSeekRelative = (seconds: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += seconds;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };
  
  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (video) {
        video.volume = value / 100;
        setVolume(value);
        if (value > 0 && video.muted) {
            video.muted = false;
            setIsMuted(false);
        } else if (value === 0) {
            video.muted = true;
            setIsMuted(true);
        }
    }
  };

  const toggleFullScreen = () => {
    const container = containerRef.current;
    if (container) {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
            setIsFullScreen(true);
        } else {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4">
        <ClientHeader />
      </header>
      <div className="p-4 md:p-8">
        <div className="text-center mb-4">
          <p className="text-lg text-muted-foreground">We are working on the Live Footage.</p>
        </div>
        <Card className="rounded-[50px] overflow-hidden">
          <CardContent className="p-0">
            <div ref={containerRef} className="aspect-video bg-black relative group/video">
              <video
                ref={videoRef}
                className="w-full h-full cursor-pointer"
                src="/video/Live.mp4"
                autoPlay
                muted
                loop
                playsInline
                onClick={togglePlayPause}
              />
              <div 
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300",
                  isControlsVisible ? "opacity-100" : "opacity-0"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                  <div className="flex items-center gap-4 text-white">
                      <span className="text-xs">{formatTime(videoRef.current?.currentTime || 0)}</span>
                       <Slider
                          value={[progress]}
                          onValueChange={(value) => handleSeek(value[0])}
                          max={100}
                          step={0.1}
                          className="w-full cursor-pointer"
                        />
                      <span className="text-xs">{formatTime(duration)}</span>
                  </div>
                 <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleSeekRelative(-10)}><Rewind/></Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlayPause}>
                            {isPlaying ? <Pause /> : <Play />}
                        </Button>
                         <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleSeekRelative(10)}><FastForward/></Button>
                         <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                           {isMuted ? <VolumeX /> : <Volume2 />}
                        </Button>
                         <Slider
                            value={[isMuted ? 0 : volume]}
                            onValueChange={(value) => handleVolumeChange(value[0])}
                            max={100}
                            step={1}
                            className="w-24 cursor-pointer"
                          />
                    </div>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullScreen}>
                        {isFullScreen ? <Minimize /> : <Maximize />}
                    </Button>
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
