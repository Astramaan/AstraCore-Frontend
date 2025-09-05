
'use client';

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';

interface FeatureAccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    roleName: string;
}

const permissionsData = {
    'Home': ["Home"],
    'Project Management': ["Projects", "Project Details", "Snag List"],
    'Client & Lead Management': ["Leads", "Meetings"],
    'Vendor Management': ["Vendors"],
    'Team Management': ["Team", "Member Details", "Profile", "Subscription"],
    'Settings': ["Change Password", "Role Access"],
};

const FeatureSection = ({ title, features, searchTerm, defaultEnabled = false }: { title: string, features: string[], searchTerm: string, defaultEnabled?: boolean }) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(features);

    const handleFeatureToggle = (feature: string) => {
        if (defaultEnabled && (feature === 'Home' || feature === 'Profile')) return;
        setSelectedFeatures(prev => 
            prev.includes(feature) 
                ? prev.filter(f => f !== feature) 
                : [...prev, feature]
        );
    };

    const handleParentToggle = () => {
        if (defaultEnabled) return;
        setIsEnabled(!isEnabled);
        if (isEnabled) {
            // If it was enabled, we are disabling it, so clear selections
             const defaultFeatures = features.filter(f => f === 'Home' || f === 'Profile');
             setSelectedFeatures(defaultFeatures);
        } else {
            // If it was disabled, we are enabling it, so select all
            setSelectedFeatures(features);
        }
    }
    
    // Filter features based on search term
    const filteredFeatures = useMemo(() => {
        if (!searchTerm.trim()) return features;
        return features.filter(feature =>
            feature.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [features, searchTerm]);
    
    // Decide if the whole section should be visible
    const isSectionVisible = useMemo(() => {
        if (!searchTerm.trim()) return true;
        // Show section if its title matches or if any of its features match
        return title.toLowerCase().includes(searchTerm.toLowerCase()) || filteredFeatures.length > 0;
    }, [title, searchTerm, filteredFeatures]);

    if (!isSectionVisible) {
        return null;
    }

    return (
        <div className="space-y-4 rounded-3xl border p-4">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">{title}</h4>
                <Switch 
                    checked={isEnabled} 
                    onCheckedChange={handleParentToggle}
                    disabled={defaultEnabled}
                />
            </div>
            <div className={cn("grid grid-cols-2 gap-x-2 gap-y-4", !isEnabled && "opacity-50 pointer-events-none")}>
                {filteredFeatures.map((feature, index) => {
                    const isChecked = selectedFeatures.includes(feature);
                    const isDefault = defaultEnabled && (feature === 'Home' || feature === 'Profile');
                    return (
                        <div key={index} className="flex items-center">
                            <Checkbox 
                                id={`${title}-${feature}`} 
                                checked={isChecked}
                                onCheckedChange={() => handleFeatureToggle(feature)}
                                className="w-5 h-5 rounded"
                                disabled={isDefault || !isEnabled}
                            />
                            <label
                                htmlFor={`${title}-${feature}`}
                                className={cn(
                                    "ml-2 text-sm font-medium leading-none", 
                                    isChecked ? 'text-black' : 'text-muted-foreground',
                                    (isDefault || !isEnabled) ? 'cursor-not-allowed' : 'cursor-pointer'
                                )}
                            >
                                {feature}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export const FeatureAccessDialog = ({ isOpen, onClose, category, roleName }: FeatureAccessDialogProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px] bg-white flex flex-col h-auto max-h-[90vh]">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="flex justify-between items-center">
                        <span className="text-2xl font-semibold">Features for {category}</span>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 pb-0 space-y-4">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search Features" 
                            className="pl-12 h-14 rounded-full bg-background"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                        <FeatureSection title="Home" features={["Home"]} searchTerm={searchTerm} defaultEnabled/>
                        <FeatureSection title="Project Management" features={permissionsData["Project Management"]} searchTerm={searchTerm} />
                        <FeatureSection title="Client & Lead Management" features={permissionsData["Client & Lead Management"]} searchTerm={searchTerm} />
                        <FeatureSection title="Vendor Management" features={permissionsData["Vendor Management"]} searchTerm={searchTerm} />
                        <FeatureSection title="Team Management" features={permissionsData["Team Management"]} searchTerm={searchTerm} defaultEnabled/>
                        <FeatureSection title="Settings" features={permissionsData["Settings"]} searchTerm={searchTerm} />
                    </div>
                </ScrollArea>
                <div className="px-6 py-4 mt-auto border-t">
                    <Button className="w-full h-14 rounded-full text-lg" onClick={onClose}>
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
