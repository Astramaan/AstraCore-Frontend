
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
          <div className="aspect-video bg-black flex items-center justify-center">
            <div className="text-center text-white">
                <Video className="w-16 h-16 mx-auto mb-4" />
                <p>Live video feed placeholder</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
