
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, Palette, Save, Edit, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';

const ColorInput = ({ label, color, setColor, disabled }: { label: string, color: string, setColor: (color: string) => void, disabled: boolean }) => (
    <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-full border" style={{ backgroundColor: color }}>
             <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-full opacity-0 cursor-pointer absolute inset-0"
                disabled={disabled}
            />
        </div>
        <Input 
            type="text" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-32"
            placeholder="#0FB4C3"
            disabled={disabled}
        />
    </div>
);


export const BrandingWorkflowCard = () => {
    const { toast } = useToast();
    const [logo, setLogo] = useState<string | null>('/logo-placeholder.svg');
    const [primaryColor, setPrimaryColor] = useState('#0FB4C3');
    const [isEditing, setIsEditing] = useState(false);

    const [tempLogo, setTempLogo] = useState(logo);
    const [tempPrimaryColor, setTempPrimaryColor] = useState(primaryColor);


    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setTempLogo(URL.createObjectURL(file));
        }
    };
    
    const handleEdit = () => {
        setTempLogo(logo);
        setTempPrimaryColor(primaryColor);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        setLogo(tempLogo);
        setPrimaryColor(tempPrimaryColor);
        
        const hexToHsl = (hex: string): string => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (!result) return '0 0% 0%';
            let r = parseInt(result[1], 16) / 255;
            let g = parseInt(result[2], 16) / 255;
            let b = parseInt(result[3], 16) / 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h=0, s=0, l = (max + min) / 2;
            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
        };

        document.documentElement.style.setProperty('--primary', hexToHsl(tempPrimaryColor));
        
        toast({
            title: "Branding Updated",
            description: "Your branding changes have been applied.",
        })
        setIsEditing(false);
    }

    return (
        <Card className="rounded-[50px] w-full">
            <CardHeader className="p-6">
                <div className="flex items-center gap-2">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                        <Palette className="h-6 w-6"/>
                    </div>
                    <CardTitle className="text-2xl font-semibold">Branding</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                 <div className="flex items-center gap-6">
                    <div className="relative w-16 h-16 rounded-full border border-border">
                        <Image src={isEditing ? tempLogo ?? '' : logo ?? ''} alt="Company Logo" layout="fill" className="rounded-full object-cover" />
                    </div>
                    <label htmlFor="logo-upload" className={!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}>
                        <div className="flex items-center gap-2 text-primary">
                            <Upload className="h-5 w-5" />
                            <span className="font-medium">Upload Logo</span>
                        </div>
                        <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={!isEditing}/>
                    </label>
                </div>
                <div className="flex items-center gap-4">
                    <h4 className="text-lg font-medium text-grey-1">Theme Colors</h4>
                    <ColorInput label="Primary" color={isEditing ? tempPrimaryColor : primaryColor} setColor={setTempPrimaryColor} disabled={!isEditing}/>
                </div>

                <div className="w-full md:w-auto">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <Button variant="ghost" className="rounded-full h-14 w-full md:w-auto px-10 text-lg" onClick={handleCancel}>
                                <X className="mr-2 h-5 w-5"/>
                                Cancel
                            </Button>
                            <Button className="rounded-full h-14 w-full md:w-auto px-10 text-lg" onClick={handleSave}>
                                <Save className="mr-2 h-5 w-5"/>
                                Save Changes
                            </Button>
                        </div>
                    ) : (
                        <Button className="rounded-full h-14 w-full md:w-auto px-10 text-lg" onClick={handleEdit}>
                            <Edit className="mr-2 h-5 w-5"/>
                            Customize
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
