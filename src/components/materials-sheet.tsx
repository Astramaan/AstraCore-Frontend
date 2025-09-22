
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface Material {
    name: string;
    image: string;
    description: string;
}

interface MaterialsSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    materials: Material[];
}

export const MaterialsSheet = ({ open, onOpenChange, materials }: MaterialsSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
          side="bottom"
          className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-4 border-b flex-row items-center justify-between">
          <SheetTitle>All Materials</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-background w-[54px] h-[54px]">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            {materials.map((material, index) => (
              <React.Fragment key={index}>
                <div className="flex gap-4">
                    <Image src={material.image} alt={material.name} width={80} height={80} className="rounded-[10px] border border-stone-300" data-ai-hint="construction material" />
                    <div className="flex-1">
                        <p className="text-lg font-medium">{material.name}</p>
                        <p className="text-sm text-stone-500">{material.description}</p>
                    </div>
                </div>
                {index < materials.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
