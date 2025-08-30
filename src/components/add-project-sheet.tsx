
'use client';

import React, { useState, useActionState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusCircle, X, ArrowRight, Check, ChevronsUpDown, Calendar as CalendarIcon, GripVertical, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { addProject } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Calendar } from './ui/calendar';
import { Textarea } from './ui/textarea';

const mockArchitects = [
    { value: "darshan@habi.one", label: "Darshan" },
    { value: "anil@habi.one", label: "Anil Kumar" },
    { value: "yaswanth@habi.one", label: "Yaswanth" },
];

const mockSupervisors = [
    { value: "supervisor1", label: "Supervisor 1" },
    { value: "supervisor2", label: "Supervisor 2" },
    { value: "supervisor3", label: "Supervisor 3" },
];

const mockClients = [
    { id: 'CHA2024', name: "Charan Project", city: "Mysuru", email: "admin@abc.com", phone: "+91 1234567890", type: 'client' as const },
    { id: 'DEL2024', name: "Delta Project", city: "Bengaluru", email: "contact@delta.com", phone: "+91 9876543210", type: 'client' as const },
    { id: 'GAM2024', name: "Gamma Project", city: "Chennai", email: "support@gamma.co", phone: "+91 8765432109", type: 'client' as const },
    { id: 'LEAD2024', name: "Alpha Lead", city: "Hyderabad", email: "sales@alpha.io", phone: "+91 7654321098", type: 'lead' as const },
    { id: 'LEAD2024-2', name: "Beta Lead", city: "Mumbai", email: "info@betaleads.com", phone: "+91 6543210987", type: 'lead' as const },
];

const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="space-y-2">
        <Label htmlFor={id} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        <Input id={id} className="h-14 bg-background rounded-full px-5" value={value} {...props} />
    </div>
);

const FloatingLabelSelect = ({ id, label, value, onValueChange, children, name }: { id: string, label: string, value: string, onValueChange: (value: string) => void, children: React.ReactNode, name?: string }) => (
     <div className="space-y-2">
        <Label htmlFor={id} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        <Select name={name || id} value={value} onValueChange={onValueChange}>
            <SelectTrigger id={id} className="h-14 bg-background rounded-full px-5">
                <SelectValue placeholder={label.replace('*','')} />
            </SelectTrigger>
            <SelectContent>
                {children}
            </SelectContent>
        </Select>
    </div>
)

