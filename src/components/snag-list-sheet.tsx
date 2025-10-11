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
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { SnagDetailsSheet, type Snag } from "./snag-details-sheet";

interface SnagListSheetProps {
  isOpen: boolean;
  onClose: () => void;
  snags: Snag[];
  projectId: string;
}

const SnagCard = ({
  snag,
  onClick,
}: {
  snag: Snag;
  onClick: (snag: Snag) => void;
}) => (
  <Card
    className="rounded-[40px] border p-6 cursor-pointer hover:shadow-lg"
    onClick={() => onClick(snag)}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="font-semibold text-lg">{snag.title}</p>
        <p className="text-sm text-muted-foreground">{snag.createdBy}</p>
      </div>
      <Badge className={cn("text-base", snag.statusColor)} variant="outline">
        {snag.status}
      </Badge>
    </div>
    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
      {snag.description}
    </p>
    <Separator className="my-4" />
    <div className="flex justify-between items-center">
      <p className="text-xs text-muted-foreground">
        {new Date(snag.createdAt).toLocaleDateString()}
      </p>
      <div className="flex items-center gap-2">
        {snag.images.map((img, i) => (
          <Image
            key={i}
            src={img}
            width={40}
            height={40}
            alt="Snag image"
            className="rounded-md"
          />
        ))}
      </div>
    </div>
  </Card>
);

export function SnagListSheet({
  isOpen,
  onClose,
  snags,
  projectId,
}: SnagListSheetProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSnag, setSelectedSnag] = useState<Snag | null>(null);

  const filteredSnags = useMemo(() => {
    const projectSnags = snags.filter((snag) => snag.projectId === projectId);
    if (!searchTerm) return projectSnags;
    return projectSnags.filter(
      (snag) =>
        snag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snag.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [snags, projectId, searchTerm]);

  const handleSnagClick = (snag: Snag) => {
    setSelectedSnag(snag);
  };

  const handleSnagSheetClose = () => {
    setSelectedSnag(null);
  };

  const handleUpdateSnag = (updatedSnag: Snag) => {
    // This is where you would update the state of the snags array
    // For now, we'll just update the selectedSnag for the open sheet
    setSelectedSnag(updatedSnag);
  };

  const handleDeleteSnag = () => {
    // This is where you would update the state of the snags array
    setSelectedSnag(null);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="bottom"
          className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-2xl md:mx-auto rounded-t-[50px] border-none"
        >
          <SheetHeader className="p-6 border-b shrink-0">
            <SheetTitle className="flex justify-between items-center">
              <span className="text-2xl font-semibold">Snag List</span>
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
                placeholder="Search snags..."
                className="pl-12 h-14 rounded-full bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </SheetHeader>
          <ScrollArea className="flex-1">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSnags.length > 0 ? (
                filteredSnags.map((snag) => (
                  <SnagCard
                    key={snag.id}
                    snag={snag}
                    onClick={handleSnagClick}
                  />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center py-10">
                  No snags found for this project.
                </p>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <SnagDetailsSheet
        isOpen={!!selectedSnag}
        onClose={handleSnagSheetClose}
        snag={selectedSnag}
        onDelete={handleDeleteSnag}
        onUpdate={handleUpdateSnag}
      />
    </>
  );
}
