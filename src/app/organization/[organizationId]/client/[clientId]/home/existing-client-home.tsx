
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/user-context';
import { ClientHeader } from '@/components/client-header';
import { Badge } from '@/components/ui/badge';
import { PaymentsDialog } from '@/components/payments-dialog';
import { ImageGallerySheet } from '@/components/image-gallery-sheet';
import { Dialog, DialogHeader, DialogTitle, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { X, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PdfIcon from '@/components/icons/pdf-icon';
import { ViewUpcomingTasksSheet } from '@/components/view-upcoming-tasks-sheet';
import { ViewCompletedTasksSheet } from '@/components/view-completed-tasks-sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';


interface TimelineStage {
    title: string;
    subtitle: string;
    date: string;
    status: 'On Going' | 'Yet To Begin' | 'completed';
    progress: number;
    category: string;
    image: string;
    siteImages?: string[];
    approvalDate?: string;
    documents?: { name: string, url: string }[];
}

const PdfPreviewDialog = ({ open, onOpenChange, file }: { open: boolean; onOpenChange: (open: boolean) => void; file: { name: string, url: string } | null }) => {
    if (!file) return null;
    // In a real app, file.url would be used. For this dummy data, we use a placeholder PDF.
    const dummyPdfUrl = `https://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white">
                <DialogHeader className="p-4 border-b flex-row items-center justify-between">
                    <DialogTitle>{file.name}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-background">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex-1">
                    <iframe src={dummyPdfUrl} className="w-full h-full" title={file.name} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

const StageCard = ({ stage, onReopen, className }: { stage: TimelineStage, onReopen?: (stage: TimelineStage) => void, className?: string }) => {
    const { user } = useUser();
    const isProjectManager = user?.team === 'Project Manager';
    const [selectedPdf, setSelectedPdf] = useState<{ name: string, url: string } | null>(null);
    const hasAttachments = (stage.documents && stage.documents.length > 0) || (stage.siteImages && stage.siteImages.length > 0);

    const handlePdfClick = (e: React.MouseEvent, doc: { name: string, url: string }) => {
        e.stopPropagation();
        setSelectedPdf(doc);
    };

    return (
        <>
            <Collapsible>
                 <Card className={cn(
                    "rounded-[24px] p-4 bg-white transition-shadow", 
                    className,
                    hasAttachments ? "cursor-pointer hover:shadow-md" : ""
                )}>
                    <CollapsibleTrigger className="w-full text-left" disabled={!hasAttachments}>
                         <div className={cn("w-full")}>
                            <div className="flex items-center gap-4">
                                <div className="relative w-24 h-24 shrink-0">
                                    <Image src={stage.image} width={100} height={100} alt={stage.title} className="rounded-[24px] object-cover w-full h-full" data-ai-hint="construction work" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[24px] flex items-end justify-center p-2">
                                        <div className="bg-black/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                                        <span className="text-white text-sm font-semibold">{stage.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-1 w-full text-left">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-black text-base font-semibold">{stage.title}</h3>
                                        <Badge className={cn('capitalize', 
                                            stage.status === 'On Going' ? 'bg-blue-100 text-blue-700' : 
                                            stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-600'
                                        )}>{stage.status === 'completed' ? 'Completed' : stage.status}</Badge>
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
                        </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                        {(stage.status === 'On Going' && stage.documents && stage.documents.length > 0) && (
                            <div className="mt-4 space-y-4">
                                <Separator />
                                <div className="pt-2 space-y-2">
                                    {stage.documents.map((doc, index) => (
                                        <div key={index} onClick={(e) => handlePdfClick(e, doc)} className="flex items-center gap-4 py-2 cursor-pointer -mx-2 px-2 rounded-lg hover:bg-muted">
                                            <PdfIcon className="w-6 h-6 shrink-0"/>
                                            <div className="flex-1">
                                                <p className="text-base text-black font-medium">{doc.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {isProjectManager && (
                                    <div className="flex gap-4">
                                        <Button variant="outline" className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg">Reject</Button>
                                        <Button className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg">Approve</Button>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {(stage.status === 'completed' && hasAttachments) && (
                            <div className="mt-4 space-y-4">
                                <Separator />
                                <div className="pt-4">
                                {stage.approvalDate && <p className="text-sm text-muted-foreground mb-2">Approved by Project Manager on {new Date(stage.approvalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
                                    {stage.siteImages && stage.siteImages.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {stage.siteImages?.map((img, index) => (
                                                <Image key={index} src={img} width={100} height={100} alt={`Site image ${'index + 1'}`} className="rounded-[15px] object-cover aspect-square" data-ai-hint="construction site photo" />
                                            ))}
                                        </div>
                                    )}
                                    {stage.documents && stage.documents.length > 0 && (
                                        <div className="pt-4 space-y-2">
                                            {stage.documents.map((doc, index) => (
                                                <div key={index} onClick={(e) => handlePdfClick(e, doc)} className="flex items-center gap-4 p-2 -mx-2 rounded-lg cursor-pointer hover:bg-muted">
                                                    <PdfIcon className="w-6 h-6 shrink-0"/>
                                                    <div className="flex-1">
                                                        <p className="text-base text-black font-medium">{doc.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {isProjectManager && (
                                    <div className="flex justify-end pt-2">
                                        <Button variant="outline" size="sm" className="rounded-full" onClick={(e) => {e.stopPropagation(); onReopen?.(stage);}}>Reopen</Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CollapsibleContent>
                </Card>
            </Collapsible>
             <PdfPreviewDialog 
                open={!!selectedPdf} 
                onOpenChange={(open) => !open && setSelectedPdf(null)} 
                file={selectedPdf} 
            />
        </>
    )
};

const ChatCard = ({ pmPhoneNumber }: { pmPhoneNumber: string }) => (
    <Card className="rounded-full md:rounded-[50px]">
        <a href={`https://wa.me/91${pmPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 gap-2 md:flex-row text-center">
            <div className="grid place-items-center h-10 w-10 rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-green-500"><rect width="256" height="256" fill="none"/><path d="M45.4,177A95.9,95.9,0,1,1,79,210.6h0L45.8,220a7.9,7.9,0,0,1-9.8-9.8L45.4,177Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/><path d="M152.1,184A79.9,79.9,0,0,1,72,103.9,28,28,0,0,1,100,76h0a6.8,6.8,0,0,1,6,3.5l11.7,20.4a8.1,8.1,0,0,1-.1,8.1l-9.4,15.7h0a48,48,0,0,0,24.1,24.1h0l15.7-9.4a8.1,8.1,0,0,1,8.1-.1L176.5,150a6.8,6.8,0,0,1,3.5,6h0A28.1,28.1,0,0,1,152.1,184Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/></svg>
            </div>
            <div className="hidden md:block text-left">
                <p className="text-black text-sm font-normal">Chat with our Executive</p>
                <p className="text-grey-1 text-xs">Quick Reply</p>
            </div>
        </a>
    </Card>
);

const SitePhotos = ({ onViewMore, onImageClick, siteImages }: { onViewMore: () => void, onImageClick: (index: number) => void, siteImages: string[] }) => {
    return (
        <Card className="rounded-[50px] w-full hidden md:block">
            <CardContent className="p-6 md:pb-10 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-black text-base font-normal">Recent Site Photos</p>
                    <Button variant="link" className="text-cyan-500 text-sm p-0 h-auto" onClick={onViewMore}>view more</Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {siteImages.slice(0, 4).map((src, index) => (
                        <div key={index} className="relative w-full aspect-video cursor-pointer" onClick={() => onImageClick(index)}>
                            <Image className="rounded-[10px] object-cover" src={src} fill alt={`Site photo ${index + 1}`} data-ai-hint="construction building" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};


const PaymentCard = () => (
    <Card className="rounded-full">
        <CardContent className="p-4 px-6 w-full">
            <div className="flex items-center justify-between gap-4">
                 <div className="flex-1">
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
);

const ImagePreviewDialog = ({ open, onOpenChange, images, startIndex = 0, title }: { open: boolean, onOpenChange: (open: boolean) => void, images: string[], startIndex?: number, title: string }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-background">
                <DialogHeader className="p-4 border-b flex-row items-center justify-between">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex-1 p-6 flex items-center justify-center">
                    <Carousel
                        opts={{
                            startIndex: startIndex,
                            loop: true,
                        }}
                        className="w-full max-w-lg"
                    >
                        <CarouselContent>
                            {images.map((src, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-video">
                                        <Image src={src} layout="fill" objectFit="contain" alt={`${title} image ${index + 1}`} className="rounded-[10px]" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export default function ExistingClientHomePage() {
  const { user } = useUser();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [previewState, setPreviewState] = useState<{ open: boolean, startIndex: number }>({ open: false, startIndex: 0 });
  const [isUpcomingTasksSheetOpen, setIsUpcomingTasksSheetOpen] = useState(false);
  const [isCompletedTasksSheetOpen, setIsCompletedTasksSheetOpen] = useState(false);


  const project = {
    name: 'Rabeek',
    pm: 'Yaswanth',
    id: 'RABE0001',
    progress: 70,
    daysLeft: 180,
    coverImage: 'https://picsum.photos/seed/p-cover/1440/480',
    profileImage: 'https://placehold.co/60x60',
    pmPhoneNumber: '9876543210',
    siteImages: [
        "https://picsum.photos/seed/site1/600/400",
        "https://picsum.photos/seed/site2/600/400",
        "https://picsum.photos/seed/site3/600/400",
        "https://picsum.photos/seed/site4/600/400",
        "https://picsum.photos/seed/site5/600/400",
        "https://picsum.photos/seed/site6/600/400",
    ]
  };

  const [allStages, setAllStages] = useState<TimelineStage[]>([
    { title: "Soil Testing", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "completed", progress: 100, category: "Civil", image: "https://picsum.photos/seed/soil/100/100", siteImages: ["https://picsum.photos/seed/soil1/150/150"], approvalDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), documents: [{name: "Soil Test Report.pdf", url: "#"}] },
    { title: "Slabs", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "On Going", progress: 70, category: "Structure", image: "https://picsum.photos/seed/slabs/100/100", documents: [{name: "Structural Drawing.pdf", url: "#"}, {name: "Beam Layout.pdf", url: "#"}] },
    { title: "Foundation", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "Civil", image: "https://picsum.photos/seed/foundation/100/100" },
    { title: "IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "Design", image: "https://picsum.photos/seed/idk/100/100" },
    { title: "Stage 06", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "MEP", image: "https://picsum.photos/seed/stage6/100/100" },
    { title: "Stage IDK", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "Yet To Begin", progress: 0, category: "Finishing", image: "https://picsum.photos/seed/stageidk/100/100" },
  ]);
  
  const timeline = useMemo(() => allStages.filter(stage => stage.status !== 'completed'), [allStages]);

  const recentlyCompletedTasks = useMemo(() => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    return allStages.filter(stage => {
        if (stage.status === 'completed' && stage.approvalDate) {
            const approvalDate = new Date(stage.approvalDate);
            return approvalDate > twentyFourHoursAgo;
        }
        return false;
    });
  }, [allStages]);

  const completedTasks = useMemo(() => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    return allStages.filter(stage => stage.status === 'completed' && (!stage.approvalDate || new Date(stage.approvalDate) <= twentyFourHoursAgo))
  }, [allStages]);
  
  const upcomingTasks = useMemo(() => allStages.filter(stage => stage.status === 'Yet To Begin'), [allStages]);

  
  const handleReopenTask = (stageToReopen: TimelineStage) => {
    setAllStages(currentTimeline => 
        currentTimeline.map(stage => 
            stage.title === stageToReopen.title ? { ...stage, status: 'On Going', progress: 50 } : stage
        )
    );
  };
  
  const openImagePreview = (index: number) => {
    setPreviewState({ open: true, startIndex: index });
  };

  const closeImagePreview = () => {
      setPreviewState({ open: false, startIndex: 0 });
  };


  return (
    <>
    <main>
       <div className="relative mb-8 md:mx-8">
        <div className="rounded-b-[50px] md:rounded-[50px] overflow-hidden">
            <div className="relative h-[300px] md:h-[480px] w-full">
                <Image src={project.coverImage} fill alt="Project cover" className="w-full h-full object-cover" data-ai-hint="narrow street old buildings"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white">
                    <div className="flex items-end gap-4">
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
                            <p className="text-white text-base md:text-lg">Project Manager: {project.pm}</p>
                            <p className="text-white text-sm md:text-base">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8 px-4 md:px-8">
            {/* Timeline */}
            <div className="md:col-span-3 lg:col-span-4 order-2 md:order-1">
                 <div className="mb-6 flex flex-row gap-4 justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setIsCompletedTasksSheetOpen(true)}
                        className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1"
                    >
                        View Completed Tasks
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1"
                        onClick={() => setIsUpcomingTasksSheetOpen(true)}
                    >
                        View Upcoming Tasks
                    </Button>
                </div>
                <div className="relative pb-4">
                    {recentlyCompletedTasks.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Recently Completed</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {recentlyCompletedTasks.map((stage, index) => (
                                    <StageCard key={index} stage={stage} onReopen={handleReopenTask} />
                                ))}
                            </div>
                            <Separator className="my-8" />
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {timeline.map((stage, index) => (
                            <StageCard key={index} stage={stage} onReopen={handleReopenTask} />
                        ))}
                    </div>
                </div>
            </div>

            <aside className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 order-1 md:order-2">
                 <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <PaymentsDialog>
                           <PaymentCard />
                        </PaymentsDialog>
                    </div>
                    <div className="flex-1 md:flex-initial">
                        <ChatCard pmPhoneNumber={project.pmPhoneNumber} />
                    </div>
                </div>
                <SitePhotos 
                    onViewMore={() => setIsGalleryOpen(true)}
                    onImageClick={openImagePreview}
                    siteImages={project.siteImages}
                />
            </aside>
        </div>
    </main>
    <ImageGallerySheet
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        images={project.siteImages}
        title="Recent Site Photos"
    />
     <ImagePreviewDialog 
        open={previewState.open}
        onOpenChange={(open) => !open && closeImagePreview()}
        images={project.siteImages}
        startIndex={previewState.startIndex}
        title="Site Photo"
    />
    <ViewUpcomingTasksSheet 
        isOpen={isUpcomingTasksSheetOpen}
        onClose={() => setIsUpcomingTasksSheetOpen(false)}
        tasks={upcomingTasks as any}
        onTaskClick={(task) => console.log('task clicked', task)}
    />
    <ViewCompletedTasksSheet
        isOpen={isCompletedTasksSheetOpen}
        onClose={() => setIsCompletedTasksSheetOpen(false)}
        tasks={completedTasks as any}
        onTaskClick={(task) => console.log('task clicked', task)}
    />
    </>
  );
}