const AddProjectForm = ({ onNext }: { onNext: () => void }) => {
    const [selectedClient, setSelectedClient] = useState('');
    const [clientComboboxOpen, setClientComboboxOpen] = useState(false);

    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [projectCost, setProjectCost] = useState('');
    const [status, setStatus] = useState('');
    const [dimension, setDimension] = useState('');
    const [floor, setFloor] = useState('');
    const [siteLocation, setSiteLocation] = useState('');
    const [siteLocationLink, setSiteLocationLink] = useState('');
    const [architect, setArchitect] = useState('');
    const [siteSupervisor, setSiteSupervisor] = useState('');
    const [architectOpen, setArchitectOpen] = useState(false);
    const [supervisorOpen, setSupervisorOpen] = useState(false);

    useEffect(() => {
        if (selectedClient) {
            const client = mockClients.find(c => c.id === selectedClient);
            if (client) {
                setName(client.name);
                setClientId(client.id);
                setPhone(client.phone);
                setEmail(client.email);
            }
        } else {
            setName('');
            setClientId('');
            setPhone('');
            setEmail('');
        }
    }, [selectedClient]);

    const handleTextOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setter(value);
        }
    };

    const handleNumberOnlyChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setter(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-150px)]">
                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Personal details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2">
                            <div className="space-y-2">
                                <Label htmlFor="client-select" className={cn("text-lg font-medium px-2", selectedClient ? 'text-grey-1' : 'text-zinc-900')}>Client/Lead*</Label>
                                <Popover open={clientComboboxOpen} onOpenChange={setClientComboboxOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={clientComboboxOpen} className="w-full justify-between h-14 bg-background rounded-full px-5 text-left font-normal">
                                            {selectedClient ? `${mockClients.find(c => c.id === selectedClient)?.name} (${selectedClient})` : "Select client or lead..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search client/lead..." />
                                            <CommandList>
                                                <CommandEmpty>No client or lead found.</CommandEmpty>
                                                <CommandGroup>
                                                    {mockClients.map(c => (
                                                        <CommandItem key={c.id} value={`${c.name} ${c.id}`} onSelect={() => { setSelectedClient(c.id); setClientComboboxOpen(false); }}>
                                                            <Check className={cn("mr-2 h-4 w-4", selectedClient === c.id ? "opacity-100" : "opacity-0")} />
                                                            {c.name} ({c.id})
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <FloatingLabelInput id="name" name="name" label="Name*" value={name} onChange={handleTextOnlyChange(setName)} readOnly={!!selectedClient} />
                        <FloatingLabelInput id="client-id" name="client_id" label="Client ID*" value={clientId} onChange={e => setClientId(e.target.value)} readOnly={!!selectedClient} />
                        <FloatingLabelInput id="phone-number" name="phone_number" label="Phone Number*" type="tel" value={phone} onChange={handleNumberOnlyChange(setPhone)} readOnly={!!selectedClient} />
                        <FloatingLabelInput id="email" name="email" label="Email*" type="email" value={email} onChange={e => setEmail(e.target.value)} readOnly={!!selectedClient} />
                        <div className="sm:col-span-2">
                            <FloatingLabelInput id="current-location" name="current_location" label="Current location*" value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Project details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FloatingLabelInput id="project-cost" name="project_cost" label="Project Cost*" value={projectCost} onChange={handleNumberOnlyChange(setProjectCost)} />
                        <FloatingLabelSelect id="status" label="Status*" value={status} onValueChange={setStatus}>
                            <SelectItem value="on-going">On Going</SelectItem>
                            <SelectItem value="delay">Delay</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </FloatingLabelSelect>
                        <FloatingLabelInput id="dimension" name="dimension" label="Dimension (sq.ft)*" value={dimension} onChange={handleNumberOnlyChange(setDimension)} />
                        <FloatingLabelSelect id="floor" label="Floor*" value={floor} onValueChange={setFloor}>
                            {Array.from({ length: 8 }, (_, i) => `G+${i + 1}`).map(f => (
                                <SelectItem key={f} value={f.toLowerCase()}>{f}</SelectItem>
                            ))}
                        </FloatingLabelSelect>
                        <div className="sm:col-span-2">
                            <FloatingLabelInput id="site-location" name="site_location" label="Site location*" value={siteLocation} onChange={e => setSiteLocation(e.target.value)} />
                        </div>
                        <div className="sm:col-span-2">
                            <FloatingLabelInput id="site-location-link" name="site_location_link" label="Site location link" value={siteLocationLink} onChange={e => setSiteLocationLink(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg text-stone-500">Project Assign</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="architect" className={cn("text-lg font-medium px-2", architect ? 'text-grey-1' : 'text-zinc-900')}>Architect*</Label>
                            <Popover open={architectOpen} onOpenChange={setArchitectOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={architectOpen} className="w-full justify-between h-14 bg-background rounded-full px-5 text-left font-normal">
                                        {architect ? mockArchitects.find(a => a.value === architect)?.label : "Select architect..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search architect..." />
                                        <CommandList>
                                            <CommandEmpty>No architect found.</CommandEmpty>
                                            <CommandGroup>
                                                {mockArchitects.map(a => (
                                                    <CommandItem key={a.value} value={a.label} onSelect={() => { setArchitect(a.value); setArchitectOpen(false); }}>
                                                        <Check className={cn("mr-2 h-4 w-4", architect === a.value ? "opacity-100" : "opacity-0")} />
                                                        {a.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="site-supervisor" className={cn("text-lg font-medium px-2", siteSupervisor ? 'text-grey-1' : 'text-zinc-900')}>Site Supervisor*</Label>
                            <Popover open={supervisorOpen} onOpenChange={setSupervisorOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role="combobox" aria-expanded={supervisorOpen} className="w-full justify-between h-14 bg-background rounded-full px-5 text-left font-normal">
                                        {siteSupervisor ? mockSupervisors.find(s => s.value === siteSupervisor)?.label : "Select supervisor..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search supervisor..." />
                                        <CommandList>
                                            <CommandEmpty>No supervisor found.</CommandEmpty>
                                            <CommandGroup>
                                                {mockSupervisors.map(s => (
                                                    <CommandItem key={s.value} value={s.label} onSelect={() => { setSiteSupervisor(s.value); setSupervisorOpen(false); }}>
                                                        <Check className={cn("mr-2 h-4 w-4", siteSupervisor === s.value ? "opacity-100" : "opacity-0")} />
                                                        {s.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end pt-8">
                    <Button type="submit" className="px-10 h-14 text-lg rounded-full">
                        Next
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

const defaultProjectStages = [
    "Soil Testing & Site Visit",
    "Architectural Concept Design",
    "Layout",
    "Presentation (ideation)",
    "Interior Conceptual Design",
    "Interior Layout",
    "Interior Presentation (Ideation)",
    "3D Conceptual From Exploration",
    "Renders",
    "Plans",
    "Elevation",
    "Sections",
    "Views , videos",
    "Structural Design",
    "Sanction + Tender Drawings",
    "Structural Drawings",
    "Costing Estimator 2.0 (BOQ)",
    "Good For Construction Civil Architectural Interior Electrical Plumbing Misc (GFC) Solar Rainwater STP., etc.",
    "Site Clearence",
    "Site Marking",
    "Surveyor",
    "Grid + Foundation Marking",
    "Isolated Foundation",
    "Raft Foundation",
    "Excavation",
    "Grid Marking",
    "Column Marking",
    "Excavation",
    "Column Marking",
    "Dressing",
    "Compaction",
    "PCC",
    "Bar Bending",
    "Shuttering",
    "Pedestal | Raft",
    "Concreting",
    "Removal of Shuttering",
    "Starter Marking",
    "Bar Bending",
    "Columns",
    "Shuttering",
    "Concreting",
    "Removal of Shuttering",
    "Sump Construction",
    "Back Filling",
    "Plinth Work | Sump Slab",
    "Stone Masonry",
    "Barbending",
    "Shuttering",
    "Concreting",
    "Removal of Shuttering",
    "Backfilling",
    "Plinth",
    "Compaction",
    "Termite Treatment",
    "PCC",
    "Starter Marking",
    "Bar Bending",
    "Columns",
    "Shuttering",
    "Concreting",
    "Removal Of Shuttering",
    "Shuttering",
    "Ground Floor Beams | Slab",
    "Bar bending",
    "Concreting (RMC)",
    "1st Floor",
    "Starter Marking",
    "Bar Bending",
    "Columns",
    "Shuttering",
    "Concreting",
    "Ground Floor",
    "Removal of Shuttering (Slab)",
    "Block Work (Slowly)",
    "1st Floor",
    "Shuttering",
    "Bar bending",
    "Concreting",
    "Ground Floor",
    "Completion of Block work",
    "1st Floor",
    "Removal of shuttering",
    "Completion of Block work",
    "Groundfloor (Keeping as standard)",
    "Electrical Wiring",
    "Plumbing",
    "Tiles Laying",
    "Door & Window Installation",
    "Paint Work",
    "Toilet Fixtures",
    "Electrical Fixtures",
    "Window Grill",
    "Railing",
    "Inspection By Client",
    "Key Handover",
    "Documents Handover",
];

const ProjectTimelineForm = ({ onFormSuccess, onBack, stages, timelineTemplate, setTimelineTemplate, setCustomStages, customStages }: { onFormSuccess: () => void, onBack: () => void, stages: string[], timelineTemplate: string, setTimelineTemplate: (val: string) => void, setCustomStages: (stages: string[]) => void, customStages: string[] }) => {
    const { toast } = useToast();
    const [state, formAction] = useActionState(addProject, { success: false, message: '' });
    const [startDate, setStartDate] = useState<Date>();
    const [stageDays, setStageDays] = useState<{[key: string]: string}>({});
    const [isCustomTimelineDialogOpen, setIsCustomTimelineDialogOpen] = useState(false);

    const handleDaysChange = (stage: string, value: string) => {
        const numericValue = value.replace(/\D/g, '');
        setStageDays(prev => ({...prev, [stage]: numericValue}));
    };
    
    useEffect(() => {
        if (state.success) {
            onFormSuccess();
        } else if (state.message) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }, [state, onFormSuccess, toast]);

    return (
        <>
            <form action={formAction}>
                <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-150px)]">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg text-stone-500">Project Timeline (Stages)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end w-full max-w-lg">
                                <FloatingLabelSelect id="timeline-template" label="Timeline Template" value={timelineTemplate} onValueChange={setTimelineTemplate}>
                                    <SelectItem value="default">Default Timeline</SelectItem>
                                    <SelectItem value="custom">Create Custom Timeline</SelectItem>
                                </FloatingLabelSelect>
                                {timelineTemplate === 'custom' && (
                                   <Button type="button" variant="outline" className="h-14 rounded-full" onClick={() => setIsCustomTimelineDialogOpen(true)}>
                                       {customStages.length > 0 ? 'Edit Custom Timeline' : 'Create Custom Timeline'}
                                   </Button>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className={cn("text-lg font-medium px-2", startDate ? 'text-grey-1' : 'text-zinc-900')}>Start Date*</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal h-14 bg-background rounded-full px-5",
                                        !startDate && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? startDate.toLocaleDateString() : <span>Select start date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {stages.map(stage => (
                                <div key={stage} className="space-y-2">
                                    <Label htmlFor={`days-${stage}`} className="text-lg font-medium px-2 text-zinc-900">{stage}</Label>
                                    <Input 
                                        id={`days-${stage}`} 
                                        name={`days-${stage}`}
                                        className="h-14 bg-background rounded-full px-5" 
                                        placeholder="Enter days"
                                        value={stageDays[stage] || ''}
                                        onChange={(e) => handleDaysChange(stage, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-8">
                        <Button type="button" variant="outline" className="px-10 h-14 text-lg rounded-full" onClick={onBack}>
                            Back
                        </Button>
                        <Button type="submit" className="px-10 h-14 text-lg rounded-full">
                            Create Project
                        </Button>
                    </div>
                </div>
            </form>
            <CustomTimelineDialog 
                isOpen={isCustomTimelineDialogOpen} 
                onClose={() => setIsCustomTimelineDialogOpen(false)} 
                onSave={setCustomStages}
                initialStages={customStages}
            />
        </>
    );
};

const CustomTimelineDialog = ({ isOpen, onClose, onSave, initialStages }: { isOpen: boolean, onClose: () => void, onSave: (stages: string[]) => void, initialStages: string[] }) => {
    const [stages, setStages] = useState(initialStages.length > 0 ? initialStages : ['']);
    const [templateName, setTemplateName] = useState('');

    const handleAddStage = () => {
        setStages([...stages, '']);
    };

    const handleStageChange = (index: number, value: string) => {
        const newStages = [...stages];
        newStages[index] = value;
        setStages(newStages);
    };
    
    const handleRemoveStage = (index: number) => {
        const newStages = stages.filter((_, i) => i !== index);
        setStages(newStages);
    };

    const handleSave = () => {
        // Here you would also save the template with its name
        onSave(stages.filter(s => s.trim() !== ''));
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl p-0 rounded-[20px]">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="flex items-center justify-between">
                        Create Custom Timeline
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    <Input 
                        placeholder="Template Name" 
                        value={templateName}
                        onChange={e => setTemplateName(e.target.value)}
                        className="h-12"
                    />
                    {stages.map((stage, index) => (
                        <div key={index} className="flex items-center gap-2">
                             <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                            <Input 
                                value={stage}
                                onChange={(e) => handleStageChange(index, e.target.value)}
                                placeholder={`Stage ${index + 1}`}
                                className="h-12"
                            />
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveStage(index)}>
                                <Trash2 className="h-4 w-4 text-destructive"/>
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={handleAddStage}>
                        Add Stage
                    </Button>
                </div>
                <div className="px-6 py-4 border-t flex justify-end">
                    <Button onClick={handleSave}>Save Template</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export function AddProjectSheet() {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [step, setStep] = useState(1);
    const [timelineTemplate, setTimelineTemplate] = useState('default');
    const [customStages, setCustomStages] = useState<string[]>([]);

    const handleSuccess = () => {
        setIsOpen(false);
        setShowSuccess(true);
        setTimeout(() => setStep(1), 500); // Reset step after closing
    };

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const DialogOrSheet = isMobile ? Sheet : Dialog;
    const DialogOrSheetContent = isMobile ? SheetContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? SheetClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

    const title = step === 1 ? 'Add New Project' : 'Project Timeline';
    const stagesForTimeline = timelineTemplate === 'custom' && customStages.length > 0 ? customStages : defaultProjectStages;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={(open) => {
                if (!open) {
                    setStep(1);
                }
                setIsOpen(open);
            }}>
                <DialogOrSheetTrigger asChild>
                    <Button className="bg-primary/10 text-primary border border-primary rounded-full h-[54px] hover:bg-primary/20 text-lg px-6">
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add Project
                    </Button>
                </DialogOrSheetTrigger>
                <DialogOrSheetContent
                    className={cn(
                        "p-0 bg-white",
                        isMobile
                            ? "w-full rounded-t-[50px]"
                            : "sm:max-w-3xl rounded-[50px]"
                    )}
                    {...(isMobile && { side: "bottom" })}
                >
                    <DialogOrSheetHeader className="p-6 border-b">
                         <div className="flex justify-between items-center">
                            <DialogOrSheetTitle className="text-2xl font-semibold">
                                {title}
                            </DialogOrSheetTitle>
                            <DialogOrSheetClose asChild>
                                <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                    <X className="h-6 w-6" />
                                </Button>
                            </DialogOrSheetClose>
                        </div>
                    </DialogOrSheetHeader>
                    {step === 1 ? (
                        <AddProjectForm onNext={handleNext} />
                    ) : (
                        <ProjectTimelineForm 
                            onFormSuccess={handleSuccess} 
                            onBack={handleBack} 
                            stages={stagesForTimeline}
                            timelineTemplate={timelineTemplate}
                            setTimelineTemplate={setTimelineTemplate}
                            customStages={customStages}
                            setCustomStages={setCustomStages}
                        />
                    )}
                </DialogOrSheetContent>
            </DialogOrSheet>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="New Project added"
                message="Congratulations! You have successfully added a new project."
            />
        </>
    );
}
