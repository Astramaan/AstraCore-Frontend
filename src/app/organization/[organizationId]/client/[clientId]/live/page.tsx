
'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';

export default function LivePage() {
  return (
    <div className="p-4 md:p-8">
      <div className="text-center mb-4">
        <p className="text-lg text-muted-foreground">We are working on the Live Footage.</p>
      </div>
      <Card className="rounded-[50px] overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/m52ynxtmOo?si=KlBbrybxtREhLrr_"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
