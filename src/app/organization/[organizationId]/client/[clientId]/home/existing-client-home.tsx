
'use client';

import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/user-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ClientHeader } from '@/components/client-header';

const StageCard = ({ title, subtitle, date, status, progress, isFirst, isUpcoming }: { title: string, subtitle: string, date: string, status: string, progress: number, isFirst?: boolean, isUpcoming?: boolean }) => (
    <div className="pl-8 relative">
        {!isFirst && <div className={cn("absolute left-[15px] md:left-[22px] top-0 h-4 border-l-2 border-dashed", isUpcoming ? "border-green-400" : "border-grey-2")}></div>}
        <div className={cn(
            "absolute left-[8px] md:left-[15px] -top-1 w-4 h-4 rounded-full border-2 border-white",
            isUpcoming ? "bg-green-400" : "bg-cyan-500"
        )}></div>
        <p className={cn(
            "text-sm font-normal mb-2 ml-2 md:ml-0",
            isUpcoming ? 'text-green-400' : 'text-foreground'
        )}>{isUpcoming ? 'upcoming' : 'ongoing'}</p>
        <Card className="rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-grey-2 p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-black text-base font-semibold">{title}</h3>
                    <p className="text-sm">{subtitle}</p>
                </div>
                <span className="text-grey-1 text-xs">{status}</span>
            </div>
            <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                    <p className="text-grey-1 text-xs">{date}</p>
                    <span className="text-black text-xs font-normal">{progress}%</span>
                </div>
            </div>
        </Card>
    </div>
);

const PaymentStatus = () => (
    <div className="flex items-center justify-between md:w-64 md:border md:border-grey-2 md:rounded-2xl md:p-4">
        <div className="space-y-1">
            <p className="text-black text-sm font-normal">Payment</p>
            <p className="text-grey-1 text-xs">Due on 05 June</p>
        </div>
        <div className="flex gap-1">
            {[...Array(7)].map((_, i) => (
                <div key={i} className={cn("w-3 h-6 rounded-[3px]", i === 0 ? "bg-cyan-500" : "bg-grey-2")}></div>
            ))}
        </div>
    </div>
);

const ChatCard = () => (
    <Card className="rounded-2xl md:w-64">
        <CardContent className="p-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-black text-base font-normal">Chat with our Executive</p>
                    <p className="text-grey-1 text-sm">Quick Reply</p>
                </div>
                <Image src="https://placehold.co/24x24" width={24} height={24} alt="Chat icon" data-ai-hint="chat bubble" />
            </div>
        </CardContent>
    </Card>
);

const SitePhotos = () => (
     <Card className="rounded-[20px] md:w-60">
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
  const { user } = useUser();
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
    <div className="min-h-screen">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
           <div className="max-w-[1440px] mx-auto p-4">
             <ClientHeader />
           </div>
        </header>
        <main className="md:p-8">
            {/* Header section */}
            
            <div className="relative mb-8">
                <Image src={project.coverImage} width={753} height={350} alt="Project cover" className="w-full h-80 object-cover rounded-b-[50px] md:rounded-[50px]" data-ai-hint="house project"/>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent rounded-b-[50px] md:rounded-[50px]"></div>
                
                <div className="absolute bottom-8 left-4 md:left-8 flex items-end gap-4 md:gap-6 text-white">
                    <div className="relative w-20 h-10 md:w-24 md:h-12 overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 100 50">
                            <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-50/20"/>
                            <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-cyan-500"
                                style={{
                                    strokeDasharray: 141.3,
                                    strokeDashoffset: 141.3 - (project.progress / 100) * 141.3
                                }}
                            />
                        </svg>
                         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xl md:text-2xl font-semibold">
                            {project.progress}%
                        </div>
                    </div>
                    <div>
                        <p className="text-white text-base md:text-lg">CLIENT ID: {project.id}</p>
                        <p className="text-white text-sm md:text-base">Banashankari, Bengaluru - 560109</p>
                         <p className="md:hidden text-white text-xs mt-1">Project Manager - {project.pm}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8 p-4 md:p-0">
                {/* Timeline */}
                <div className="flex-1">
                    <div className="relative py-4">
                        <p className="text-sm font-normal mb-2 ml-10">25 May 2024</p>
                        <div className="absolute left-4 md:left-5 top-12 bottom-0 w-px bg-grey-2"></div>
                        <div className="space-y-8">
                            {timeline.map((stage, index) => (
                                <StageCard key={index} {...stage} isFirst={index === 0} />
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="w-full md:w-auto space-y-8 flex flex-col items-center">
                    <PaymentStatus />
                    <ChatCard />
                    <SitePhotos />
                </aside>
            </div>
        </main>
    </div>
  );
}
