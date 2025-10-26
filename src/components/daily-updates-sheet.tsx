"use client";

import React, { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export interface DailyUpdate {
  id: string;
  date: string;
  uploadedBy: string;
  photos: string[];
  taskName: string;
  status: "pending" | "approved" | "rejected";
}

const DailyUpdateCard = ({
  update,
  onUpdate,
}: {
  update: DailyUpdate;
  onUpdate: (update: DailyUpdate) => void;
}) => {
  const handleApprove = () => {
    onUpdate({ ...update, status: "approved" });
  };

  const handleReject = () => {
    onUpdate({ ...update, status: "rejected" });
  };

  const formattedDate = new Date(update.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="rounded-[40px] border p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{update.taskName}</p>
          <p className="font-semibold text-lg">{formattedDate}</p>
          <p className="text-sm text-muted-foreground">
            Uploaded by {update.uploadedBy}
          </p>
        </div>
        {update.status === "pending" && (
          <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
        )}
        {update.status === "approved" && (
          <Badge className="bg-green-100 text-green-700">Approved</Badge>
        )}
        {update.status === "rejected" && (
          <Badge className="bg-red-100 text-red-700">Rejected</Badge>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {update.photos.map((photo, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={photo}
              alt={`Update photo ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      {update.status === "pending" && (
        <div className="flex gap-4 mt-4">
          <Button
            onClick={handleReject}
            variant="outline"
            className="flex-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive h-[54px] border-0 text-base md:text-lg"
          >
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            className="flex-1 rounded-full bg-primary hover:bg-primary/90 h-[54px] text-base md:text-lg"
          >
            Approve
          </Button>
        </div>
      )}
    </Card>
  );
};

interface DailyUpdatesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  dailyUpdates: DailyUpdate[];
  onUpdate: (update: DailyUpdate) => void;
}

export function DailyUpdatesSheet({
  isOpen,
  onClose,
  dailyUpdates,
  onUpdate,
}: DailyUpdatesSheetProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUpdates = useMemo(() => {
    const sortedUpdates = [...dailyUpdates].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (!searchTerm) return sortedUpdates;
    return sortedUpdates.filter(
      (update) =>
        update.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [dailyUpdates, searchTerm]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
      >
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="flex justify-between items-center">
            <span className="text-2xl font-semibold">Daily Updates</span>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-[54px] h-[54px] bg-background rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </SheetTitle>
          <div className="relative pt-4">
            <Search className="absolute left-4 top-1/2 -translate-y-0.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by task or member..."
              className="pl-12 h-14 rounded-full bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            {filteredUpdates.length > 0 ? (
              filteredUpdates.map((update) => (
                <DailyUpdateCard
                  key={update.id}
                  update={update}
                  onUpdate={onUpdate}
                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-full text-center py-10">
                No daily updates found.
              </p>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
