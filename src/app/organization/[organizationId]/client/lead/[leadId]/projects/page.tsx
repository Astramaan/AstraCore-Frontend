"use client";

import Image from "next/image";
import { Youtube, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const completedProjects = [
  {
    name: "Arvind Kumar",
    location: "Bengaluru",
    area: "1200 Sq. Feet",
    type: "3BHK Duplex villa",
    orientation: "West",
    videoThumbnail: "https://picsum.photos/seed/project1/600/400",
    images: [
      "https://picsum.photos/seed/p1i1/100/100",
      "https://picsum.photos/seed/p1i2/100/100",
      "https://picsum.photos/seed/p1i3/100/100",
      "https://picsum.photos/seed/p1i4/100/100",
    ],
    testimonial:
      "habi has satisfied all my requirements and has done a very beautiful and quality construction. Their architects visited the site and made a convenient plan despite difficulties due to COVID 19. Overall we are very happy with the construction of our house.",
  },
  {
    name: "Arvind Kumar",
    location: "Bengaluru",
    area: "1200 Sq. Feet",
    type: "3BHK Duplex villa",
    orientation: "West",
    videoThumbnail: "https://picsum.photos/seed/project2/600/400",
    images: [
      "https://picsum.photos/seed/p2i1/100/100",
      "https://picsum.photos/seed/p2i2/100/100",
      "https://picsum.photos/seed/p2i3/100/100",
      "https://picsum.photos/seed/p2i4/100/100",
    ],
    testimonial:
      "habi has satisfied all my requirements and has done a very beautiful and quality construction. Their architects visited the site and made a convenient plan despite difficulties due to COVID 19. Overall we are very happy with the construction of our house.",
  },
];

const ongoingProjects = [
  {
    name: "Arvind Kumar",
    location: "Bengaluru",
    area: "1200 Sq. Feet",
    type: "3BHK Duplex villa",
    orientation: "West",
    mainImage: "https://picsum.photos/seed/project3/600/400",
    images: [
      "https://picsum.photos/seed/p3i1/100/100",
      "https://picsum.photos/seed/p3i2/100/100",
      "https://picsum.photos/seed/p3i3/100/100",
      "https://picsum.photos/seed/p3i4/100/100",
    ],
  },
  {
    name: "Arvind Kumar",
    location: "Bengaluru",
    area: "1200 Sq. Feet",
    type: "3BHK Duplex villa",
    orientation: "West",
    mainImage: "https://picsum.photos/seed/project4/600/400",
    images: [
      "https://picsum.photos/seed/p4i1/100/100",
      "https://picsum.photos/seed/p4i2/100/100",
      "https://picsum.photos/seed/p4i3/100/100",
      "https://picsum.photos/seed/p4i4/100/100",
    ],
  },
];

const ImagePreviewDialog = ({
  open,
  onOpenChange,
  images,
  startIndex = 0,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  startIndex?: number;
  title: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col rounded-[50px] bg-background">
        <DialogHeader className="p-4 border-b flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-1 p-6 flex items-center justify-center">
          <Carousel
            opts={{
              startIndex: startIndex,
              loop: true,
            }}
            className="w-full max-w-lg"
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video">
                    <Image
                      src={src}
                      layout="fill"
                      objectFit="contain"
                      alt={`${title} image ${index + 1}`}
                      className="rounded-[10px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProjectCard = ({
  project,
  isCompleted,
  onImageClick,
  className,
}: {
  project: any;
  isCompleted: boolean;
  onImageClick: (images: string[], index: number) => void;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-card rounded-[50px] p-6 space-y-4 text-card-foreground",
      className,
    )}
  >
    <div className="flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-64 h-40 bg-muted rounded-[30px] flex items-center justify-center shrink-0">
        {isCompleted ? (
          <>
            <Image
              src={project.videoThumbnail}
              alt={project.name}
              width={600}
              height={400}
              className="object-cover rounded-[30px] w-full h-full"
              data-ai-hint="house exterior"
            />
            <div className="absolute inset-0 bg-black/30 rounded-[30px]"></div>
            <Button
              variant="ghost"
              className="w-16 h-16 bg-red-600/50 rounded-full flex items-center justify-center hover:bg-red-600/70 absolute z-10"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 4V20L20 12L7 4Z" fill="white" />
              </svg>
            </Button>
          </>
        ) : (
          <Image
            src={project.mainImage}
            alt={project.name}
            width={600}
            height={400}
            className="object-cover rounded-[30px] w-full h-full"
            data-ai-hint="modern house"
          />
        )}
      </div>
      <div className="space-y-1 text-muted-foreground">
        <h3 className="text-xl font-semibold text-foreground">
          {project.name}
        </h3>
        <p>{project.location}</p>
        <Separator className="my-2" />
        <p>{project.area}</p>
        <p>{project.type}</p>
        <p>Orientation: {project.orientation}</p>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {project.images.map((img: string, i: number) => (
        <div
          key={i}
          className="relative w-full h-24 cursor-pointer"
          onClick={() => onImageClick(project.images, i)}
        >
          <Image
            src={img}
            alt={`Project image ${i + 1}`}
            fill
            className="object-cover rounded-[10px]"
            data-ai-hint="house interior"
          />
        </div>
      ))}
    </div>
    {isCompleted && (
      <p className="text-muted-foreground pt-2">{project.testimonial}</p>
    )}
  </div>
);

export default function ProjectsPage() {
  const [previewState, setPreviewState] = useState<{
    open: boolean;
    images: string[];
    startIndex: number;
    title: string;
  }>({ open: false, images: [], startIndex: 0, title: "" });

  const handleImageClick = (
    images: string[],
    index: number,
    projectName: string,
  ) => {
    setPreviewState({
      open: true,
      images,
      startIndex: index,
      title: projectName,
    });
  };

  const closePreview = () => {
    setPreviewState({ open: false, images: [], startIndex: 0, title: "" });
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-none mx-auto p-4 md:p-8 space-y-8 pt-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-left text-foreground">
            Completed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedProjects.map((p, i) => (
              <ProjectCard
                key={i}
                project={p}
                isCompleted={true}
                onImageClick={(images, index) =>
                  handleImageClick(images, index, p.name)
                }
              />
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-left text-foreground">
            Ongoing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ongoingProjects.map((p, i) => (
              <ProjectCard
                key={i}
                project={p}
                isCompleted={false}
                onImageClick={(images, index) =>
                  handleImageClick(images, index, p.name)
                }
              />
            ))}
          </div>
        </div>
      </main>

      <ImagePreviewDialog
        open={previewState.open}
        onOpenChange={(open) => !open && closePreview()}
        images={previewState.images}
        startIndex={previewState.startIndex}
        title={previewState.title}
      />
    </div>
  );
}
