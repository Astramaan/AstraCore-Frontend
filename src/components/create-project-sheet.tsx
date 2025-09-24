

'use client';

import React, { useState, useEffect, useTransition } from 'react';
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
import { addProject } from '@/app/actions';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Card, CardContent } from './ui/card';

const mockArchitects = [
    { value: "554cee57f2f634d9", label: "Darshan" },
    { value: "anil@habi.one", label: "Anil Kumar" },
    { value: "yaswanth@habi.one", label: "Yaswanth" },
];

const mockSupervisors = [
    { value: "55e79200c1635b37", label: "Supervisor 1" },
    { value: "supervisor2", label: "Supervisor 2" },
    { value: "supervisor3", label: "Supervisor 3" },
];

const mockClients = [
    { id: 'CHA2024', name: "Charan Project", city: "Mysuru", address: "123, Mysore Palace Road, Mysore, Karnataka 570001", email: "admin@abc.com", phone: "+91 1234567890", type: 'client' as const },
    { id: 'DEL2024', name: "Delta Project", city: "Bengaluru", address: "456, MG Road, Bengaluru, Karnataka 560001", email: "contact@delta.com", phone: "+91 9876543210", type: 'client' as const },
    { id: 'GAM2024', name: "Gamma Project", city: "Chennai", address: "789, T Nagar, Chennai, Tamil Nadu 600017", email: "support@gamma.co", phone: "+91 8765432109", type: 'client' as const },
];
const mockLeads = [
    { id: 'LEAD2024', name: "Alpha Lead", city: "Hyderabad", address: "101, Hitech City, Hyderabad, Telangana 500081", email: "sales@alpha.io", phone: "+91 7654321098", type: 'lead' as const },
    { id: 'LEAD2024-2', name: "Beta Lead", city: "Mumbai", address: "202, Bandra West, Mumbai, Maharashtra 400050", email: "info@betaleads.com", phone: "+91 6543210987", type: 'lead' as const },
];
const allContacts = [...mockClients.map(c => ({...c, type: 'client' as const})), ...mockLeads.map(l => ({...l, type: 'lead' as const}))];


const FloatingLabelInput = ({ id, label, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, value: string }) => (
    <div className="space-y-2">
        <Label htmlFor={id} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        <Input id={id} className="h-14 bg-background rounded-full px-5" value={value} {...props} />
    </div>
);

