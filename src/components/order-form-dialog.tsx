
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Send } from 'lucide-react';
import type { Vendor } from '@/app/organization/vendors/page';
import { cn } from '@/lib/utils';

interface OrderFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor | null;
  materialName: string;
}

export function OrderFormDialog({ isOpen, onClose, vendor, materialName }: OrderFormDialogProps) {
  const [quantity, setQuantity] = useState('');

  const handleSendWhatsApp = () => {
    if (!vendor || !quantity) return;
    const message = `Hello ${vendor.companyName},\n\nI would like to place an order for the following material:\n\nMaterial: ${materialName}\nQuantity: ${quantity}\n\nPlease confirm the availability and total cost.\n\nThank you!`;
    const whatsappUrl = `https://wa.me/91${vendor.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!vendor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span className="text-xl">Order from {vendor.companyName}</span>
            <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
                    <X className="h-4 w-4" />
                </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="material" className={cn("text-lg font-medium px-2", materialName ? 'text-grey-1' : 'text-zinc-900')}>Material</Label>
            <Input id="material" value={materialName} readOnly className="h-14 bg-background rounded-full px-5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity" className={cn("text-lg font-medium px-2", quantity ? 'text-grey-1' : 'text-zinc-900')}>Quantity</Label>
            <Input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 100 bags, 5 tons"
              className="h-14 bg-background rounded-full px-5"
            />
          </div>
          <Button onClick={handleSendWhatsApp} className="w-full h-14 rounded-full text-lg">
            <Send className="mr-2 h-4 w-4" />
            order now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
