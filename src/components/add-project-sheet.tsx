

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

const AddProjectForm = ({ onNext, projectToEdit }: { onNext: () => void, projectToEdit: Project | null }) => {
    const [name, setName] = useState(projectToEdit?.name || '');
    const [clientId, setClientId] = useState(projectToEdit?.id || '');
    const [phone, setPhone] = useState(projectToEdit?.contact.split(' | ')[1] || '');
    const [email, setEmail] = useState(projectToEdit?.contact.split(' | ')[0] || '');
    const [currentLocation, setCurrentLocation] = useState('');
    const [projectCost, setProjectCost] = useState('');
    const [status, setStatus] = useState(projectToEdit?.status.toLowerCase().replace(' ', '-') || '');
    const [dimension, setDimension] = useState('');
    const [floor, setFloor] = useState('');
    const [siteLocation, setSiteLocation] = useState(projectToEdit?.city || '');
    const [siteLocationLink, setSiteLocationLink] = useState('');
    const [architect, setArchitect] = useState('');
    const [siteSupervisor, setSiteSupervisor] = useState('');
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
        onNext();
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

export interface CustomStage {
    id: number;
    name: string;
    type: 'stage' | 'payment';
}

export interface TimelineTemplate {
    id: string;
    name: string;
    stages: CustomStage[];
    isCustom?: boolean;
}

const initialDesignStages: CustomStage[] = [
    { id: 1, name: "1% Of Over all Quote", type: 'payment' },
    { id: 2, name: "Level 3 lead Converted to Client", type: 'stage' },
    { id: 3, name: "Project Manager is assigned", type: 'stage' },
    { id: 4, name: "Soil Testing & Site Visit", type: 'stage' },
    { id: 5, name: "Mood Board Selection in App", type: 'stage' },
    { id: 6, name: "Architectural Concept Design", type: 'stage' },
    { id: 7, name: "Layout", type: 'stage' },
    { id: 8, name: "Presentation (ideation)", type: 'stage' },
    { id: 9, name: "Interior Conceptual Design", type: 'stage' },
    { id: 10, name: "Interior Layout", type: 'stage' },
    { id: 11, name: "Interior Presentation (Ideation)", type: 'stage' },
    { id: 12, name: "3D Conceptual From Exploration", type: 'stage' },
    { id: 13, name: "Renders", type: 'stage' },
    { id: 14, name: "Plans", type: 'stage' },
    { id: 15, name: "Elevation", type: 'stage' },
    { id: 16, name: "Sections", type: 'stage' },
    { id: 17, name: "Views , videos", type: 'stage' },
    { id: 18, name: "Structural Design", type: 'stage' },
    { id: 19, name: "Sanction + Tender Drawings", type: 'stage' },
    { id: 20, name: "Structural Drawings", type: 'stage' },
    { id: 21, name: "Costing Estimator 2.0 (BOQ)", type: 'stage' },
    { id: 22, name: "Good For Construction Civil Architectural Interior Electrical Plumbing Misc (GFC) Solar Rainwater STP., etc.", type: 'stage' }
];

const initialConstructionStages: CustomStage[] = [
    { id: 23, name: "20% Payment with Difference Amount of 1 %", type: 'payment' },
    { id: 24, name: "Construction Started", type: 'stage' },
    { id: 25, name: "Site Clearence", type: 'stage' },
    { id: 26, name: "Bhumi Pujan", type: 'stage' },
    { id: 27, name: "Site Marking", type: 'stage' },
    { id: 28, name: "Surveyor", type: 'stage' },
    { id: 29, name: "Grid + Foundation Marking", type: 'stage' },
    { id: 30, name: "Isolated Foundation", type: 'stage' },
    { id: 31, name: "Raft Foundation", type: 'stage' },
    { id: 32, name: "EXcavation", type: 'stage' },
    { id: 33, name: "Grid Marking", type: 'stage' },
    { id: 34, name: "Column Marking", type: 'stage' },
    { id: 35, name: "Excavation", type: 'stage' },
    { id: 36, name: "Column Marking", type: 'stage' },
    { id: 37, name: "Dressing", type: 'stage' },
    { id: 38, name: "Compaction", type: 'stage' },
    { id: 39, name: "PCC", type: 'stage' },
    { id: 40, name: "Bar Bending", type: 'stage' },
    { id: 41, name: "Shuttering", type: 'stage' },
    { id: 42, name: "Pedestal | Raft", type: 'stage' },
    { id: 43, name: "Concreting", type: 'stage' },
    { id: 44, name: "Removal of Shuttering", type: 'stage' },
    { id: 45, name: "Starter Marking", type: 'stage' },
    { id: 46, name: "Bar Bending", type: 'stage' },
    { id: 47, name: "Columns", type: 'stage' },
    { id: 48, name: "Shuttering", type: 'stage' },
    { id: 49, name: "Concreting", type: 'stage' },
    { id: 50, name: "Removal of Shuttering", type: 'stage' },
    { id: 51, name: "Sump Construction", type: 'stage' },
    { id: 52, name: "Back Filling", type: 'stage' },
    { id: 53, name: "Plinth Work | Sump Slab", type: 'stage' },
    { id: 54, name: "Stone Masonry", type: 'stage' },
    { id: 55, name: "Barbending", type: 'stage' },
    { id: 56, name: "Shuttering", type: 'stage' },
    { id: 57, name: "Concreting", type: 'stage' },
    { id: 58, name: "Removal of Shuttering", type: 'stage' },
    { id: 59, name: "Backfilling", type: 'stage' },
    { id: 60, name: "Plinth", type: 'stage' },
    { id: 61, name: "Compaction", type: 'stage' },
    { id: 62, name: "Termite Treatment", type: 'stage' },
    { id: 63, name: "PCC", type: 'stage' },
    { id: 64, name: "30% Of Overall Quote", type: 'payment' },
    { id: 65, name: "Starter Marking", type: 'stage' },
    { id: 66, name: "Bar Bending", type: 'stage' },
    { id: 67, name: "Columns", type: 'stage' },
    { id: 68, name: "Shuttering", type: 'stage' },
    { id: 69, name: "Concreting", type: 'stage' },
    { id: 70, name: "Removal Of Shuttering", type: 'stage' },
    { id: 71, name: "Shuttering", type: 'stage' },
    { id: 72, name: "Ground Floor Beams | Slab", type: 'stage' },
    { id: 73, name: "Bar bending", type: 'stage' },
    { id: 74, name: "Concreting (RMC)", type: 'stage' },
    { id: 75, name: "1st Floor", type: 'stage' },
    { id: 76, name: "Starter Marking", type: 'stage' },
    { id: 77, name: "Bar Bending", type: 'stage' },
    { id: 78, name: "Columns", type: 'stage' },
    { id: 79, name: "Shuttering", type: 'stage' },
    { id: 80, name: "Concreting", type: 'stage' },
    { id: 81, name: "Ground Floor", type: 'stage' },
    { id: 82, name: "Removal of Shuttering (Slab)", type: 'stage' },
    { id: 83, name: "Block Work (Slowly)", type: 'stage' },
    { id: 84, name: "1st Floor", type: 'stage' },
    { id: 85, name: "Shuttering", type: 'stage' },
    { id: 86, name: "Bar bending", type: 'stage' },
    { id: 87, name: "Concreting", type: 'stage' },
    { id: 88, name: "20% of Total Quote", type: 'payment' },
    { id: 89, name: "Ground Floor", type: 'stage' },
    { id: 90, name: "Completion of Block work", type: 'stage' },
    { id: 91, name: "1st Floor", type: 'stage' },
    { id: 92, name: "Removal of shuttering", type: 'stage' },
    { id: 93, name: "Completion of Block work", type: 'stage' },
    { id: 94, name: "Groundfloor (Keeping as standard)", type: 'stage' },
    { id: 95, name: "Electrical Wiring", type: 'stage' },
    { id: 96, name: "Plumbing", type: 'stage' },
    { id: 97, name: "Tiles Laying", type: 'stage' },
    { id: 98, name: "Door & Window Installation", type: 'stage' },
    { id: 99, name: "Paint Work", type: 'stage' },
    { id: 100, name: "15% of Overall Quote", type: 'payment' },
    { id: 101, name: "Toilet Fixtures", type: 'stage' },
    { id: 102, name: "Electrical Fixtures", type: 'stage' },
    { id: 103, name: "10% of Overall Quote", type: 'payment' },
    { id: 104, name: "Window Grill", type: 'stage' },
    { id: 105, name: "Railing", type: 'stage' },
    { id: 106, name: "Inspection By Client", type: 'stage' },
    { id: 107, name: "04% of Overall Quote", type: 'payment' },
    { id: 108, name: "Key Handover", type: 'stage' },
    { id: 109, name: "Documents Handover", type: 'stage' }
];

const ProjectTimelineForm = ({
    onFormSuccess,
    onBack,
    templates,
    setTemplates,
    selectedTemplateId,
    setSelectedTemplateId,
    isEditMode,
}: {
    onFormSuccess: () => void;
    onBack: () => void;
    templates: TimelineTemplate[];
    setTemplates: React.Dispatch<React.SetStateAction<TimelineTemplate[]>>;
    selectedTemplateId: string;
    setSelectedTemplateId: (id: string) => void;
    isEditMode: boolean;
}) => {
    const { toast } = useToast();
    const action = isEditMode ? updateProject : addProject;
    const [state, formAction] = useActionState(action, { success: false, message: '' });
    const [isCustomTimelineDialogOpen, setIsCustomTimelineDialogOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | undefined>();
    
    const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
    const stages = selectedTemplate?.stages || [];

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
    
    const handleSaveTemplate = (updatedTemplate: TimelineTemplate) => {
        setTemplates(prev => {
            const existingIndex = prev.findIndex(t => t.id === updatedTemplate.id);
            if (existingIndex > -1) {
                const newTemplates = [...prev];
                newTemplates[existingIndex] = updatedTemplate;
                return newTemplates;
            }
            return [...prev, updatedTemplate];
        });
        setSelectedTemplateId(updatedTemplate.id);
    };

    const handleSelectChange = (value: string) => {
        if (value === 'custom_new') {
            setSelectedTemplateId('custom_new'); // Temporarily set to indicate creation mode
            setIsCustomTimelineDialogOpen(true);
        } else {
            setSelectedTemplateId(value);
        }
    };
    
    const handleEditTemplate = () => {
        if (selectedTemplateId === 'custom_new') return;
        setIsCustomTimelineDialogOpen(true);
    };

    return (
        <>
            <form action={formAction} className="flex flex-col h-full">
                <ScrollArea className="flex-1 p-6 no-scrollbar">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                                    <FloatingLabelSelect id="timeline-template" label="Timeline Template" value={selectedTemplateId} onValueChange={handleSelectChange}>
                                        {templates.map(template => (
                                            <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                                        ))}
                                        <SelectItem value="custom_new">Create Custom Timeline</SelectItem>
                                    </FloatingLabelSelect>
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
                                    </div>
                                    <Button type="button" variant="outline" className="h-14 rounded-full" onClick={handleEditTemplate}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Timeline
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {stages.map(stage => {
                                    const isPaymentStage = stage.type === 'payment';
                                    return (
                                        <div key={stage.id} className="space-y-2">
                                            <Label className="text-lg font-medium px-2 text-zinc-900">{stage.name}</Label>
                                            {isPaymentStage ? (
                                                <div className="h-14 bg-green-light rounded-full px-5 flex items-center text-green font-medium">
                                                    <Banknote className="mr-2 h-5 w-5" />
                                                    Payment Reminder
                                                </div>
                                            ) : (
                                                <Input
                                                    name={`days-${stage.name}`}
                                                    className="h-14 bg-background rounded-full px-5"
                                                    placeholder="Enter days"
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
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
            <CustomTimelineDialog
                isOpen={isCustomTimelineDialogOpen}
                onClose={() => {
                    setIsCustomTimelineDialogOpen(false);
                    if (selectedTemplateId === 'custom_new') {
                        setSelectedTemplateId(templates[0]?.id || '');
                    }
                }}
                onSave={handleSaveTemplate}
                templateToEdit={selectedTemplateId !== 'custom_new' ? templates.find(t => t.id === selectedTemplateId) : null}
            />
        </>
    );
};

const CustomTimelineDialog = ({ isOpen, onClose, onSave, templateToEdit }: { isOpen: boolean, onClose: () => void, onSave: (template: TimelineTemplate) => void, templateToEdit: TimelineTemplate | null | undefined }) => {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const [templateName, setTemplateName] = useState('');
    const [stages, setStages] = useState<CustomStage[]>([{ id: Date.now(), name: '', type: 'stage' }]);

    useEffect(() => {
        if (isOpen) {
            if (templateToEdit) {
                setTemplateName(templateToEdit.name);
                setStages(templateToEdit.stages);
            } else {
                setTemplateName('');
                setStages([{ id: Date.now(), name: '', type: 'stage' }]);
            }
        }
    }, [templateToEdit, isOpen]);

    const addStage = (type: 'stage' | 'payment') => {
        setStages([...stages, { id: Date.now(), name: '', type }]);
    };

    const handleStageChange = (id: number, value: string) => {
        const newStages = stages.map(stage => stage.id === id ? { ...stage, name: value } : stage);
        setStages(newStages);
    };

    const handleRemoveStage = (id: number) => {
        if (stages.length > 1) {
            const newStages = stages.filter(stage => stage.id !== id);
            setStages(newStages);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'A template must have at least one stage.',
            });
        }
    };

    const handleSave = () => {
        if (!templateName.trim()) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Template Name is required.',
            });
            return;
        }
        const finalStages = stages.filter(s => s.name.trim() !== '');
        if (finalStages.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'A template must have at least one stage.',
            });
            return;
        }
        
        onSave({
            id: templateToEdit?.id || `custom-${Date.now()}`,
            name: templateName,
            stages: finalStages,
            isCustom: true,
        });
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
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 p-6 space-y-4 no-scrollbar">
                        <div className="space-y-2">
                            <Label htmlFor="template-name" className={cn("text-lg font-medium px-2", templateName ? 'text-grey-1' : 'text-black')}>Template Name*</Label>
                            <Input
                                id="template-name"
                                placeholder="Template Name*"
                                value={templateName}
                                onChange={e => setTemplateName(e.target.value)}
                                className="h-[54px] bg-background rounded-full px-6 text-lg"
                            />
                        </div>
                        <Separator className="my-4" />
                        {stages.map((stage, index) => (
                            <div key={stage.id} className="space-y-2">
                                <Label htmlFor={`stage-name-${stage.id}`} className={cn("text-lg font-medium px-2", stage.name ? "text-grey-1" : "text-black")}>
                                    {stage.type === 'stage' ? `Stage ${index + 1}` : `Payment ${index + 1}`}
                                </Label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <Input
                                            id={`stage-name-${stage.id}`}
                                            value={stage.name}
                                            onChange={(e) => handleStageChange(stage.id, e.target.value)}
                                            placeholder={stage.type === 'stage' ? 'Enter stage name' : 'Enter payment description'}
                                            className={cn("h-[54px] bg-background rounded-full px-6 text-lg", stage.type === 'payment' && "pl-12")}
                                        />
                                        {stage.type === 'payment' && <Banknote className="h-5 w-5 text-green absolute left-4 top-1/2 -translate-y-1/2" />}
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveStage(stage.id)} className="h-[54px] w-[54px]">
                                        <Trash2 className="h-5 w-5 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                    <div className="px-6 py-4 border-t flex justify-between items-center gap-2 shrink-0 bg-white rounded-b-[20px]">
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => addStage('stage')} className="h-[54px] rounded-full text-lg">
                                <Plus className="mr-2 h-5 w-5"/>
                                Stage
                            </Button>
                            <Button variant="outline" onClick={() => addStage('payment')} className="h-[54px] rounded-full text-lg text-green border-green hover:bg-green/10 hover:text-green">
                                <Banknote className="mr-2 h-5 w-5" />
                                Payment
                            </Button>
                        </div>
                        <Button onClick={handleSave} className="h-[54px] rounded-full text-lg">Save Template</Button>
                    </div>
                </div>
            </DialogContentComponent>
        </DialogComponent>
    );
};

interface AddProjectSheetProps {
    onProjectAdded: (project: Project) => void;
    onProjectUpdated: (project: Project) => void;
    projectToEdit: Project | null;
    onOpenChange: (isOpen: boolean) => void;
}

export function AddProjectSheet({ onProjectAdded, projectToEdit, onProjectUpdated, onOpenChange }: AddProjectSheetProps) {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [step, setStep] = useState(1);
    
    const [templates, setTemplates] = useState<TimelineTemplate[]>([
        { id: 'design', name: 'Only Design (Architectural)', stages: initialDesignStages },
        { id: 'construction', name: 'Only Construction', stages: initialConstructionStages },
        { id: 'both', name: 'Design & Construction', stages: [...initialDesignStages, ...initialConstructionStages] },
    ]);
    const [selectedTemplateId, setSelectedTemplateId] = useState('both');

    const isEditMode = !!projectToEdit;

    useEffect(() => {
        if (projectToEdit) {
            setIsOpen(true);
        }
    }, [projectToEdit]);

    const handleOpenChangeInternal = (open: boolean) => {
        if (!open) {
            setStep(1);
            onOpenChange(false);
        }
        setIsOpen(open);
    }
    
    const handleSuccess = () => {
        setIsOpen(false);
        setShowSuccess(true);
        setTimeout(() => setStep(1), 500); // Reset step after closing
        // You would call onProjectAdded or onProjectUpdated here with the new/updated project data
    };

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const DialogOrSheet = isMobile ? Dialog : Dialog;
    const DialogOrSheetContent = isMobile ? DialogContent : DialogContent;
    const DialogOrSheetHeader = isMobile ? SheetHeader : DialogHeader;
    const DialogOrSheetTitle = isMobile ? DialogTitle : DialogTitle;
    const DialogOrSheetClose = isMobile ? DialogClose : DialogClose;
    const DialogOrSheetTrigger = isMobile ? DialogTrigger : DialogTrigger;

    const title = isEditMode
        ? 'Edit Project'
        : step === 1
        ? 'Add New Project'
        : 'Project Timeline';

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={handleOpenChangeInternal}>
                {!isEditMode && (
                    <DialogOrSheetTrigger asChild>
                        <Button className="bg-primary/10 text-primary border border-primary rounded-full h-[54px] hover:bg-primary/20 text-lg px-6">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Add Project
                        </Button>
                    </DialogOrSheetTrigger>
                )}
                <DialogOrSheetContent
                    className={cn(
                        "p-0 bg-white flex flex-col",
                        isMobile 
                            ? "w-full h-full rounded-none border-none m-0"
                            : "sm:max-w-3xl rounded-[50px] h-auto max-h-[90vh]"
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
                            <AddProjectForm onNext={handleNext} projectToEdit={projectToEdit} />
                        ) : (
                            <ProjectTimelineForm
                                onFormSuccess={handleSuccess}
                                onBack={handleBack}
                                templates={templates}
                                setTemplates={setTemplates}
                                selectedTemplateId={selectedTemplateId}
                                setSelectedTemplateId={setSelectedTemplateId}
                                isEditMode={isEditMode}
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
