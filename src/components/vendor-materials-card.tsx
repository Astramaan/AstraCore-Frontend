
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Search, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';

const MaterialItem = ({ material }: { material: any }) => (
    <div className="flex items-center gap-4 p-4">
        <Image src={material.image} width={100} height={100} alt={material.name} className="rounded-[25px] border border-stone-300" data-ai-hint="product image"/>
        <div className="flex-1 space-y-1">
            <p className="font-semibold">{material.name}</p>
            <p className="text-sm text-muted-foreground line-clamp-3">{material.description}</p>
        </div>
        <p className="font-medium text-lg">{material.price}</p>
        <button><MoreVertical className="w-5 h-5 text-muted-foreground"/></button>
    </div>
);

export const VendorMaterialsCard = ({ materials }: { materials: any[] }) => {
    return (
        <Card className="rounded-[50px] p-10">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Materials</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                    <Input placeholder="Search materials" className="pl-12 h-12 rounded-[10px] border-stone-300" />
                </div>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {materials.map((material, index) => (
                        <React.Fragment key={material.id}>
                           <MaterialItem material={material} />
                           {index < materials.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