const FloatingLabelTextarea = ({ id, label, value, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, value: string }) => (
    <div className="space-y-2">
        <Label htmlFor={id} className={cn("text-lg font-medium px-2", value ? 'text-grey-1' : 'text-zinc-900')}>{label}</Label>
        <Textarea id={id} className="h-28 bg-background rounded-3xl p-5" value={value} {...props} />
    </div>
)

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
    const [name, setName] = useState(projectToEdit?.name || projectData?.customerDetails?.name || '');
    const [phone, setPhone] = useState(projectToEdit?.contact.split(' | ')[1] || projectData?.customerDetails?.phoneNumber || '');
    const [email, setEmail] = useState(projectToEdit?.contact.split(' | ')[0] || projectData?.customerDetails?.email || '');
    const [currentAddress, setCurrentAddress] = useState(projectData?.customerDetails?.currentAddress || '');
    const [projectName, setProjectName] = useState(projectToEdit?.name || projectData?.projectDetails?.projectName || '');
    const [projectType, setProjectType] = useState(projectData?.projectDetails?.projectType || '');
    const [projectCost, setProjectCost] = useState(projectData?.projectDetails?.projectCost || '');
    const [dimension, setDimension] = useState(projectData?.projectDetails?.dimension || '');
    const [floor, setFloor] = useState(projectData?.projectDetails?.floor || '');
    const [siteLocationLink, setSiteLocationLink] = useState(projectToEdit?.city || projectData?.projectDetails?.siteLocationLink || '');
    const [siteAddress, setSiteAddress] = useState(projectData?.projectDetails?.siteAddress || '');
    const [architect, setArchitect] = useState(projectData?.projectAssign?.architect || '');
    const [siteSupervisor, setSiteSupervisor] = useState(projectData?.projectAssign?.siteSupervisor || '');
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
            setName(`${contact.name}`);
            setPhone(contact.phone);
            setEmail(contact.email);
            setCurrentAddress(contact.address);
        }
        setEmailComboboxOpen(false);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            customerDetails: {
                name: name,
                email: email,
                phoneNumber: phone,
                currentAddress: currentAddress,
            },
            projectDetails: {
                projectName: projectName,
                projectType: projectType,
                projectCost: projectCost,
                dimension: dimension,
                floor: floor,
                siteLocationLink: siteLocationLink,
                siteAddress: siteAddress
            },
            projectAssign: {
                architect: architect,
                siteSupervisor: siteSupervisor
            }
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
                             <div className="space-y-2 sm:col-span-2">
                                <div className="flex items-baseline gap-2">
                                    <Label htmlFor="email" className={cn("text-lg font-medium px-2", email ? 'text-grey-1' : 'text-zinc-900')}>Email*</Label>
                                    <span className="text-xs text-muted-foreground">(enter to fetch the personal details.)</span>
                                </div>
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
                            <FloatingLabelInput id="name" name="name" label="Name*" value={name} onChange={handleTextOnlyChange(setName)} />
                            <FloatingLabelInput id="phone-number" name="phone_number" label="Phone Number*" type="tel" value={phone} onChange={handleNumberOnlyChange(setPhone)} />
                            
                            <div className="sm:col-span-2">
                                <FloatingLabelTextarea id="current-address" name="current_address" label="Current Address*" value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg text-stone-500">Project details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FloatingLabelInput id="project-name" name="project_name" label="Project Name*" value={projectName} onChange={e => setProjectName(e.target.value)} />
                                <FloatingLabelSelect id="project-type" name="project_type" label="Project Type*" value={projectType} onValueChange={setProjectType}>
                                    <SelectItem value="new-construction">New Construction</SelectItem>
                                    <SelectItem value="renovation">Renovation</SelectItem>
                                    <SelectItem value="interior-design">Interior Design</SelectItem>
                                </FloatingLabelSelect>
                            </div>
                            <FloatingLabelInput id="project-cost" name="project_cost" label="Project Cost*" value={projectCost} onChange={handleNumberOnlyChange(setProjectCost)} />
                            <FloatingLabelInput id="dimension" name="dimension" label="Dimension (sq.ft)*" value={dimension} onChange={handleNumberOnlyChange(setDimension)} />
                            <FloatingLabelSelect id="floor" label="Floor*" value={floor} onValueChange={setFloor}>
                                {Array.from({ length: 8 }, (_, i) => `G+${i + 1}`).map(f => (
                                    <SelectItem key={f} value={f.toLowerCase()}>{f}</SelectItem>
                                ))}
                            </FloatingLabelSelect>
                             <FloatingLabelInput id="site-location-link" name="site_location_link" label="Site Location link*" type="url" value={siteLocationLink} onChange={e => setSiteLocationLink(e.target.value)} />
                            <div className="sm:col-span-2">
                                <FloatingLabelTextarea id="site-address" name="site_address" label="Site Address" value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} />
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

export interface Phase {
    name: string;
    stages: Stage[];
}

export interface Stage {
    name: string;
    tasks: Task[];
}

export interface Task {
    name: string;
    duration: string;
}

export interface TimelineTemplate {
    id: string;
    name: string;
    phases: Phase[];
    isCustom?: boolean;
}

