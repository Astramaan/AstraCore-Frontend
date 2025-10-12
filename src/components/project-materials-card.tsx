"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { MaterialsSheet } from "./materials-sheet";

interface Material {
  name: string;
  image: string;
  description: string;
}

interface ProjectMaterialsCardProps {
  materials: Material[];
}

export const ProjectMaterialsCard = ({
  materials,
}: ProjectMaterialsCardProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Card className="rounded-[50px] p-10 border-0 bg-card">
        <CardContent className="p-0">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Materials</h3>
            <Button
              variant="link"
              className="text-primary p-0 h-auto"
              onClick={() => setIsSheetOpen(true)}
            >
              View more <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
        <CardContent className="p-0 mt-6 space-y-4">
          {materials.slice(0, 3).map((material, index) => (
            <React.Fragment key={index}>
              <div className="flex gap-4">
                <Image
                  src={material.image}
                  alt={material.name}
                  width={67}
                  height={67}
                  className="rounded-[10px] border border-border"
                  data-ai-hint="construction material"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">{material.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {material.description}
                  </p>
                </div>
              </div>
              {index < materials.slice(0, 3).length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
      <MaterialsSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        materials={materials}
      />
    </>
  );
};
