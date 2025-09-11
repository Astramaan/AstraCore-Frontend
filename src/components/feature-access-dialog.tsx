
'use client';

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { X, Search, Edit, Trash2 } from 'lucide-react';
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
    isEditingInitially?: boolean;
}

const permissionsData = {
    'Dashboard': ["Subscription Analytics", "Subscription Churn", "Active Customers", "Exit Survey"],
    'Onboarding Management': ["Subscription Analytics", "Subscription Churn", "Active Customers", "Exit Survey"],
    'Organisation Management': ["Subscription Plan Manage", "Active Customers", "Expired Customers"],
    'Subscription Management': ["Subscription Plan Manage", "Active Customers", "Expired Customers"],
    'Home': ["Assign Task", "Add New Member"],
    'Project Management': ["Projects", "Project Details", "Snag List", "Add Project", "Edit Project", "Delete Project", "Create Snag"],
    'Client & Lead Management': ["Leads", "Meetings", "Add Lead", "Edit Lead", "Delete Lead", "Create Meeting"],
    'Vendor Management': ["Vendors", "Add Vendor", "Edit Vendor"],
    'Team Management': ["Team", "Member Details", "Profile", "Subscription", "Create New Team"],
    'Settings': ["Change Password", "Role Access", "Create Role"],
};

const FeatureSectionEdit = ({ title, features, searchTerm, defaultEnabled = false }: { title: string, features: string[], searchTerm: string, defaultEnabled?: boolean }) => {
    const [isEnabled, setIsEnabled] = useState(defaultEnabled);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(defaultEnabled ? features : []);

    const handleFeatureToggle = (feature: string) => {
        setSelectedFeatures(prev => 
            prev.includes(feature) 
                ? prev.filter(f => f !== feature) 
                : [...prev, feature]
        );
    };

    const handleParentToggle = () => {
        if (defaultEnabled) return;
        const newState = !isEnabled;
        setIsEnabled(newState);
        setSelectedFeatures(newState ? features : []);
    }
    
    const filteredFeatures = useMemo(() => {
        if (!searchTerm.trim()) return features;
        return features.filter(feature =>
            feature.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [features, searchTerm]);
    
    const isSectionVisible = useMemo(() => {
        if (!searchTerm.trim()) return true;
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
                    return (
                        <div key={index} className="flex items-center">
                            <Checkbox 
                                id={`${title}-${feature}`} 
                                checked={isChecked}
                                onCheckedChange={() => handleFeatureToggle(feature)}
                                className="w-5 h-5 rounded"
                                disabled={!isEnabled}
                            />
                            <label
                                htmlFor={`${title}-${feature}`}
                                className={cn(
                                    "ml-2 text-sm font-medium leading-none", 
                                    isChecked ? 'text-black' : 'text-muted-foreground',
                                    !isEnabled ? 'cursor-not-allowed' : 'cursor-pointer'
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
};


const FeatureSectionView = ({ title, features }: { title: string, features: string[] }) => (
    <div className="space-y-2">
        <h4 className="font-semibold text-base">{title}</h4>
        <ul className="space-y-1">
            {features.map(feature => (
                <li key={feature} className="text-sm text-muted-foreground">{feature}</li>
            ))}
        </ul>
    </div>
);


export const FeatureAccessDialog = ({ isOpen, onClose, category, roleName, isEditingInitially = false }: FeatureAccessDialogProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(isEditingInitially);

    const handleClose = () => {
        setIsEditing(isEditingInitially); // Reset edit mode on close
        onClose();
    }
    
    const relevantPermissions = Object.fromEntries(
      Object.entries(permissionsData).filter(([key]) => key !== 'Home' && key !== 'Team Management' && key !== 'Settings' && key !== 'Project Management' && key !== 'Client & Lead Management' && key !== 'Vendor Management')
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md p-0 rounded-[50px] bg-white flex flex-col h-auto max-h-[90vh]">
                 <DialogHeader className="p-6 border-b">
                    <DialogTitle className="flex justify-between items-center">
                        <span className="text-2xl font-semibold">{roleName} {category}</span>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                
                {isEditing ? (
                    <>
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
                        <div className="flex-1 overflow-y-auto">
                            <ScrollArea className="h-full p-6">
                                <div className="space-y-4">
                                    <FeatureSectionEdit title="Home" features={permissionsData["Home"]} searchTerm={searchTerm} defaultEnabled />
                                    <FeatureSectionEdit title="Project Management" features={permissionsData["Project Management"]} searchTerm={searchTerm} />
                                    <FeatureSectionEdit title="Client & Lead Management" features={permissionsData["Client & Lead Management"]} searchTerm={searchTerm} />
                                    <FeatureSectionEdit title="Vendor Management" features={permissionsData["Vendor Management"]} searchTerm={searchTerm} />
                                    <FeatureSectionEdit title="Team Management" features={permissionsData["Team Management"]} searchTerm={searchTerm} defaultEnabled />
                                    <FeatureSectionEdit title="Settings" features={permissionsData["Settings"]} searchTerm={searchTerm} />
                                </div>
                            </ScrollArea>
                        </div>
                        <div className="px-6 py-4 mt-auto border-t">
                            <Button className="w-full h-14 rounded-full text-lg" onClick={() => {setIsEditing(false); onClose();}}>
                                Save Changes
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                         <ScrollArea className="flex-1 p-6">
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-muted-foreground">Features access</p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                    {Object.entries(relevantPermissions).map(([title, features]) => (
                                        <FeatureSectionView key={title} title={title} features={features} />
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                        <div className="px-6 py-4 mt-auto border-t flex items-center justify-end">
                            <Button className="h-14 rounded-full text-lg px-12" onClick={() => setIsEditing(true)}>
                                <Edit className="mr-2 h-4 w-4"/>
                                Edit
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
