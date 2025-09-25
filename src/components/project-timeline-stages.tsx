

'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useUser } from '@/context/user-context';
import PdfIcon from './icons/pdf-icon';
import { Dialog, DialogHeader, DialogTitle, DialogClose, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';
import { Separator } from './ui/separator';
import { Stage as TaskStage } from './project-task-card'; // Renaming to avoid conflict

export interface CustomStage extends TaskStage {
    type: 'stage' | 'payment';
    siteImages?: string[];
    approvalDate?: string;
    documents?: { name: string; url: string }[];
}

const allStages: CustomStage[] = [
    { id: 1, title: 'Design Presentation', subtitle: 'Architectural Design', category: 'Design', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'completed', type: 'stage', createdBy: 'Anil Kumar', createdAt: new Date().toISOString(), description: 'Design presentation details', priority: 'Low' },
    { id: 2, title: "1% Of Over all Quote", subtitle: 'Payment Due', category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'completed', type: 'payment', createdBy: 'Anil Kumar', createdAt: new Date().toISOString(), description: 'Payment details', priority: 'High' },
    { 
        id: 4, 
        title: 'Excavation', 
        subtitle: 'Excavation Stage', 
        category: 'Civil', 
        image: 'https://placehold.co/100x100.png', 
        duration: '2 Days', 
        status: 'ongoing', 
        type: 'stage',
        siteImages: [
            "https://placehold.co/150x150.png",
            "https://placehold.co/150x150.png",
            "https://placehold.co/150x150.png",
            "https://placehold.co/150x150.png",
        ],
        createdBy: 'Yaswanth',
        createdAt: new Date().toISOString(),
        description: 'Excavation details',
        priority: 'High'
    },
    { id: 5, title: 'Grid Marking', subtitle: 'Excavation Stage', category: 'Civil', image: 'https://placehold.co/100x100.png', duration: '2 Days', status: 'upcoming', type: 'stage', createdBy: 'Site Supervisor', createdAt: new Date().toISOString(), description: 'Grid marking details', priority: 'Medium' },
    { id: 6, title: "20% Payment", subtitle: "Milestone Payment", category: 'Finance', image: 'https://placehold.co/100x100.png', duration: '-', status: 'pending', type: 'payment', createdBy: 'System', createdAt: new Date().toISOString(), description: '20% milestone payment', priority: 'High' },
];


const PdfPreviewDialog = ({ open, onOpenChange, file }: { open: boolean; onOpenChange: (open: boolean) => void; file: { name: string, url: string } | null }) => {
    if (!file) return null;
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

const StageCard = ({ stage, onReopen, className }: { stage: CustomStage, onReopen?: (stage: CustomStage) => void, className?: string }) => {
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
                                            stage.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : 
                                            stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-600'
                                        )}>{stage.status === 'completed' ? 'Completed' : stage.status}</Badge>
                                    </div>
                                    <p className="text-sm">{stage.subtitle}</p>
                                    <div className="pt-2">
                                        <Progress value={stage.progress || 0} className="h-2" />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-black text-xs font-normal">{stage.progress || 0}%</span>
                                            <span className="text-grey-1 text-xs">{new Date(stage.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                        {(stage.status === 'ongoing' && stage.documents && stage.documents.length > 0) && (
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
                                                <Image key={index} src={img} width={100} height={100} alt={`Site image ${index + 1}`} className="rounded-[15px] object-cover aspect-square" data-ai-hint="construction site photo" />
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


export const ProjectTimelineStages = ({ stages }: { stages?: CustomStage[] }) => {
    const displayStages = stages || allStages;
    return (
        <Card className="rounded-[50px] p-0 border-none shadow-none bg-transparent">
            <CardContent className="p-0">
                <div className="w-full space-y-4">
                    {displayStages.map((stage) => <StageCard key={stage.id} stage={stage} />)}
                </div>
            </CardContent>
        </Card>
    );
};
