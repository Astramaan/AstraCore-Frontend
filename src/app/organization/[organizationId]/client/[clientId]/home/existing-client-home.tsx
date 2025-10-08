
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ExistingClientHomePage() {
  const project = {
    name: 'Gokula',
    id: 'RABE0001',
    progress: 70,
  };

  return (
    <div className="relative z-10 -mt-20 md:-mt-24 rounded-t-[50px] bg-background px-4 md:px-8 pt-8">
        <Card className="rounded-[50px] bg-card text-card-foreground p-6 mb-8">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                        <p className="text-muted-foreground">{project.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Project Manager</p>
                        <p className="text-base font-semibold text-foreground">Yaswanth</p>
                    </div>
                </div>
                <div className="bg-background/50 backdrop-blur-sm p-3 rounded-full">
                    <div className="flex items-center gap-4">
                        <Progress value={project.progress} className="h-2 flex-1" />
                        <span className="text-foreground font-semibold text-sm">{project.progress}% completed</span>
                    </div>
                </div>
            </div>
        </Card>
        {/* The rest of the page content will go here */}
    </div>
  );
}