const initialTimelineData: Phase[] = [
    {
        name: "Design",
        stages: [
            {
                name: "Architectural Design",
                tasks: [
                    { name: "Design Presentation", duration: "3 Days" },
                    { name: "Concept Approval", duration: "2 Days" }
                ]
            },
            {
                name: "Structural Design",
                tasks: [
                    { name: "Analysis Report", duration: "4 Days" },
                    { name: "Foundation Design", duration: "2 Days" }
                ]
            }
        ]
    },
    {
        name: "Civil",
        stages: [
            {
                name: "Excavation",
                tasks: [
                    { name: "Digging", duration: "5 Days" },
                    { name: "Soil Testing", duration: "3 Days" }
                ]
            }
        ]
    },
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
    const [isPending, startTransition] = useTransition();
    const [isCustomTimelineDialogOpen, setIsCustomTimelineDialogOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const timeline: Phase[] = [];

        initialTimelineData.forEach((phase, phaseIndex) => {
            const newPhase: Phase = { name: phase.name, stages: [] };
            phase.stages.forEach((stage, stageIndex) => {
                const newStage: Stage = { name: stage.name, tasks: [] };
                stage.tasks.forEach((task, taskIndex) => {
                    newStage.tasks.push({
                        name: task.name,
                        duration: formData.get(`duration_${phaseIndex}_${stageIndex}_${taskIndex}`) as string || task.duration,
                    });
                });
                newPhase.stages.push(newStage);
            });
            timeline.push(newPhase);
        });

        const fullData = { ...projectData, phases: timeline, startDate: startDate?.toISOString() };

        startTransition(async () => {
            const result = await addProject(fullData);
            if (result.success) {
                onFormSuccess();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: result.message || 'Failed to create project.',
                });
            }
        });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col h-full"
            >
                <ScrollArea className="flex-1 p-6 no-scrollbar">
                    <div className="space-y-8">
                        <div className="space-y-6">
                             <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
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
                                    <input type="hidden" name="startDate" value={startDate?.toISOString() || ''} />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="h-14 rounded-full px-4 w-full">
                                            Template
                                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Residential Template</DropdownMenuItem>
                                        <DropdownMenuItem>Commercial Template</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button type="button" onClick={() => setIsCustomTimelineDialogOpen(true)} className="h-14 rounded-full px-4 w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create new Timeline
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {initialTimelineData.map((phase, phaseIndex) => (
                                    <Card key={phase.name} className="rounded-[30px] bg-background">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold mb-4">{phase.name}</h3>
                                            <div className="space-y-4">
                                                {phase.stages.map((stage, stageIndex) => (
                                                    <div key={stage.name} className="p-4 rounded-2xl border bg-white">
                                                        <p className="font-medium text-lg mb-4">{stage.name}</p>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {stage.tasks.map((task, taskIndex) => (
                                                                <div key={task.name} className="space-y-2">
                                                                    <Label className="text-base font-normal px-2 text-zinc-900">{task.name}</Label>
                                                                    <Input
                                                                        name={`duration_${phaseIndex}_${stageIndex}_${taskIndex}`}
                                                                        className="h-12 bg-background rounded-full px-5"
                                                                        placeholder="Duration (optional)"
                                                                        defaultValue={task.duration}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <div className="p-6 mt-auto border-t md:border-0 flex justify-between items-center">
                    <Button type="button" variant="outline" className="px-10 h-14 text-lg rounded-full" onClick={onBack}>
                        Back
                    </Button>
                    <Button type="submit" className="px-10 h-14 text-lg rounded-full" disabled={isPending}>
                         {isPending ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Create Project')}
                    </Button>
                </div>
            </form>
            <CustomTimelineDialog
                isOpen={isCustomTimelineDialogOpen}
                onClose={() => setIsCustomTimelineDialogOpen(false)}
                onSave={(template) => console.log('save template', template)}
                templateToEdit={null}
            />
        </>
    );
};

const CustomTimelineDialog = ({ isOpen, onClose, onSave, templateToEdit }: { isOpen: boolean, onClose: () => void, onSave: (template: TimelineTemplate) => void, templateToEdit: TimelineTemplate | null | undefined }) => {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const [templateName, setTemplateName] = useState('');
    const [phases, setPhases] = useState<Phase[]>([{ name: 'Phase 1', stages: [{ name: 'Stage 1', tasks: [{ name: 'Task 1', duration: '' }] }] }]);


    useEffect(() => {
        if (isOpen) {
            if (templateToEdit) {
                setTemplateName(templateToEdit.name);
                setPhases(templateToEdit.phases);
            } else {
                setTemplateName('');
                setPhases([{ name: 'Phase 1', stages: [{ name: 'Stage 1', tasks: [{ name: 'Task 1', duration: '' }] }] }]);
            }
        }
    }, [templateToEdit, isOpen]);


    const handleSave = () => {
        // This functionality needs to be implemented based on the new structure
        toast({ title: "Custom timelines not yet implemented" });
        onClose();
    };

    const addPhase = () => setPhases(p => [...p, { name: `Phase ${p.length + 1}`, stages: [{ name: 'New Stage', tasks: [{ name: 'New Task', duration: '' }] }] }]);
    
    const addStage = (phaseIndex: number) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].stages.push({ name: `New Stage`, tasks: [{ name: 'New Task', duration: '' }] });
        setPhases(newPhases);
    };

    const addTask = (phaseIndex: number, stageIndex: number) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].stages[stageIndex].tasks.push({ name: `New Task`, duration: '' });
        setPhases(newPhases);
    };
    
    const removePhase = (phaseIndex: number) => {
        const newPhases = phases.filter((_, i) => i !== phaseIndex);
        setPhases(newPhases);
    }
    const removeStage = (phaseIndex: number, stageIndex: number) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].stages = newPhases[phaseIndex].stages.filter((_, i) => i !== stageIndex);
        setPhases(newPhases);
    }
    const removeTask = (phaseIndex: number, stageIndex: number, taskIndex: number) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].stages[stageIndex].tasks = newPhases[phaseIndex].stages[stageIndex].tasks.filter((_, i) => i !== taskIndex);
        setPhases(newPhases);
    }
    
    const handleInputChange = (value: string, type: 'phase' | 'stage' | 'task' | 'duration', indices: {phase: number, stage?: number, task?: number}) => {
        const newPhases = [...phases];
        if(type === 'phase' && indices.stage === undefined) {
             newPhases[indices.phase].name = value;
        } else if (type === 'stage' && indices.stage !== undefined) {
            newPhases[indices.phase].stages[indices.stage].name = value;
        } else if (type === 'task' && indices.stage !== undefined && indices.task !== undefined) {
            newPhases[indices.phase].stages[indices.stage].tasks[indices.task].name = value;
        } else if (type === 'duration' && indices.stage !== undefined && indices.task !== undefined) {
            newPhases[indices.phase].stages[indices.stage].tasks[indices.task].duration = value;
        }
        setPhases(newPhases);
    }

    const DialogComponent = Dialog;
    const DialogContentComponent = DialogContent;


    return (
        <DialogComponent open={isOpen} onOpenChange={onClose}>
            <DialogContentComponent className={cn(
                "p-0 flex flex-col bg-white transition-all m-0",
                "sm:max-w-4xl rounded-[50px] h-auto max-h-[90vh] md:bottom-auto bottom-0"
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
                <ScrollArea className="flex-1">
                    <div className="p-6 space-y-4">
                        <Input
                            placeholder="Template Name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            className="h-14 rounded-full bg-background text-lg mb-4"
                        />
                        {phases.map((phase, phaseIndex) => (
                            <Card key={phaseIndex} className="p-4 border rounded-[30px] space-y-4 bg-background">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                        <Input value={phase.name} onChange={e => handleInputChange(e.target.value, 'phase', {phase: phaseIndex})} className="text-xl font-semibold bg-transparent border-0 shadow-none focus-visible:ring-0 p-0" />
                                        <Button size="icon" variant="ghost" onClick={() => removePhase(phaseIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                    <div className="pl-6 space-y-4">
                                        {phase.stages.map((stage, stageIndex) => (
                                            <Card key={stageIndex} className="p-4 rounded-2xl border bg-white space-y-4">
                                                <CardContent className="p-0 space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                                        <Input value={stage.name} onChange={e => handleInputChange(e.target.value, 'stage', {phase: phaseIndex, stage: stageIndex})} className="font-medium text-lg bg-transparent border-0 shadow-none focus-visible:ring-0 p-0" />
                                                        <Button size="icon" variant="ghost" onClick={() => removeStage(phaseIndex, stageIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                                    </div>
                                                    <div className="pl-6 space-y-4">
                                                        {stage.tasks.map((task, taskIndex) => (
                                                            <div key={taskIndex} className="grid grid-cols-[1fr_auto] items-center gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                                                    <Input placeholder="Task Name" value={task.name} onChange={e => handleInputChange(e.target.value, 'task', {phase: phaseIndex, stage: stageIndex, task: taskIndex})} className="h-12 bg-background rounded-full px-5"/>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Input placeholder="Duration (optional)" value={task.duration} onChange={e => handleInputChange(e.target.value, 'duration', {phase: phaseIndex, stage: stageIndex, task: taskIndex})} className="h-12 w-40 bg-background rounded-full px-5"/>
                                                                    <Button size="icon" variant="ghost" onClick={() => removeTask(phaseIndex, stageIndex, taskIndex)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <Button variant="outline" className="rounded-full" onClick={() => addTask(phaseIndex, stageIndex)}>
                                                            <Plus className="mr-2 h-4 w-4" /> Add Task
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        <Button variant="outline" className="rounded-full" onClick={() => addStage(phaseIndex)}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Stage
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Button variant="outline" onClick={addPhase} className="w-full mt-4 h-14 rounded-full text-lg">
                        <Plus className="mr-2 h-4 w-4" /> Add Phase
                    </Button>
                </ScrollArea>
                <div className="px-6 py-4 border-t flex flex-col gap-4 shrink-0 bg-white rounded-b-[20px]">
                     <Button onClick={handleSave} className="h-[54px] rounded-full text-lg w-full">Save Template</Button>
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
                {!isEditMode && trigger && (
                    <DialogOrSheetTrigger asChild>
                        {trigger}
                    </DialogOrSheetTrigger>
                )}
                 {!isEditMode && !trigger && (
                    <DialogOrSheetTrigger asChild>
                        {DefaultTrigger}
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
