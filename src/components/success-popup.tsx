
'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Check, X } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

export function SuccessPopup({ isOpen, onClose, title, message }: SuccessPopupProps) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-[50px] p-8 m-10">
                 <DialogHeader>
                    <DialogTitle className="sr-only">{title}</DialogTitle>
                </DialogHeader>
                <div className="text-center flex flex-col items-center">
                    <div className="relative mb-6 flex items-center justify-center">
                      <div className="w-20 h-20 bg-lime-600/5 rounded-full" />
                      <div className="w-14 h-14 bg-lime-600/20 rounded-full absolute" />
                      <div className="w-10 h-10 bg-primary/20 absolute flex items-center justify-center rounded-full">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-lg font-medium text-zinc-900 mb-2">{title}</h2>
                    <p className="text-sm text-neutral-500 max-w-xs mx-auto">{message}</p>
                </div>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </DialogContent>
        </Dialog>
    );
}
