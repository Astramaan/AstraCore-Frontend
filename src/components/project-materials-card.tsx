
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import Image from 'next/image';

interface Material {
    name: string;
    image: string;
    description: string;
}

interface ProjectMaterialsCardProps {
    materials: Material[];
}


export const ProjectMaterialsCard = ({ materials }: ProjectMaterialsCardProps) => {
    return (
        <Card className="rounded-[50px] p-10 border-0">
            <CardHeader className="p-0">
                 <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Materials</h3>
                    <Button variant="link" className="text-cyan-500 p-0 h-auto">
                        View more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 mt-6 space-y-4">
                {materials.map((material, index) => (
                     <React.Fragment key={index}>
                        <div className="flex gap-4">
                            <Image src={material.image} alt={material.name} width={67} height={67} className="rounded-[10px] border border-stone-300" data-ai-hint="construction material" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{material.name}</p>
                                <p className="text-xs text-stone-400 line-clamp-3">{material.description}</p>
                            </div>
                        </div>
                        {index < materials.length - 1 && <Separator />}
                     </React.Fragment>
                ))}
            </CardContent>
        </Card>
    );
};
