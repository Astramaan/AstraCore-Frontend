
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClientHeader } from '@/components/client-header';
import { Play, Pause, Maximize, Minimize, Rewind, FastForward, Volume2, VolumeX, Camera, Video as VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const cameraFeeds = {
    'Onsite Camera': [
        { name: 'Main Gate', src: '/video/Live.mp4' },
        { name: 'Block A', src: '/video/Live-2.mp4' },
        { name: 'Yard', src: '/video/Live.mp_4' },
        { name: 'Terrace', src: '/video/Live-2.mp_4' },
    ],
    'Drones': [
        { name: 'Drone 1 (Alpha)', src: '/video/Live-2.mp4' },
        { name: 'Drone 2 (Beta)', src: '/video/Live.mp4' },
    ]
};

type CameraType = 'Onsite Camera' | 'Drones';

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

  const [activeCameraType, setActiveCameraType] = useState<CameraType>('Onsite Camera');
  const [activeCamera, setActiveCamera] = useState(cameraFeeds[activeCameraType][0]);


  useEffect(() => {
    const video = videoRef.current;
    if (video) {
        video.src = activeCamera.src;
        video.muted = isMuted; 
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
  }, [activeCamera, isMuted]);
  
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
  }, [isControlsVisible]);

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
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handleCameraTypeChange = (type: CameraType) => {
    setActiveCameraType(type);
    setActiveCamera(cameraFeeds[type][0]);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-8">
        <main className="flex-1 space-y-6">
            <Card className="rounded-[50px] overflow-hidden">
            <CardContent className="p-0">
                <div ref={containerRef} className="aspect-video bg-black relative group/video">
                <video
                    ref={videoRef}
                    className="w-full h-full cursor-pointer"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onClick={togglePlayPause}
                    key={activeCamera.src}
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
        </main>
        <aside className="lg:w-[400px] flex-shrink-0">
            <div className="flex bg-zinc-100 rounded-full p-1 mb-6">
                <Button 
                    onClick={() => handleCameraTypeChange('Onsite Camera')} 
                    className={cn('flex-1 rounded-full text-base h-12', activeCameraType === 'Onsite Camera' ? 'bg-primary text-white' : 'bg-transparent text-black hover:bg-white')}
                >
                    <Camera className="mr-2 h-5 w-5"/>
                    Onsite Camera
                </Button>
                <Button 
                    onClick={() => handleCameraTypeChange('Drones')}
                    className={cn('flex-1 rounded-full text-base h-12', activeCameraType === 'Drones' ? 'bg-primary text-white' : 'bg-transparent text-black hover:bg-white')}
                >
                    <VideoIcon className="mr-2 h-5 w-5"/>
                    Drones
                </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-3">
                    {cameraFeeds[activeCameraType].map(camera => (
                        <Card 
                            key={camera.name} 
                            className={cn(
                                'rounded-full p-3 cursor-pointer transition-colors', 
                                activeCamera.name === camera.name ? 'bg-primary/10 border-primary' : 'bg-white'
                            )}
                            onClick={() => setActiveCamera(camera)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
                                        <Camera className="w-6 h-6 text-zinc-500" />
                                     </div>
                                     <p className="font-medium">{camera.name}</p>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-4"/>
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </aside>
      </div>
    </>
  );
}

    