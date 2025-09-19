
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface InPersonConsultationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function InPersonConsultationDialog({ isOpen, onOpenChange }: InPersonConsultationDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-slate-50 rounded-[20px] p-8">
                <DialogHeader>
                    <DialogTitle className="sr-only">In-Person Consultation</DialogTitle>
                     <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-6 w-6">
                           <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex flex-col items-center gap-8">
                    <div className="text-center">
                        <Button className="w-80 h-auto py-5 px-10 bg-primary rounded-2xl text-lg text-primary-foreground leading-tight">Visit Our Office</Button>
                        <p className="text-stone-400 text-sm mt-2">Meet with a Project specialist at our office.</p>
                    </div>
                    <div className="text-center">
                        <Button className="w-80 h-auto py-5 px-10 bg-primary rounded-2xl text-lg text-primary-foreground leading-tight">Home Visit</Button>
                        <p className="text-stone-400 text-sm mt-2">A project specialist will visit your location.</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
