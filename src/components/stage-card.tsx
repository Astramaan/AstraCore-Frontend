
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import PdfIcon from '@/components/icons/pdf-icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogClose, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useUser } from '@/context/user-context';

export interface TimelineStage {
    id: number;
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

export const StageCard = ({ 
    stage, 
    onCardClick,
    className 
}: { 
    stage: TimelineStage, 
    onCardClick?: (stage: TimelineStage) => void,
    className?: string
}) => {
    const { user } = useUser();
    const isProjectManager = user?.team === 'Project Manager';
    const [selectedPdf, setSelectedPdf] = useState<{ name: string, url: string } | null>(null);

    const handlePdfClick = (e: React.MouseEvent, doc: { name: string, url: string }) => {
        e.stopPropagation();
        setSelectedPdf(doc);
    };

    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick(stage);
        }
    }

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
                className={cn(
                    "rounded-[24px] bg-white dark:bg-card transition-shadow p-4 cursor-pointer hover:shadow-lg",
                    className,
                )}
                onClick={handleCardClick}
            >
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
                                    stage.status === 'On Going' ? 'bg-blue-100 text-blue-700' : 
                                    stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-600'
                                )}>{stage.status === 'completed' ? 'Completed' : stage.status}</Badge>
                            </div>
                            <p className="text-sm">{stage.subtitle}</p>
                            <div className="pt-2">
                                <Progress value={stage.progress} className="h-2" />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-foreground text-xs font-normal">{stage.progress}%</span>
                                    <span className="text-grey-1 text-xs">{stage.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
             <PdfPreviewDialog 
                open={!!selectedPdf} 
                onOpenChange={(open) => !open && setSelectedPdf(null)} 
                file={selectedPdf} 
            />
        </>
    )
};

    