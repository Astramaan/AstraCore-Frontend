
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
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { ProjectInfoHeader } from '@/components/project-info-header';
import { RaiseIssueSheet, type IssueInfo } from '@/components/raise-issue-sheet';
import { StageCard, TimelineStage } from '@/components/stage-card';


const ChatCard = ({ pmPhoneNumber }: { pmPhoneNumber: string }) => (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }} className="hover:shadow-lg rounded-full">
        <a href={`https://wa.me/91${pmPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 gap-2 bg-white rounded-full">
            <div className="text-left">
                <p className="text-black text-sm font-normal">Chat with our Executive</p>
                <p className="text-grey-1 text-xs">Quick Reply</p>
            </div>
            <div className="grid place-items-center h-10 w-10 rounded-full bg-white">
                <WhatsappIcon className="w-6 h-6" />
            </div>
        </a>
    </motion.div>
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
    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }} className="hover:shadow-lg rounded-full">
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
    </motion.div>
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
  const [isRaiseIssueSheetOpen, setIsRaiseIssueSheetOpen] = useState(false);
  const [stageForIssue, setStageForIssue] = useState<TimelineStage | null>(null);


  const project = {
    name: 'Gokula',
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
    { title: "Slabs", subtitle: "initial stage", date: "25 May 2024 - 26 May 2024", status: "On Going", progress: 70, category: "Structure", image: "https://picsum.photos/seed/slabs/100/100", approvalDate: new Date("2025-05-26").toISOString(), documents: [{name: "Structural Drawing.pdf", url: "#"}, {name: "Beam Layout.pdf", url: "#"}] },
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
  
  const handleRaiseIssue = (stage: TimelineStage) => {
    setStageForIssue(stage);
    setIsRaiseIssueSheetOpen(true);
  };
  
  const handleIssueSubmit = (issueInfo: IssueInfo) => {
    console.log('Issue submitted for stage:', stageForIssue?.title, issueInfo);
    // Here you would typically send this data to your backend.
    setIsRaiseIssueSheetOpen(false);
  };


  return (
    <>
    <main>
        <div className="relative mb-8">
            <ProjectInfoHeader project={project}>
                <div className="bg-white py-4 px-6 md:px-10 m-6 rounded-[50px] z-30">
                    <ClientHeader />
                </div>
            </ProjectInfoHeader>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-4 gap-8 px-4 md:px-8">
            {/* Timeline */}
            <div className="md:col-span-3 lg:col-span-5 2xl:col-span-3 order-2 md:order-1">
                 <div className="mb-6 flex flex-row gap-4 justify-between">
                    <Button
                        variant="outline"
                        onClick={() => setIsCompletedTasksSheetOpen(true)}
                        className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-auto 2xl:px-8"
                    >
                       View Completed Stages
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-full bg-white h-[54px] hover:bg-primary/10 hover:text-primary flex-1 2xl:flex-none 2xl:w-auto 2xl:px-8"
                        onClick={() => setIsUpcomingTasksSheetOpen(true)}
                    >
                       View Upcoming Stages
                    </Button>
                </div>
                <div className="relative pb-4">
                    {recentlyCompletedTasks.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Recently Completed</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                                {recentlyCompletedTasks.map((stage, index) => (
                                    <StageCard key={`${stage.title}-${index}-recent`} stage={stage} onReopen={handleReopenTask} onRaiseIssue={handleRaiseIssue} />
                                ))}
                            </div>
                            <Separator className="my-8" />
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {timeline.map((stage, index) => (
                            <StageCard key={`${stage.title}-${index}`} stage={stage} onReopen={handleReopenTask} onRaiseIssue={handleRaiseIssue} />
                        ))}
                    </div>
                </div>
            </div>

            <aside className="md:col-span-2 lg:col-span-2 2xl:col-span-1 flex flex-col gap-4 order-1 md:order-2">
                 <div className="flex flex-col gap-4">
                    <PaymentsDialog>
                       <PaymentCard />
                    </PaymentsDialog>
                    <ChatCard pmPhoneNumber={project.pmPhoneNumber} />
                     <SitePhotos 
                        onViewMore={() => setIsGalleryOpen(true)}
                        onImageClick={openImagePreview}
                        siteImages={project.siteImages}
                    />
                </div>
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
    <RaiseIssueSheet
        isOpen={isRaiseIssueSheetOpen}
        onClose={() => setIsRaiseIssueSheetOpen(false)}
        stageTitle={stageForIssue?.title || ''}
        onSubmit={handleIssueSubmit}
    />
    </>
  );
}
