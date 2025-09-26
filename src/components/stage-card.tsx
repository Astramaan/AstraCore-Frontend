
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

export const StageCard = ({ stage, onReopen, onRaiseIssue, className, isOpen, onToggle }: { stage: TimelineStage, onReopen?: (stage: TimelineStage) => void, onRaiseIssue: (stage: TimelineStage) => void, className?: string, isOpen: boolean, onToggle: () => void }) => {
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
                whileHover={hasAttachments ? { scale: 1.03 } : {}}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
                className={cn(
                    "rounded-[24px] bg-white transition-shadow p-4",
                    className,
                    hasAttachments ? "cursor-pointer hover:shadow-lg" : "cursor-default"
                )}
                onClick={hasAttachments ? onToggle : undefined}
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
                <AnimatePresence>
                    {isOpen && hasAttachments && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ ease: "easeInOut", duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {(stage.status === 'On Going' || stage.status === 'completed') && (
                                <div className="mt-4 space-y-4">
                                    <Separator />
                                     <div className="pt-2 space-y-2">
                                        {stage.approvalDate && (
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-muted-foreground">Approved on {new Date(stage.approvalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                <button onClick={() => onRaiseIssue(stage)} className="text-sm text-primary underline">Raise issue</button>
                                            </div>
                                        )}

                                        {stage.documents && stage.documents.length > 0 && (
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
                                        )}
                                        
                                        {stage.siteImages && stage.siteImages.length > 0 && (
                                            <div className="grid grid-cols-4 gap-2 pt-2">
                                                {stage.siteImages?.map((img, index) => (
                                                    <Image key={index} src={img} width={100} height={100} alt={`Site image ${index + 1}`} className="rounded-[15px] object-cover aspect-square" data-ai-hint="construction site photo" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {isProjectManager && stage.status === 'On Going' && (
                                        <div className="flex gap-4">
                                            <Button variant="outline" className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg">Reject</Button>
                                            <Button className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg">Approve</Button>
                                        </div>
                                    )}
                                    {isProjectManager && stage.status === 'completed' && (
                                        <div className="flex justify-end pt-2">
                                            <Button variant="outline" size="sm" className="rounded-full" onClick={(e) => {e.stopPropagation(); onReopen?.(stage);}}>Reopen</Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
             <PdfPreviewDialog 
                open={!!selectedPdf} 
                onOpenChange={(open) => !open && setSelectedPdf(null)} 
                file={selectedPdf} 
            />
        </>
    )
};
