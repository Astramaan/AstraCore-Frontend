"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Pause,
  Maximize,
  Minimize,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Camera,
  Video as VideoIcon,
  PanelRightOpen,
  PanelRightClose,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { ProjectTimelineChart } from "@/components/charts/project-timeline-chart";
import { Progress } from "@/components/ui/progress";
import SnagListIcon from "@/components/icons/snag-list-icon";

const cameraFeeds = {
  "Onsite Camera": [
    {
      name: "Main Gate",
      src: "https://images.unsplash.com/photo-1593786267440-550458cc882a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxIb3VzZSUyMGNvbnN0cnVjdGlvbnxlbnwwfHx8fDE3NTkwNDU4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    { name: "Block A", src: "https://picsum.photos/seed/blocka/1920/1080" },
    { name: "Yard", src: "https://picsum.photos/seed/yard/1920/1080" },
    { name: "Terrace", src: "https://picsum.photos/seed/terrace/1920/1080" },
  ],
  Drones: [
    {
      name: "Drone 1 (Alpha)",
      src: "https://picsum.photos/seed/drone1/1920/1080",
    },
    {
      name: "Drone 2 (Beta)",
      src: "https://picsum.photos/seed/drone2/1920/1080",
    },
  ],
};

type CameraType = "Onsite Camera" | "Drones";

const MetricCard = ({
  title,
  value,
  footer,
}: {
  title: string;
  value: string;
  footer: string;
}) => (
  <Card className="rounded-[50px] relative bg-white/20 backdrop-blur-lg border-white/30 text-white p-6">
    <p className="text-sm text-white/80">{title}</p>
    <p className="text-4xl font-bold">{value}</p>
    <p className="text-sm text-white/80 mt-2">{footer}</p>
  </Card>
);

export default function LivePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [activeCameraType, setActiveCameraType] =
    useState<CameraType>("Onsite Camera");
  const [activeCamera, setActiveCamera] = useState(
    cameraFeeds[activeCameraType][0],
  );

  let controlsTimeout: NodeJS.Timeout;

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => setIsControlsVisible(false), 3000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => {
        clearTimeout(controlsTimeout);
        setIsControlsVisible(false);
      });
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", () =>
          clearTimeout(controlsTimeout),
        );
      }
      clearTimeout(controlsTimeout);
    };
  }, [isControlsVisible]);

  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const handleCameraTypeChange = (type: CameraType) => {
    setActiveCameraType(type);
    setActiveCamera(cameraFeeds[type][0]);
  };

  const projectTasksChartData = useMemo(() => {
    return [
      { name: "Ongoing", value: 10, fill: "hsl(var(--primary))" },
      { name: "Upcoming", value: 25, fill: "hsl(var(--muted))" },
    ];
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black relative overflow-hidden"
    >
      <Image
        src={activeCamera.src}
        alt={activeCamera.name}
        layout="fill"
        objectFit="cover"
        className="cursor-pointer"
        key={activeCamera.src}
        data-ai-hint="house construction"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 pointer-events-none",
          isControlsVisible ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end mt-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? <Minimize /> : <Maximize />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "absolute top-4 right-4 z-10 transition-all duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-black/30 hover:bg-white/20"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <PanelRightClose /> : <PanelRightOpen />}
        </Button>
      </div>

      <aside
        className={cn(
          "absolute top-0 right-0 h-full bg-black/50 backdrop-blur-sm p-4 transition-transform duration-300 z-10 w-80 md:w-96",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex bg-zinc-700/50 rounded-full p-1 mb-6">
          <Button
            onClick={() => handleCameraTypeChange("Onsite Camera")}
            className={cn(
              "flex-1 rounded-full text-base h-12",
              activeCameraType === "Onsite Camera"
                ? "bg-primary text-white"
                : "bg-transparent text-white hover:bg-white/20",
            )}
          >
            <Camera className="mr-2 h-5 w-5" />
            Onsite Camera
          </Button>
          <Button
            onClick={() => handleCameraTypeChange("Drones")}
            className={cn(
              "flex-1 rounded-full text-base h-12",
              activeCameraType === "Drones"
                ? "bg-primary text-white"
                : "bg-transparent text-white hover:bg-white/20",
            )}
          >
            <VideoIcon className="mr-2 h-5 w-5" />
            Drones
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {projectTasksChartData && (
              <Card className="rounded-[50px] relative bg-white/20 backdrop-blur-lg border-white/30 text-white">
                <CardContent className="pt-6">
                  <ProjectTimelineChart data={projectTasksChartData} />
                </CardContent>
              </Card>
            )}
            <Card className="rounded-[50px] relative bg-white/20 backdrop-blur-lg border-white/30 text-white p-6">
              <p className="text-sm text-white/80">Project Progress</p>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-4xl font-bold">70%</p>
                <Progress value={70} className="w-full h-2" />
              </div>
            </Card>
            <Card className="rounded-[50px] relative bg-white/20 backdrop-blur-lg border-white/30 text-white p-6">
              <p className="text-sm text-white/80">Issues</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <SnagListIcon className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-white/80">Open</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold">38</p>
                    <p className="text-xs text-white/80">Closed</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
