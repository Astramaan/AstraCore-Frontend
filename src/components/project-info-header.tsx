"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ClientHeader } from "./client-header";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProjectInfoHeaderProps {
  project: {
    name: string;
    coverImage: string;
    progress: number;
    pm?: string;
    id: string;
    profileImage?: string;
  };
  children?: React.ReactNode;
}

export const ProjectInfoHeader = ({
  project,
  children,
}: ProjectInfoHeaderProps) => {
  return (
    <div className="relative w-full h-80 md:h-64 md:rounded-b-[50px] overflow-hidden">
      <Image
        src={project.coverImage}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt={`${project.name} cover`}
        data-ai-hint="abstract background"
        className="z-0"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>

      <div className="relative z-20 h-full flex flex-col justify-between p-6">
        <div className="hidden md:block">
          <ClientHeader />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold text-white text-shadow">
                {project.name}
              </h3>
              <p className="text-white text-shadow">{project.id}</p>
            </div>
            {project.pm && (
              <div className="text-right">
                <p className="text-sm text-white/80">Project Manager</p>
                <p className="text-base font-semibold text-white">
                  {project.pm}
                </p>
              </div>
            )}
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full">
            <div className="flex items-center gap-4">
              <Progress value={project.progress} className="h-2 flex-1" />
              <span className="text-white font-semibold text-sm">
                {project.progress}% completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
