
'use client';

import React from 'react';
import Image from 'next/image';

export default function ExistingClientHomePage() {

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[50vh] -z-10">
        <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBob3VzZXxlbnwwfHx8fDE3NTk4NDU5ODR8MA"
            alt="Modern house background"
            layout="fill"
            objectFit="cover"
            className="object-top"
            data-ai-hint="modern house"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <main className="relative z-10">
          <div className="px-4 md:px-8 pt-8 space-y-8">
               {/* Content will go here */}
          </div>
      </main>
    </>
  );
}
