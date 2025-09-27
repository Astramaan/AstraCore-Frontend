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
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { ProjectInfoHeader } from '@/components/project-info-header';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ChatCard = ({ pmPhoneNumber }: { pmPhoneNumber: string }) => (
    <Card className="rounded-full">
        <a href={`https://wa.me/91${pmPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 gap-2">
            <div className="text-left">
                <p className="text-black text-sm font-normal">Chat with our Executive</p>
                <p className="text-grey-1 text-xs">Quick Reply</p>
            </div>
            <div className="grid place-items-center h-10 w-10 rounded-full bg-white">
                <WhatsappIcon className="w-6 h-6" />
            </div>
        </a>
    </Card>
);

const SitePhotos = ({ onViewMore, onImageClick, siteImages }: { onViewMore: () => void, onImageClick: (index: number) => void, siteImages: string[] }) => {
    return (
        <Card className="rounded-[50px] w-full">
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
    <Card className="rounded-full cursor-pointer">
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
  const params = useParams();
  const organizationId = params.organizationId as string;
  const clientId = params.clientId as string;
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [previewState, setPreviewState] = useState<{ open: boolean, startIndex: number }>({ open: false, startIndex: 0 });

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
  
  const openImagePreview = (index: number) => {
    setPreviewState({ open: true, startIndex: index });
  };

  const closeImagePreview = () => {
      setPreviewState({ open: false, startIndex: 0 });
  };


  return (
    <>
    <main>
       <div className="relative mb-8">
            <ProjectInfoHeader project={project}>
                <div className="p-4">
                    <ClientHeader />
                </div>
            </ProjectInfoHeader>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8 px-4 md:px-8">
            <div className="md:col-span-3 lg:col-span-4 order-2 md:order-1">
                 <Link href={`/organization/${organizationId}/client/${clientId}/stages`}>
                    <Card className="rounded-[40px] bg-white transition-shadow p-6 cursor-pointer hover:shadow-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold">Project Stages</h3>
                                <p className="text-muted-foreground">View all tasks and progress</p>
                            </div>
                            <Button variant="ghost" size="icon"><X className="transform rotate-45" /></Button>
                        </div>
                    </Card>
                </Link>
            </div>

            <aside className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 order-1 md:order-2">
                 <div className="flex flex-col gap-4">
                    <PaymentsDialog>
                        <div className="w-full">
                           <PaymentCard />
                        </div>
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
    </>
  );
}
