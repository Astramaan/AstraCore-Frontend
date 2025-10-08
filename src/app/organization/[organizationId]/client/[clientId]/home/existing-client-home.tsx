
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/user-context';
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
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ClientHeader } from '@/components/client-header';
import { motion } from 'framer-motion';


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
            <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-white dark:bg-card">
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
            <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
            >
                <Collapsible asChild>
                    <Card className={cn("rounded-[24px] bg-white dark:bg-card transition-shadow p-4", className, hasAttachments ? "cursor-pointer" : "")}>
                        <CollapsibleTrigger asChild disabled={!hasAttachments}>
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
                                            <h3 className="text-foreground text-base font-semibold">{stage.title}</h3>
                                            <Badge className={cn('capitalize', 
                                                stage.status === 'On Going' ? 'bg-green-100 text-green-700' : 
                                                stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                'bg-gray-100 text-gray-600'
                                            )}>{stage.status === 'completed' ? 'Completed' : stage.status}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{stage.subtitle}</p>
                                        <div className="pt-2">
                                            <Progress value={stage.progress} className="h-2" />
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-foreground text-xs font-normal">{stage.progress}%</span>
                                                <span className="text-muted-foreground text-xs">{stage.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                            {(stage.status === 'On Going' && stage.documents && stage.documents.length > 0) && (
                                <div className="mt-4 space-y-4">
                                    <Separator />
                                    <div className="pt-2 space-y-2">
                                        {stage.documents.map((doc, index) => (
                                            <div key={index} onClick={(e) => handlePdfClick(e, doc)} className="flex items-center gap-4 py-2 cursor-pointer -mx-2 px-2 rounded-lg hover:bg-muted">
                                                <PdfIcon className="w-6 h-6 shrink-0"/>
                                                <div className="flex-1">
                                                    <p className="text-base text-foreground font-medium">{doc.name}</p>
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
                                                            <p className="text-base text-foreground font-medium">{doc.name}</p>
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
            </motion.div>
             <PdfPreviewDialog 
                open={!!selectedPdf} 
                onOpenChange={(open) => !open && setSelectedPdf(null)} 
                file={selectedPdf} 
            />
        </>
    )
};

const ChatCard = ({ pmPhoneNumber, className }: { pmPhoneNumber: string, className?: string }) => (
    <Card className={cn("rounded-full", className)}>
        <CardContent className="p-0">
            <a href={`https://wa.me/91${pmPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 gap-2">
                <div className="text-left">
                    <p className="text-foreground text-sm font-normal">Chat with our Executive</p>
                    <p className="text-muted-foreground text-xs">Quick Reply</p>
                </div>
                <div className="grid place-items-center h-10 w-10 rounded-full bg-white dark:bg-card">
                    <WhatsappIcon className="w-6 h-6" />
                </div>
            </a>
        </CardContent>
    </Card>
);

const SitePhotos = ({ onViewMore, onImageClick, siteImages, className }: { onViewMore: () => void, onImageClick: (index: number) => void, siteImages: string[], className?: string }) => {
    return (
        <Card className={cn("rounded-[50px] w-full", className)}>
            <CardContent className="p-6 md:pb-10 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-foreground text-base font-normal">Recent Site Photos</p>
                    <Button variant="link" className="text-primary p-0 h-auto" onClick={onViewMore}>view more</Button>
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
    <Card className="rounded-full cursor-pointer">
        <CardContent className="p-4 px-6 w-full">
            <div className="flex items-center justify-between gap-4">
                 <div className="flex-1">
                    <p className="text-foreground text-sm font-normal">Payment</p>
                    <p className="text-muted-foreground text-xs">Due on 05 June</p>
                </div>
                <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={cn("w-3 h-6 rounded-[3px]", i === 0 ? "bg-primary" : "bg-muted")}></div>
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
    name: 'Gokula',
    pm: 'Yaswanth',
    id: 'RABE0001',
    progress: 70,
    daysLeft: 180,
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBob3VzZXxlbnwwfHx8fDE3NTk4NDU5ODR8MA',
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
      <div className="relative">
        <header className="sticky top-2 z-20 px-2">
            <div className="relative p-px rounded-full bg-gradient-to-br from-white/50 to-white/0 dark:from-white/20 dark:to-white/0">
                <div className="relative w-full bg-black/20 rounded-full backdrop-blur-[5px] px-4 py-2">
                    <div className="max-w-[1440px] 2xl:max-w-none mx-auto">
                        <ClientHeader />
                    </div>
                </div>
            </div>
        </header>
        <div className="absolute top-0 left-0 w-full h-[50vh] -z-10">
            <Image
                src={project.coverImage}
                alt="Modern house background"
                layout="fill"
                objectFit="cover"
                className="object-top"
                data-ai-hint="modern house"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <main className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8 mt-56 sm:px-4 md:px-8 2xl:px-10">
                {/* Timeline */}
                <div className="md:col-span-3 lg:col-span-4 order-2 md:order-1 px-4 md:px-0">
                     <div className="mb-6 flex flex-row gap-4 justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setIsCompletedTasksSheetOpen(true)}
                            className="rounded-full bg-white dark:bg-card h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-64"
                        >
                            Completed Tasks
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full bg-white dark:bg-card h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-64"
                            onClick={() => setIsUpcomingTasksSheetOpen(true)}
                        >
                            Upcoming Tasks
                        </Button>
                    </div>
                    <div className="relative pb-4">
                        {recentlyCompletedTasks.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4">Recently Completed</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                                    {recentlyCompletedTasks.map((stage, index) => (
                                        <StageCard key={index} stage={stage} onReopen={handleReopenTask} />
                                    ))}
                                </div>
                                <Separator className="my-8" />
                            </div>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                            {timeline.map((stage, index) => (
                                <StageCard key={index} stage={stage} onReopen={handleReopenTask} />
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 order-1 md:order-2 px-4 md:px-0">
                     <div className="flex flex-col gap-4">
                        <Card className="rounded-[50px] p-6 border-none shadow-none bg-transparent">
                            <CardContent className="p-0">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white text-shadow">{project.name}</h3>
                                        <p className="text-white text-shadow">{project.id}</p>
                                    </div>
                                    {project.pm && (
                                         <div className="text-right">
                                            <p className="text-sm text-white/80">Project Manager</p>
                                            <p className="text-base font-semibold text-white">{project.pm}</p>
                                        </div>
                                    )}
                                </div>
                                 <div className="bg-black/20 backdrop-blur-sm p-3 rounded-full mt-4">
                                    <div className="flex items-center gap-4">
                                        <Progress value={project.progress} className="h-2 flex-1" />
                                        <span className="text-white font-semibold text-sm">{project.progress}% completed</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <PaymentsDialog>
                           <PaymentCard />
                        </PaymentsDialog>
                        <ChatCard pmPhoneNumber={project.pmPhoneNumber} className="hidden md:block"/>
                         <SitePhotos 
                            onViewMore={() => setIsGalleryOpen(true)}
                            onImageClick={openImagePreview}
                            siteImages={project.siteImages}
                            className="hidden md:block"
                        />
                    </div>
                </aside>
            </div>
        </main>
    </div>
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
