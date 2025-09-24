

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Palette, Edit } from 'lucide-react';
import { BrandingSheet } from './branding-sheet';

export const BrandingWorkflowCard = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>
            <Card className="rounded-[50px] w-full">
                <CardHeader className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                                <Palette className="h-6 w-6"/>
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-semibold">Branding & Workflow</CardTitle>
                            </div>
                        </div>
                         <Button className="rounded-full h-14 w-auto px-10 text-lg" onClick={() => setIsSheetOpen(true)}>
                            <Edit className="mr-2 h-5 w-5"/>
                            Customize
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <BrandingSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
        </>
    );
};
