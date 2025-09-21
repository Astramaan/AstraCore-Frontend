
'use client';

import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/user-context';
import { ClientHeader } from '@/components/client-header';
import { Badge } from '@/components/ui/badge';
import { PaymentsDialog } from '@/components/payments-dialog';

interface TimelineStage {
    title: string;
    subtitle: string;
    date: string;
    status: 'On Going' | 'Yet To Begin';
    progress: number;
    category: string;
    image: string;
}

const StageCard = ({ stage }: { stage: TimelineStage }) => (
    <Card className="rounded-[24px] p-4 bg-white hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 shrink-0">
                <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-[24px] object-cover w-full h-full" data-ai-hint="construction work" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[24px] flex items-end justify-center p-2">
                    <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                       <span className="text-white text-sm font-semibold">{stage.category}</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-1 w-full">
                 <div className="flex justify-between items-start">
                    <h3 className="text-black text-base font-semibold">{stage.title}</h3>
                    <Badge className={cn('capitalize', stage.status === 'On Going' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600')}>{stage.status}</Badge>
                </div>
                <p className="text-sm">{stage.subtitle}</p>
                <div className="pt-2">
                    <Progress value={stage.progress} className="h-2" />
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-black text-xs font-normal">{stage.progress}%</span>
                        <span className="text-grey-1 text-xs">{stage.date}</span>
                    </div>
                </div>
            </div>
        </div>
    </Card>
);

const ChatCard = () => (
    <Card className="rounded-full">
        <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-black text-sm font-normal">Chat with our Executive</p>
                    <p className="text-grey-1 text-xs">Quick Reply</p>
                </div>
                <Image src="https://placehold.co/24x24" width={24} height={24} alt="Chat icon" data-ai-hint="chat bubble" />
            </div>
        </CardContent>
    </Card>
);

const SitePhotos = () => (
     <Card className="rounded-[50px] w-full">
        <CardContent className="p-6 space-y-2">
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

const PaymentCard = () => (
    <Card className="rounded-full">
        <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-black text-sm font-normal">Payment</p>
                    <p className="text-grey-1 text-xs">Due on 05 June</p>
                </div>
                <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={cn("w-3 h-6 rounded-[3px]", i === 0 ? "bg-cyan-500" : "bg-zinc-200")}></div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
)


export default function ExistingClientHomePage() {
  const { user } = useUser();

  const project = {
    name: 'Rabeek',
    pm: 'Yaswanth',
    id: 'RABE0001',
    progress: 70,
    daysLeft: 180,
    coverImage: 'https://picsum.photos/seed/p-cover/1440/480',
    profileImage: 'https://placehold.co/60x60'
  };

  const timeline: TimelineStage[] = [
    { title: "Soil Testing", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "On Going", progress: 70, category: "Civil", image: "https://picsum.photos/seed/soil/100/100" },
    { title: "Slabs", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "Structure", image: "https://picsum.photos/seed/slabs/100/100" },
    { title: "Foundation", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "Civil", image: "https://picsum.photos/seed/foundation/100/100" },
    { title: "IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "Design", image: "https://picsum.photos/seed/idk/100/100" },
    { title: "Stage 06", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "MEP", image: "https://picsum.photos/seed/stage6/100/100" },
    { title: "Stage IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "Finishing", image: "https://picsum.photos/seed/stageidk/100/100" },
  ]
  

  return (
    <main>
        <div className="relative mb-8 md:p-8">
            <div className="relative h-[480px] w-full rounded-b-[50px] md:rounded-[50px] overflow-hidden">
                <Image src={project.coverImage} width={1440} height={480} alt="Project cover" className="w-full h-full object-cover" data-ai-hint="narrow street old buildings"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-8 left-4 md:left-16 flex items-end gap-4 md:gap-6 text-white">
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
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xl md:text-2xl font-semibold">
                        {project.progress}%
                    </div>
                </div>
                <div>
                    <p className="text-white text-base md:text-lg">CLIENT ID: {project.id}</p>
                    <p className="text-white text-sm md:text-base">Banashankari, Bengaluru - 560109</p>
                </div>
            </div>

            <div className="absolute bottom-8 right-16 text-right text-white hidden md:block">
                <p className="text-lg font-semibold">Project Manager - {project.pm}</p>
                <p className="text-base">{new Date('2025-09-21').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 p-4 md:p-8 pt-0">
            {/* Timeline */}
            <div className="flex-1">
                <p className="text-lg font-semibold mb-2 ml-2 md:hidden">{new Date('2025-09-21').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <div className="relative pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {timeline.map((stage, index) => (
                            <StageCard key={index} stage={stage} />
                        ))}
                    </div>
                </div>
            </div>

            <aside className="w-full md:w-64 flex flex-col gap-4 shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                    <PaymentCard />
                    <ChatCard />
                </div>
                <SitePhotos />
            </aside>
        </div>
    </main>
  );
}
