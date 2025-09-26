
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { ClientHeader } from '@/components/client-header';

export default function LivePage() {
  return (
    <>
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm p-4">
        <ClientHeader />
      </header>
      <div className="p-4 md:p-8">
        <div className="text-center mb-4">
          <p className="text-lg text-muted-foreground">We are working on the Live Footage.</p>
        </div>
        <Card className="rounded-[50px] overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video bg-black">
              <video
                className="w-full h-full"
                src="/video/Live.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
