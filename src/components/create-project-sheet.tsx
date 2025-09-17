
'use client';

import React, { useState, useActionState, useEffect, useTransition } from 'react';
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
import { PlusCircle, X, ArrowRight, Check, ChevronsUpDown, Banknote, Trash2, Edit, Plus, GripVertical, Calendar as CalendarIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { addProject, updateProject } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { SuccessPopup } from './success-popup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Separator } from './ui/separator';
import { Project } from '@/lib/data';
import { ScrollArea } from './ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

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
];
const mockLeads = [
    { id: 'LEAD2024', name: "Alpha Lead", city: "Hyderabad", email: "sales@alpha.io", phone: "+91 7654321098", type: 'lead' as const },
    { id: 'LEAD2024-2', name: "Beta Lead", city: "Mumbai", email: "info@betaleads.com", phone: "+91 6543210987", type: 'lead' as const },
];
const allContacts = [...mockClients.map(c => ({...c, type: 'client' as const})), ...mockLeads.map(l => ({...l, type: 'lead' as const}))];


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

const CreateProjectForm = ({ onNext, projectToEdit, projectData }: { onNext: (data: any) => void, projectToEdit: Project | null, projectData: any }) => {
    const [name, setName] = useState(projectToEdit?.name || projectData?.name || '');
    const [clientId, setClientId] = useState(projectToEdit?.id || projectData?.clientId || '');
    const [phone, setPhone] = useState(projectToEdit?.contact.split(' | ')[1] || projectData?.phone || '');
    const [email, setEmail] = useState(projectToEdit?.contact.split(' | ')[0] || projectData?.email || '');
    const [currentLocation, setCurrentLocation] = useState(projectData?.currentLocation || '');
    const [projectCost, setProjectCost] = useState(projectData?.projectCost || '');
    const [dimension, setDimension] = useState(projectData?.dimension || '');
    const [floor, setFloor] = useState(projectData?.floor || '');
    const [siteLocation, setSiteLocation] = useState(projectToEdit?.city || projectData?.siteLocation || '');
    const [siteLocationLink, setSiteLocationLink] = useState(projectData?.siteLocationLink || '');
    const [architect, setArchitect] = useState(projectData?.architect || '');
    const [siteSupervisor, setSiteSupervisor] = useState(projectData?.siteSupervisor || '');
    const [architectOpen, setArchitectOpen] = useState(false);
    const [supervisorOpen, setSupervisorOpen] = useState(false);
    const [emailComboboxOpen, setEmailComboboxOpen] = useState(false);


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

    const handleEmailSelect = (contactEmail: string) => {
        const contact = allContacts.find(c => c.email === contactEmail);
        if (contact) {
            setName(contact.name);
            setClientId(contact.id);
            setPhone(contact.phone);
            setEmail(contact.email);
        }
        setEmailComboboxOpen(false);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            name,
            clientId,
            phone,
            email,
            currentLocation,
            projectCost,
            dimension,
            floor,
            siteLocation,
            siteLocationLink,
            architect,
            siteSupervisor
        };
        onNext(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-6 no-scrollbar">
                <div className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-lg text-stone-500">Personal details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FloatingLabelInput id="name" name="name" label="Name*" value={name} onChange={handleTextOnlyChange(setName)} />
                            <FloatingLabelInput id="client-id" name="client_id" label="Client ID*" value={clientId} onChange={e => setClientId(e.target.value)} />
                            <FloatingLabelInput id="phone-number" name="phone_number" label="Phone Number*" type="tel" value={phone} onChange={handleNumberOnlyChange(setPhone)} />
                            
                            <div className="space-y-2">
                                <Label htmlFor="email" className={cn("text-lg font-medium px-2", email ? 'text-grey-1' : 'text-zinc-900')}>Email*</Label>
                                <Popover open={emailComboboxOpen} onOpenChange={setEmailComboboxOpen}>
                                    <PopoverTrigger asChild>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="h-14 bg-background rounded-full px-5"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            onClick={() => setEmailComboboxOpen(true)}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                        <Command>
                                            <CommandInput 
                                                placeholder="Search by email..."
                                                value={email}
                                                onValueChange={setEmail}
                                            />
                                            <CommandList>
                                                <CommandEmpty>No contact found.</CommandEmpty>
                                                <CommandGroup>
                                                    {allContacts
                                                        .filter(c => c.email.toLowerCase().includes(email.toLowerCase()))
                                                        .map(contact => (
                                                            <CommandItem
                                                                key={contact.id}
                                                                value={contact.email}
                                                                onSelect={() => handleEmailSelect(contact.email)}
                                                            >
                                                                <Check className={cn("mr-2 h-4 w-4", email === contact.email ? "opacity-100" : "opacity-0")} />
                                                                {contact.email}
                                                            </CommandItem>
                                                        ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="sm:col-span-2">
                                <FloatingLabelInput id="current-location" name="current_location" label="Current location*" value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg text-stone-500">Project details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FloatingLabelInput id="project-cost" name="project_cost" label="Project Cost*" value={projectCost} onChange={handleNumberOnlyChange(setProjectCost)} />
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
                </div>
            </ScrollArea>
            <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
                <Button type="submit" className="w-full md:w-auto px-10 h-14 text-lg rounded-full">
                    {projectToEdit ? 'Save & Next' : 'Next'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    );
};

export interface Stage {
    name: string;
    subStages: SubStage[];
}

export interface SubStage {
    name: string;
    tasks: Task[];
}

export interface Task {
    name: string;
    duration: string;
    status: string;
}

export interface TimelineTemplate {
    id: string;
    name: string;
    stages: Stage[];
    isCustom?: boolean;
}

const initialTimelineData: Stage[] = [
    {
      "name": "Foundation",
      "subStages": [
        {
          "name": "Excavation",
          "tasks": [
            { "name": "Digging", "duration": "3 Days", "status": "In Progress" },
            { "name": "Soil Testing", "duration": "2 Days", "status": "Not Started" }
          ]
        },
        {
          "name": "Concrete Work",
          "tasks": [
            { "name": "Footing", "duration": "4 Days", "status": "Not Started" },
            { "name": "Column Base", "duration": "2 Days", "status": "Not Started" }
          ]
        }
      ]
    },
    {
      "name": "Electrical",
      "subStages": [
        {
          "name": "Wiring",
          "tasks": [
            { "name": "Conduit Laying", "duration": "5 Days", "status": "Not Started" },
            { "name": "Cable Pulling", "duration": "3 Days", "status": "Not Started" }
          ]
        }
      ]
    },
    {
      "name": "Finishing",
      "subStages": [
        {
          "name": "Painting",
          "tasks": [
            { "name": "Primer Coat", "duration": "2 Days", "status": "Not Started" },
            { "name": "Final Paint", "duration": "3 Days", "status": "Not Started" }
          ]
        },
        {
          "name": "Flooring",
          "tasks": [
            { "name": "Tile Laying", "duration": "4 Days", "status": "Not Started" }
          ]
        }
      ]
    }
  ];

const ProjectTimelineForm = ({
    onFormSuccess,
    onBack,
    isEditMode,
    projectData,
}: {
    onFormSuccess: () => void;
    onBack: () => void;
    isEditMode: boolean;
    projectData: any;
}) => {
    const { toast } = useToast();
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [stageDurations, setStageDurations] = useState<{ [key: string]: string }>({});

    const [state, formAction] = useActionState(isEditMode ? updateProject : addProject, null);

    useEffect(() => {
        if (state?.success) {
            onFormSuccess();
        } else if (state?.message) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }, [state, onFormSuccess, toast]);

    const handleDurationChange = (taskName: string, stageName: string, subStageName: string, duration: string) => {
        const key = `${stageName}-${subStageName}-${taskName}`;
        setStageDurations(prev => ({ ...prev, [key]: duration }));
    }

    return (
        <>
            <form action={formAction} className="flex flex-col h-full">
                <input type="hidden" name="projectData" value={JSON.stringify(projectData)} />
                <ScrollArea className="flex-1 p-6 no-scrollbar">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label htmlFor="start-date" className={cn("text-lg font-medium px-2", startDate ? 'text-grey-1' : 'text-zinc-900')}>Start Date*</Label>
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
                                                    {startDate ? startDate.toLocaleDateString() : <span>Pick a date</span>}
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
                                        <input type="hidden" name="startDate" value={startDate?.toISOString()} />
                                    </div>
                                </div>
                            </div>

                            <Accordion type="multiple" defaultValue={initialTimelineData.map(s => s.name)} className="w-full space-y-4">
                                {initialTimelineData.map((stage, stageIndex) => (
                                    <AccordionItem key={stage.name} value={stage.name} className="bg-background rounded-3xl px-6">
                                        <AccordionTrigger className="text-xl font-semibold hover:no-underline">{stage.name}</AccordionTrigger>
                                        <AccordionContent>
                                            <Accordion type="multiple" defaultValue={stage.subStages.map(ss => ss.name)} className="w-full space-y-2">
                                                {stage.subStages.map((subStage, subStageIndex) => (
                                                    <AccordionItem key={subStage.name} value={subStage.name} className="border-b-0">
                                                        <AccordionTrigger className="text-lg font-medium text-zinc-900/80 hover:no-underline">{subStage.name}</AccordionTrigger>
                                                        <AccordionContent className="pl-4">
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                {subStage.tasks.map((task, taskIndex) => (
                                                                    <div key={task.name} className="space-y-2">
                                                                        <Label className="text-base font-normal px-2 text-zinc-900">{task.name}</Label>
                                                                        <Input
                                                                            name={`duration_${stageIndex}_${subStageIndex}_${taskIndex}`}
                                                                            className="h-12 bg-white rounded-full px-5"
                                                                            placeholder="Enter days"
                                                                            defaultValue={task.duration}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </ScrollArea>
                <div className="p-6 mt-auto border-t md:border-0 flex justify-between items-center">
                    <Button type="button" variant="outline" className="px-10 h-14 text-lg rounded-full" onClick={onBack}>
                        Back
                    </Button>
                    <Button type="submit" className="px-10 h-14 text-lg rounded-full">
                         {isEditMode ? 'Save Changes' : 'Create Project'}
                    </Button>
                </div>
            </form>
        </>
    );
};

const CustomTimelineDialog = ({ isOpen, onClose, onSave, templateToEdit }: { isOpen: boolean, onClose: () => void, onSave: (template: TimelineTemplate) => void, templateToEdit: TimelineTemplate | null | undefined }) => {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const [templateName, setTemplateName] = useState('');
    const [stages, setStages] = useState<Stage[]>([{ name: '', subStages: [{ name: '', tasks: [{ name: '', duration: '', status: '' }] }] }]);


    useEffect(() => {
        if (isOpen) {
            if (templateToEdit) {
                setTemplateName(templateToEdit.name);
                setStages(templateToEdit.stages);
            } else {
                setTemplateName('');
                setStages([{ name: '', subStages: [{ name: '', tasks: [{ name: '', duration: '', status: '' }] }] }]);
            }
        }
    }, [templateToEdit, isOpen]);


    const handleSave = () => {
        // This functionality needs to be implemented based on the new structure
        toast({ title: "Custom timelines not yet implemented" });
        onClose();
    };

    const DialogComponent = isMobile ? Dialog : Dialog;
    const DialogContentComponent = isMobile ? DialogContent : DialogContent;


    return (
        <DialogComponent open={isOpen} onOpenChange={onClose}>
            <DialogContentComponent className={cn(
                "p-0 flex flex-col bg-white",
                 isMobile
                  ? "w-full h-full rounded-none border-none"
                  : "sm:max-w-xl rounded-[20px] h-[90vh]"
            )}>
                <DialogHeader className="p-6 border-b shrink-0">
                    <DialogTitle className="flex items-center justify-between">
                        <span className="text-2xl font-semibold">{templateToEdit ? 'Edit Timeline Template' : 'Create Custom Timeline'}</span>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="w-9 h-9 bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 p-6 space-y-4 no-scrollbar">
                        <p>Custom timeline creation UI will go here.</p>
                    </ScrollArea>
                    <div className="px-6 py-4 border-t flex flex-col gap-4 shrink-0 bg-white rounded-b-[20px]">
                         <Button onClick={handleSave} className="h-[54px] rounded-full text-lg w-full">Save Template</Button>
                    </div>
                </div>
            </DialogContentComponent>
        </DialogComponent>
    );
};

interface CreateProjectSheetProps {
    trigger?: React.ReactNode;
    onProjectAdded: (project: Project) => void;
    onProjectUpdated: (project: Project) => void;
    projectToEdit: Project | null;
    onOpenChange: (isOpen: boolean) => void;
}

export function CreateProjectSheet({ trigger, onProjectAdded, projectToEdit, onProjectUpdated, onOpenChange }: CreateProjectSheetProps) {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState<any>(null);
    

    const isEditMode = !!projectToEdit;

    useEffect(() => {
        if (projectToEdit) {
            setIsOpen(true);
        }
    }, [projectToEdit]);

    const handleOpenChangeInternal = (open: boolean) => {
        if (!open) {
            setStep(1);
            setProjectData(null);
            onOpenChange(false);
        }
        setIsOpen(open);
    }
    
    const handleSuccess = () => {
        setIsOpen(false);
        setShowSuccess(true);
        setTimeout(() => {
            setStep(1);
            setProjectData(null);
        }, 500); // Reset step after closing
        // You would call onProjectAdded or onProjectUpdated here with the new/updated project data
    };

    const handleNext = (data: any) => {
        setProjectData(data);
        setStep(2);
    };
    const handleBack = () => setStep(1);

    const DialogOrSheet = Sheet;
    const DialogOrSheetContent = SheetContent;
    const DialogOrSheetHeader = SheetHeader;
    const DialogOrSheetTitle = SheetTitle;
    const DialogOrSheetClose = SheetClose;
    const DialogOrSheetTrigger = SheetTrigger;

    const title = isEditMode
        ? 'Edit Project'
        : step === 1
        ? 'Create New Project'
        : 'Project Timeline';
        
    const DefaultTrigger = (
        <Button className="bg-primary/10 text-primary border border-primary rounded-full h-[54px] hover:bg-primary/20 text-lg px-6">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create project
        </Button>
    );

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={handleOpenChangeInternal}>
                {!isEditMode && (
                    <DialogOrSheetTrigger asChild>
                        {trigger || DefaultTrigger}
                    </DialogOrSheetTrigger>
                )}
                <DialogOrSheetContent
                    side="bottom"
                    className={cn(
                        "p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-3xl md:mx-auto rounded-t-[50px] border-none"
                    )}
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
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {step === 1 ? (
                            <CreateProjectForm onNext={handleNext} projectToEdit={projectToEdit} projectData={projectData} />
                        ) : (
                            <ProjectTimelineForm
                                onFormSuccess={handleSuccess}
                                onBack={handleBack}
                                isEditMode={isEditMode}
                                projectData={projectData}
                            />
                        )}
                    </div>
                </DialogOrSheetContent>
            </DialogOrSheet>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title={isEditMode ? "Project Updated" : "New Project added"}
                message={isEditMode ? "The project details have been successfully updated." : "Congratulations! You have successfully added a new project."}
            />
        </>
    );
}

