
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, Palette, Save } from 'lucide-react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';

const ColorInput = ({ label, color, setColor }: { label: string, color: string, setColor: (color: string) => void }) => (
    <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-full border">
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-full opacity-0 cursor-pointer absolute inset-0"
            />
            <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
    </div>
);


export const BrandingWorkflowCard = () => {
    const { toast } = useToast();
    const [logo, setLogo] = useState<string | null>('/logo-placeholder.svg');
    const [primaryColor, setPrimaryColor] = useState('#0FB4C3');
    const [backgroundColor, setBackgroundColor] = useState('#F2F2F2');
    const [accentColor, setAccentColor] = useState('#B9E3D5');

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setLogo(URL.createObjectURL(file));
        }
    };
    
    const handleSave = () => {
        // In a real app, you would save these to a backend
        document.documentElement.style.setProperty('--primary', primaryColor.substring(1));
        document.documentElement.style.setProperty('--background', backgroundColor.substring(1));
        document.documentElement.style.setProperty('--accent', accentColor.substring(1));
        
        toast({
            title: "Branding Updated",
            description: "Your branding changes have been applied.",
        })
    }

    return (
        <Card className="rounded-[50px] w-full">
            <CardHeader className="p-6">
                <div className="flex items-center gap-2">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                        <Palette className="h-6 w-6"/>
                    </div>
                    <CardTitle className="text-2xl font-semibold">Branding & Workflow</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-6">
                <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24">
                        <Image src={logo || '/logo-placeholder.svg'} alt="Company Logo" layout="fill" className="rounded-full object-cover" />
                    </div>
                    <label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 text-primary">
                            <Upload className="h-5 w-5" />
                            <span className="font-medium">Upload Logo</span>
                        </div>
                        <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                    </label>
                </div>
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-grey-1">Theme Colors</h4>
                    <div className="flex flex-wrap gap-6">
                        <ColorInput label="Primary" color={primaryColor} setColor={setPrimaryColor} />
                        <ColorInput label="Background" color={backgroundColor} setColor={setBackgroundColor} />
                        <ColorInput label="Accent" color={accentColor} setColor={setAccentColor} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="rounded-full h-14 px-10 text-lg" onClick={handleSave}>
                        <Save className="mr-2 h-5 w-5"/>
                        Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
