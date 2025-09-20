
'use client';

import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

const StageCard = ({ title, subtitle, date, status, progress, isFirst }: { title: string, subtitle: string, date: string, status: string, progress: number, isFirst?: boolean }) => (
    <div className="pl-8 relative">
        {!isFirst && <div className="absolute left-[22px] top-0 h-4 border-l-2 border-dashed border-stone-300"></div>}
        <div className="absolute left-[15px] -top-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
        <p className="text-neutral-900 text-sm font-normal mb-2">{status}</p>
        <div className="rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border border-stone-300 p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-black text-base font-semibold">{title}</h3>
                    <p className="text-neutral-900 text-sm">{subtitle}</p>
                </div>
                <span className="text-stone-300 text-xs">{status}</span>
            </div>
            <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                    <p className="text-stone-300 text-xs">{date}</p>
                    <span className="text-black text-xs font-normal">{progress}%</span>
                </div>
            </div>
        </div>
    </div>
);

export default function ClientHomePage() {
  const project = {
    name: 'Rabeek',
    pm: 'Yaswanth',
    id: 'RABE0001',
    progress: 70,
    daysLeft: 180,
    coverImage: 'https://placehold.co/393x350',
    profileImage: 'https://placehold.co/60x60'
  };

  const timeline = [
    { title: "Soil Testing", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Started", progress: 70, isFirst: true },
    { title: "Slabs", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0 },
    { title: "Foundation", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0 },
    { title: "IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0 },
    { title: "Stage 06", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0 },
    { title: "Stage IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0 },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header section */}
      <div className="relative">
        <Image src={project.coverImage} width={393} height={350} alt="Project cover" className="w-full h-80 object-cover rounded-b-[50px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/10 to-neutral-900 rounded-b-[50px]"></div>
        <Image src={project.profileImage} width={56} height={56} alt={project.name} className="absolute top-[68px] left-4 rounded-full border-[3px] border-slate-50 shadow" />
      </div>

      {/* Project info section */}
      <div className="p-4 -mt-36 relative z-10 text-white">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <p className="text-base">CLIENT ID: {project.id}</p>
        <p className="text-xs">Project Manager - {project.pm}</p>
      </div>

      {/* Progress and Payment section */}
      <div className="p-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          {/* Progress circle */}
          <div className="relative w-20 h-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-slate-50" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
              <circle className="text-cyan-500" strokeWidth="10" strokeDasharray="282.6" strokeDashoffset={282.6 - (project.progress / 100) * 282.6} strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" transform="rotate(-90 50 50)" />
              <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-cyan-500 text-xl font-semibold">{project.daysLeft}</text>
            </svg>
          </div>
          <p className="text-neutral-900">25 May 2024</p>
        </div>
        <div className="text-right">
          <p className="text-black">Payment</p>
          <p className="text-stone-300 text-xs">Due on 05 June</p>
          {/* Payment status bars */}
          <div className="flex gap-1 mt-1">
            <div className="w-2.5 h-5 bg-cyan-500 rounded-sm"></div>
            <div className="w-2.5 h-5 bg-stone-300 rounded-sm"></div>
            <div className="w-2.5 h-5 bg-stone-300 rounded-sm"></div>
            <div className="w-2.5 h-5 bg-stone-300 rounded-sm"></div>
            <div className="w-2.5 h-5 bg-stone-300 rounded-sm"></div>
            <div className="w-2.5 h-5 bg-stone-300 rounded-sm"></div>
            <div className="w-2.5 h-5 bg-stone-300 rounded-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="px-4 pb-24">
        <div className="relative py-4">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-stone-300"></div>
            <div className="space-y-8">
                {timeline.map((stage, index) => (
                    <StageCard key={index} {...stage} isFirst={index === 0} />
                ))}
            </div>
        </div>
      </div>

    </div>
  );
}
