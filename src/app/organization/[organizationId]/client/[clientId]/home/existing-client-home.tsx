
'use client';

import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const StageCard = ({ title, subtitle, date, status, progress, isFirst, isUpcoming }: { title: string, subtitle: string, date: string, status: string, progress: number, isFirst?: boolean, isUpcoming?: boolean }) => (
    <div className="pl-8 relative">
        {!isFirst && <div className="absolute left-[22px] top-0 h-4 border-l-2 border-dashed border-stone-300"></div>}
        <div className={cn(
            "absolute left-[15px] -top-1 w-4 h-4 rounded-full border-2 border-white",
            isUpcoming ? "bg-green-400" : "bg-cyan-500"
        )}></div>
        <p className={cn(
            "text-sm font-normal mb-2",
            isUpcoming ? "text-green-400" : "text-neutral-900"
        )}>{isUpcoming ? 'upcoming' : 'ongoing'}</p>
        <Card className="rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-stone-300 p-4">
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
        </Card>
    </div>
);

const PaymentStatus = () => (
    <div className="space-y-2">
        <p className="text-black text-sm font-normal">Payment</p>
        <p className="text-stone-300 text-xs">Due on 05 June</p>
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
);

const ChatCard = () => (
    <Card className="rounded-2xl">
        <CardContent className="p-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-black text-base font-normal">Chat with our Executive</p>
                    <p className="text-stone-300 text-sm">Quick Reply</p>
                </div>
                <Image src="https://placehold.co/24x24" width={24} height={24} alt="Chat icon" data-ai-hint="chat bubble" />
            </div>
        </CardContent>
    </Card>
);

const SitePhotos = () => (
     <Card className="rounded-[20px]">
        <CardContent className="p-4 space-y-2">
            <p className="text-black text-base font-normal">Recent Site Photos</p>
            <div className="grid grid-cols-2 gap-2">
                <Image className="rounded-[10px]" src="https://picsum.photos/seed/site1/99/69" width={99} height={69} alt="Site photo 1" data-ai-hint="construction building" />
                <Image className="rounded-[10px]" src="https://picsum.photos/seed/site2/99/69" width={99} height={69} alt="Site photo 2" data-ai-hint="building interior" />
                <Image className="rounded-[10px]" src="https://picsum.photos/seed/site3/99/69" width={99} height={69} alt="Site photo 3" data-ai-hint="construction worker" />
                <Image className="rounded-[10px]" src="https://picsum.photos/seed/site4/99/69" width={99} height={69} alt="Site photo 4" data-ai-hint="architect blueprint" />
            </div>
            <div className="text-right">
                <Button variant="link" className="text-cyan-500 text-sm p-0 h-auto">view more</Button>
            </div>
        </CardContent>
    </Card>
);


export default function ExistingClientHomePage() {
  const project = {
    name: 'Rabeek',
    pm: 'Yaswanth',
    id: 'RABE0001',
    progress: 70,
    daysLeft: 180,
    coverImage: 'https://picsum.photos/seed/p-cover/753/504',
    profileImage: 'https://placehold.co/60x60'
  };

  const timeline = [
    { title: "Soil Testing", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Started", progress: 70, isFirst: true },
    { title: "Slabs", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0, isUpcoming: true },
    { title: "Foundation", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0, isUpcoming: true },
    { title: "IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0, isUpcoming: true },
    { title: "Stage 06", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0, isUpcoming: true },
    { title: "Stage IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet to begin", progress: 0, isUpcoming: true },
  ]
  

  return (
    <div className="bg-slate-50 min-h-screen">
        <div className="flex">
            <main className="flex-1 p-4 md:p-8">
                 {/* Header section */}
                <div className="relative mb-8">
                    <Image src={project.coverImage} width={753} height={350} alt="Project cover" className="w-full h-80 object-cover rounded-b-[50px]" data-ai-hint="house project"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent rounded-b-[50px]"></div>
                    
                    <div className="absolute bottom-8 left-8 flex items-end gap-6 text-white">
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle className="text-slate-50/20" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                                <circle className="text-cyan-500" strokeWidth="10" strokeDasharray="282.6" strokeDashoffset={282.6 - (project.progress / 100) * 282.6} strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" transform="rotate(-90 50 50)" />
                                <text x="50" y="50" textAnchor="middle" dy=".3em" fill="white" className="text-cyan-500 text-2xl font-semibold">{project.daysLeft}</text>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white text-base">CLIENT ID: {project.id}</p>
                            <p className="text-white text-sm">Banashankari, Bengaluru - 560109</p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="px-4 pb-24">
                    <div className="relative py-4">
                        <p className="text-neutral-900 text-sm font-normal mb-2 ml-10">25 May 2024</p>
                        <div className="absolute left-[22px] top-12 bottom-0 w-px bg-stone-300"></div>
                        <div className="space-y-8">
                            {timeline.map((stage, index) => (
                                <StageCard key={index} {...stage} isFirst={index === 0} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <aside className="w-[300px] p-8 space-y-8 hidden lg:block">
                <PaymentStatus />
                <ChatCard />
                <SitePhotos />
            </aside>
        </div>
    </div>
  );
}
