
'use client';

import React from 'react';
import Image from 'next/image';
import { ProjectInfoHeader } from '@/components/project-info-header';
import { ClientHeader } from '@/components/client-header';

const project = {
    name: 'Gokula',
    pm: 'Yaswanth',
    id: 'RABE0001',
    progress: 70,
    daysLeft: 180,
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBob3VzZXxlbnwwfHx8fDE3NTk4NDU5ODR8MA',
    profileImage: 'https://placehold.co/60x60',
    pmPhoneNumber: '9876543210',
    siteImages: [
        "https://picsum.photos/seed/site1/600/400",
        "https://picsum.photos/seed/site2/600/400",
        "https://picsum.photos/seed/site3/600/400",
        "https://picsum.photos/seed/site4/600/400",
        "https://picsum.photos/seed/site5/600/400",
        "https://picsum.photos/seed/site6/600/400",
    ]
};

export default function ExistingClientHomePage() {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 h-[50vh] -z-10">
          <Image
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBob3VzZXxlbnwwfHx8fDE3NTk4NDU5ODR8MA"
              alt="background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className=""
              data-ai-hint="modern house"
              priority
          />
          <div className="absolute inset-0 bg-black/10" />
      </div>
       <div className="relative mb-8">
            <ProjectInfoHeader project={project}>
                <div className="p-4">
                    <ClientHeader />
                </div>
            </ProjectInfoHeader>
        </div>
        <div className="relative z-10 -mt-32 rounded-t-[50px] bg-background px-4 md:px-8 pt-8">
            {/* Page content goes here */}
        </div>
    </div>
  );
}
