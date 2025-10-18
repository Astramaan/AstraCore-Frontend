
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import {
  PlusCircle,
  X,
  ArrowRight,
  Check,
  ChevronsUpDown,
  Banknote,
  Trash2,
  Edit,
  Plus,
  GanttChartSquare,
  Calendar as CalendarIcon,
  ShieldAlert,
  Search,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { SuccessPopup } from "./success-popup";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { Project } from "@/lib/data";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useRouter, useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";
import { useUser, User } from "@/context/user-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Lead } from "./lead-details-sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

const mockLeads: Lead[] = [
  {
    organization: 'Habi',
    leadId: 'LEAD001',
    fullName: 'John Doe',
    contact: 'john.doe@example.com | 1234567890',
    phone: '1234567890',
    email: 'john.doe@example.com',
    address: 'Pincode: 110011',
    pincode: '110011',
    tokenAmount: '1000',
    level: 'Level 1',
    profileImage: 'https://placehold.co/94x94.png',
    coverImage: 'https://placehold.co/712x144.png',
    siteImages: [],
  },
  {
    organization: 'Habi',
    leadId: 'LEAD002',
    fullName: 'Jane Smith',
    contact: 'jane.smith@example.com | 0987654321',
    phone: '0987654321',
    email: 'jane.smith@example.com',
    address: 'Pincode: 560001',
    pincode: '560001',
    tokenAmount: '2000',
    level: 'Level 2',
    profileImage: 'https://placehold.co/94x94.png',
    coverImage: 'https://placehold.co/712x144.png',
    siteImages: [],
  },
];

const mockUsers: User[] = [
  { userId: 'USR001', name: 'Alice Architect', email: 'alice@habi.one', role: 'ORG_MEMBER', team: 'Architect', mobileNumber: '1111111111', organizationId: '', orgCode: '' },
  { userId: 'USR002', name: 'Bob Builder', email: 'bob@habi.one', role: 'ORG_MEMBER', team: 'Site Supervisor', mobileNumber: '2222222222', organizationId: '', orgCode: '' },
  { userId: 'USR003', name: 'Charlie Architect', email: 'charlie@habi.one', role: 'ORG_MEMBER', team: 'Architect', mobileNumber: '3333333333', organizationId: '', orgCode: '' },
  { userId: 'USR004', name: 'Diana Designer', email: 'diana@habi.one', role: 'ORG_MEMBER', team: 'Design', mobileNumber: '4444444444', organizationId: '', orgCode: '' },
  { userId: 'USR005', name: 'Sam Supervisor', email: 'sam@habi.one', role: 'ORG_MEMBER', team: 'Site Supervisor', mobileNumber: '5555555555', organizationId: '', orgCode: '' },
];


const FloatingLabelInput = ({
  id,
  label,
  value,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
}) => (
  <div className="space-y-2">
    <Label
      htmlFor={id}
      className={cn(
        "text-lg font-medium px-2",
        value ? "text-muted-foreground" : "text-foreground",
      )}
    >
      {label}
    </Label>
    <Input
      id={id}
      className="h-14 bg-background dark:bg-input rounded-full px-5"
      value={value}
      {...props}
    />
  </div>
);

const FloatingLabelTextarea = ({
  id,
  label,
  value,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  value: string;
}) => (
  <div className="space-y-2">
    <Label
      htmlFor={id}
      className={cn(
        "text-lg font-medium px-2",
        value ? "text-muted-foreground" : "text-foreground",
      )}
    >
      {label}
    </Label>
    <Textarea
      id={id}
      className="h-28 bg-background dark:bg-input rounded-3xl p-5"
      value={value}
      {...props}
    />
  </div>
);

const CreateProjectForm = ({
  onNext,
  projectToEdit,
  projectData,
}: {
  onNext: (data: any) => void;
  projectToEdit: Project | null;
  projectData: any;
}) => {
  const { user } = useUser();
  const [allContacts, setAllContacts] = useState<Lead[]>(mockLeads);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [emailComboboxOpen, setEmailComboboxOpen] = useState(false);
  const [projectTypeComboboxOpen, setProjectTypeComboboxOpen] =
    useState(false);
  const [floorComboboxOpen, setFloorComboboxOpen] = useState(false);
  const [architectComboboxOpen, setArchitectComboboxOpen] = useState(false);
  const [supervisorComboboxOpen, setSupervisorComboboxOpen] = useState(false);

  const [name, setName] = useState(
    projectToEdit?.personalDetails?.name ||
      projectData?.personalDetails?.name ||
      "",
  );
  const [phone, setPhone] = useState(
    projectToEdit?.personalDetails?.phoneNumber ||
      projectData?.personalDetails?.phoneNumber ||
      "",
  );
  const [email, setEmail] = useState(
    projectToEdit?.personalDetails?.email ||
      projectData?.personalDetails?.email ||
      "",
  );
  const [currentAddress, setCurrentAddress] = useState(
    projectToEdit?.personalDetails?.currentAddress ||
      projectData?.personalDetails?.currentAddress ||
      "",
  );

  const [projectName, setProjectName] = useState(
    projectToEdit?.projectDetails?.projectName ||
      projectToEdit?.name ||
      projectData?.projectDetails?.projectName ||
      `Nathvilla ${Math.floor(Math.random() * 100)}`,
  );
  const [projectType, setProjectType] = useState(
    projectToEdit?.projectType ||
      projectData?.projectDetails?.projectType ||
      "New Construction",
  );
  const [projectCost, setProjectCost] = useState(
    projectToEdit?.projectDetails?.projectCost ||
      projectData?.projectDetails?.projectCost ||
      "50,00,000",
  );
  const [dimension, setDimension] = useState(
    projectToEdit?.projectDetails?.dimension ||
      projectData?.projectDetails?.dimension ||
      "2000 sq.ft",
  );
  const [floor, setFloor] = useState(
    projectToEdit?.projectDetails?.floor ||
      projectData?.projectDetails?.floor ||
      "G+2",
  );
  const [siteLocation, setSiteLocation] = useState(
    projectToEdit?.projectDetails?.siteLocation ||
      projectData?.projectDetails?.siteLocation ||
      "Bandra West",
  );
  const [siteLocationLink, setSiteLocationLink] = useState(
    projectToEdit?.projectDetails?.siteLocationLink ||
      projectData?.projectDetails?.siteLocationLink ||
      "https://maps.google.com/site-link",
  );
  const [architect, setArchitect] = useState(
    projectToEdit?.projectAssign?.architect ||
      projectData?.projectAssign?.architect ||
      "",
  );
  const [siteSupervisor, setSiteSupervisor] = useState(
    projectToEdit?.projectAssign?.siteSupervisor ||
      projectData?.projectAssign?.siteSupervisor ||
      "",
  );

  const architects = useMemo(
    () => allUsers.filter((u) => u.team === "Architect"),
    [allUsers],
  );
  const siteSupervisors = useMemo(
    () => allUsers.filter((u) => u.team === "Site Supervisor"),
    [allUsers],
  );

  const handleContactSelect = (contactId: string) => {
    const contact = allContacts.find((c) => c.leadId === contactId);
    if (contact) {
      setEmail(contact.email);
      setName(contact.fullName);
      setPhone(contact.phone);
      setCurrentAddress(contact.address);
    }
    setEmailComboboxOpen(false);
  };

  const handleTextOnlyChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setter(value);
      }
    };

  const handleNumberOnlyChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");
      setter(value);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      personalDetails: {
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
        siteLocation: siteLocation,
        siteLocationLink: siteLocationLink,
        siteAddress: siteLocation,
      },
      projectAssign: {
        architect: architect,
        siteSupervisor: siteSupervisor,
      },
    };
    onNext(formData);
  };

  const projectTypes = ["New Construction", "Renovation", "Interior Design"];
  const floorOptions = Array.from({ length: 8 }, (_, i) => `G+${i + 1}`);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6 no-scrollbar">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg text-muted-foreground">Personal details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="email-combobox"
                    className={cn(
                      "text-lg font-medium px-2",
                      email ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    Email*
                  </Label>
                  <Popover
                    open={emailComboboxOpen}
                    onOpenChange={setEmailComboboxOpen}
                    modal={true}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={emailComboboxOpen}
                        className="w-full justify-between h-14 bg-background rounded-full px-5 text-left font-normal"
                      >
                        <span className="truncate">
                          {email || "Select client or lead..."}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      portal={false}
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <Command>
                        <CommandInput placeholder="Search by email or name..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {allContacts.map((contact) => (
                              <CommandItem
                                key={contact.leadId}
                                value={`${contact.fullName.toLowerCase()} ${contact.email.toLowerCase()}`}
                                onSelect={() => handleContactSelect(contact.leadId)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    email === contact.email
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {contact.fullName}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {contact.email}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <FloatingLabelInput
                id="name"
                name="name"
                label="Name*"
                value={name}
                onChange={handleTextOnlyChange(setName)}
              />
              <FloatingLabelInput
                id="phone-number"
                name="phone_number"
                label="Phone Number*"
                type="tel"
                value={phone}
                onChange={handleNumberOnlyChange(setPhone)}
              />

              <div className="sm:col-span-2">
                <FloatingLabelTextarea
                  id="current-address"
                  name="current_address"
                  label="Current Address*"
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg text-muted-foreground">Project details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingLabelInput
                  id="project-name"
                  name="project_name"
                  label="Project Name*"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <div className="space-y-2">
                  <Label
                    htmlFor="project-type"
                    className={cn(
                      "text-lg font-medium px-2",
                      projectType ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    Project Type*
                  </Label>
                  <Popover
                    open={projectTypeComboboxOpen}
                    onOpenChange={setProjectTypeComboboxOpen}
                    modal={true}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={projectTypeComboboxOpen}
                        className="w-full justify-between h-14 bg-background dark:bg-input rounded-full px-5 cursor-pointer hover:bg-accent hover:text-accent-foreground text-left font-normal"
                      >
                        {projectType || "Select project type..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      portal={false}
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {projectTypes.map((type) => (
                              <CommandItem
                                key={type}
                                value={type}
                                onSelect={() => {
                                  setProjectType(type);
                                  setProjectTypeComboboxOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    projectType === type
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {type}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <FloatingLabelInput
                id="project-cost"
                name="project_cost"
                label="Project Cost*"
                value={projectCost}
                onChange={handleNumberOnlyChange(setProjectCost)}
              />
              <FloatingLabelInput
                id="dimension"
                name="dimension"
                label="Dimension (sq.ft)*"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
              />

              <div className="space-y-2">
                <Label
                  htmlFor="floor"
                  className={cn(
                    "text-lg font-medium px-2",
                    floor ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  Floor*
                </Label>
                <Popover
                  open={floorComboboxOpen}
                  onOpenChange={setFloorComboboxOpen}
                  modal={true}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={floorComboboxOpen}
                      className="w-full justify-between h-14 bg-background dark:bg-input rounded-full px-5 cursor-pointer hover:bg-accent hover:text-accent-foreground text-left font-normal"
                    >
                      {floor || "Select floor..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--radix-popover-trigger-width] p-0"
                    portal={false}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {floorOptions.map((f) => (
                            <CommandItem
                              key={f}
                              value={f}
                              onSelect={() => {
                                setFloor(f);
                                setFloorComboboxOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  floor === f ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {f}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <FloatingLabelInput
                id="siteLocation"
                name="siteLocation"
                label="Site Location"
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
              />
              <div className="sm:col-span-2">
                <FloatingLabelInput
                  id="site-location-link"
                  name="siteLocationLink"
                  label="Site Location link*"
                  type="url"
                  value={siteLocationLink}
                  onChange={(e) => setSiteLocationLink(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg text-muted-foreground">Project Assign</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="architect"
                  className={cn(
                    "text-lg font-medium px-2",
                    architect ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  Architect*
                </Label>
                <Popover
                  open={architectComboboxOpen}
                  onOpenChange={setArchitectComboboxOpen}
                  modal={true}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={architectComboboxOpen}
                      className="w-full justify-between h-14 bg-background dark:bg-input rounded-full px-5 text-left font-normal"
                    >
                      <span className="truncate">
                        {architects.find((a) => a.userId === architect)?.name ||
                          "Select architect..."}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--radix-popover-trigger-width] p-0"
                    portal={false}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Command>
                      <CommandInput placeholder="Search architects..." />
                      <CommandList>
                        <CommandEmpty>No architects found.</CommandEmpty>
                        <CommandGroup>
                          {architects.map((a) => (
                            <CommandItem
                              key={a.userId}
                              value={a.name}
                              onSelect={() => {
                                setArchitect(a.userId);
                                setArchitectComboboxOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  architect === a.userId
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {a.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="site-supervisor"
                  className={cn(
                    "text-lg font-medium px-2",
                    siteSupervisor
                      ? "text-muted-foreground"
                      : "text-foreground",
                  )}
                >
                  Site Supervisor*
                </Label>
                <Popover
                  open={supervisorComboboxOpen}
                  onOpenChange={setSupervisorComboboxOpen}
                  modal={true}
                >
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={supervisorComboboxOpen}
                      className="w-full justify-between h-14 bg-background dark:bg-input rounded-full px-5 text-left font-normal"
                    >
                      <span className="truncate">
                        {siteSupervisors.find((s) => s.userId === siteSupervisor)
                          ?.name || "Select site supervisor..."}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--radix-popover-trigger-width] p-0"
                    portal={false}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Command>
                      <CommandInput placeholder="Search supervisors..." />
                      <CommandList>
                        <CommandEmpty>No supervisors found.</CommandEmpty>
                        <CommandGroup>
                          {siteSupervisors.map((s) => (
                            <CommandItem
                              key={s.userId}
                              value={s.name}
                              onSelect={() => {
                                setSiteSupervisor(s.userId);
                                setSupervisorComboboxOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  siteSupervisor === s.userId
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {s.name}
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
        <Button
          type="submit"
          className="w-full md:w-auto px-10 h-14 text-lg rounded-full"
        >
          {projectToEdit ? "Save & Next" : "Next"}
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

const ProjectTimelineForm = ({
  onFormSuccess,
  onBack,
  isEditMode,
  projectData,
}: {
  onFormSuccess: (project: Project, responseData: any) => void;
  onBack: () => void;
  isEditMode: boolean;
  projectData: any;
}) => {
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();

  const [startDate, setStartDate] = useState<Date | undefined>(
    projectData?.startDate ? new Date(projectData.startDate) : new Date(),
  );
  const [isPending, startTransition] = React.useTransition();
  const [isCustomTimelineDialogOpen, setIsCustomTimelineDialogOpen] =
    useState(false);
  const [timeline, setTimeline] = useState<Phase[]>(projectData?.phases || []);
  const [templates, setTemplates] = useState<TimelineTemplate[]>([]);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [templateComboboxOpen, setTemplateComboboxOpen] = useState(false);

  useEffect(() => {
    const residentialTemplate: Phase[] = [
      {
        name: "Design",
        stages: [
          {
            name: "Architectural Design",
            tasks: [
              { name: "Design Presentation", duration: "3" },
              { name: "Concept Approval", duration: "2" },
            ],
          },
          {
            name: "Structural Design",
            tasks: [
              { name: "Analysis Report", duration: "4" },
              { name: "Foundation Design", duration: "2" },
            ],
          },
        ],
      },
      {
        name: "Construction",
        stages: [
          {
            name: "Foundation",
            tasks: [
              { name: "Excavation", duration: "5" },
              { name: "PCC", duration: "2" },
            ],
          },
          {
            name: "Superstructure",
            tasks: [
              { name: "Framing", duration: "10" },
              { name: "Roofing", duration: "7" },
            ],
          },
        ],
      },
    ];

    const commercialTemplate: Phase[] = [
      {
        name: "Pre-construction",
        stages: [
          {
            name: "Site Analysis",
            tasks: [
              { name: "Surveying", duration: "5" },
              { name: "Geotechnical Investigation", duration: "7" },
            ],
          },
          {
            name: "Permitting",
            tasks: [
              { name: "Submit plans", duration: "2" },
              { name: "Await approval", duration: "30" },
            ],
          },
        ],
      },
      {
        name: "Construction",
        stages: [
          {
            name: "Foundation",
            tasks: [
              { name: "Heavy Excavation", duration: "10" },
              { name: "Reinforcement", duration: "10" },
            ],
          },
          {
            name: "Structure",
            tasks: [
              { name: "Steel Erection", duration: "20" },
              { name: "Cladding", duration: "15" },
            ],
          },
        ],
      },
    ];

    const foundationTemplate: Phase[] = [
      {
        name: "Foundation",
        stages: [
          {
            name: "Excavation",
            tasks: [
              {
                name: "Digging",
                duration: "3",
              },
            ],
          },
        ],
      },
    ];

    setTemplates([
      {
        id: "residential",
        name: "Residential Template",
        phases: residentialTemplate,
      },
      {
        id: "commercial",
        name: "Commercial Template",
        phases: commercialTemplate,
      },
      {
        id: "foundation",
        name: "Foundation Template",
        phases: foundationTemplate,
      },
    ]);
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setTimeline(template.phases);
    }
  };

  const handleDurationChange = (
    phaseIndex: number,
    stageIndex: number,
    taskIndex: number,
    value: string,
  ) => {
    const newTimeline = [...timeline];
    newTimeline[phaseIndex].stages[stageIndex].tasks[taskIndex].duration =
      value;
    setTimeline(newTimeline);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const timelineData: Phase[] = timeline.map((phase) => ({
      ...phase,
      stages: phase.stages.map((stage) => ({
        ...stage,
        tasks: stage.tasks.map((task) => ({
          ...task,
          duration: `${task.duration} Days`,
          status: "Not Started",
        })),
      })),
    }));

    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not found. Please log in again.",
      });
      return;
    }

    const fullData = {
      ...projectData,
      createdBy: user.userId,
      phases: timelineData,
      startDate: startDate?.toISOString(),
      organizationId: params.organizationId,
    };

    startTransition(async () => {
      try {
        let result: { success: boolean; data?: any; message?: string };
        let response;
        if (isEditMode) {
          response = await fetch(`/api/projects/${projectData.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-user": JSON.stringify(user),
            },
            body: JSON.stringify(fullData),
          });
        } else {
          response = await fetch("/api/projects", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-user": JSON.stringify(user),
            },
            body: JSON.stringify(fullData),
          });
        }

        const text = await response.text();
        result = text ? JSON.parse(text) : {};

        if (response.ok) {
          onFormSuccess(result.data, result);
          router.refresh();
        } else {
          setBackendError(result.message || "An unexpected error occurred.");
        }
      } catch (error) {
        setBackendError("An unexpected error occurred.");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-6 no-scrollbar">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label
                    htmlFor="start-date"
                    className="text-lg font-medium px-2"
                  >
                    Start Date*
                  </Label>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal h-14 bg-background dark:bg-input rounded-full px-5",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          new Date(startDate).toLocaleDateString("en-GB")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      portal={false}
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Popover
                  open={templateComboboxOpen}
                  onOpenChange={setTemplateComboboxOpen}
                  modal={true}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-14 rounded-full px-4 w-full"
                    >
                      Template
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[--radix-popover-trigger-width] p-0"
                    portal={false}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {templates.map((template) => (
                            <CommandItem
                              key={template.id}
                              value={template.id}
                              onSelect={() => {
                                handleTemplateSelect(template.id);
                                setTemplateComboboxOpen(false);
                              }}
                            >
                              {template.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  type="button"
                  onClick={() => setIsCustomTimelineDialogOpen(true)}
                  className="h-14 rounded-full px-4 w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create new Timeline
                </Button>
              </div>

              <div className="space-y-4">
                {timeline.map((phase, phaseIndex) => (
                  <Card
                    key={phase.name}
                    className="rounded-[30px] bg-background dark:bg-input"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">
                        {phase.name}
                      </h3>
                      <div className="space-y-4">
                        {phase.stages.map((stage, stageIndex) => (
                          <div
                            key={stage.name}
                            className="p-4 rounded-2xl border bg-card"
                          >
                            <p className="font-medium text-lg mb-4">
                              {stage.name}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {stage.tasks.map((task, taskIndex) => (
                                <div key={task.name} className="space-y-2">
                                  <Label className="text-base font-normal px-2 text-foreground">
                                    {task.name}
                                  </Label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      name={`duration_${phaseIndex}_${stageIndex}_${taskIndex}`}
                                      type="number"
                                      className="h-12 bg-background dark:bg-input rounded-full px-5"
                                      placeholder="Duration"
                                      value={task.duration}
                                      onChange={(e) =>
                                        handleDurationChange(
                                          phaseIndex,
                                          stageIndex,
                                          taskIndex,
                                          e.target.value,
                                        )
                                      }
                                    />
                                    <span className="text-muted-foreground">
                                      {task.duration === "1" ? "Day" : "Days"}
                                    </span>
                                  </div>
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
          <Button
            type="button"
            variant="outline"
            className="px-10 h-14 text-lg rounded-full"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="px-10 h-14 text-lg rounded-full"
            disabled={isPending}
          >
            {isPending
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Create Project"}
          </Button>
        </div>
      </form>
      <AlertDialog
        open={!!backendError}
        onOpenChange={() => setBackendError(null)}
      >
        <AlertDialogContent className="max-w-md rounded-[50px]">
          <AlertDialogHeader className="items-center text-center">
            <div className="relative mb-6 flex items-center justify-center h-20 w-20">
              <div className="w-full h-full bg-red-600/5 rounded-full" />
              <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
              <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
            </div>
            <AlertDialogTitle className="text-2xl font-semibold">
              Error
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-muted-foreground">
              {backendError}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
            <AlertDialogAction
              onClick={() => setBackendError(null)}
              className="w-40 h-14 px-10 bg-primary rounded-[50px] text-lg font-medium text-primary-foreground hover:bg-primary/90"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CustomTimelineDialog
        isOpen={isCustomTimelineDialogOpen}
        onClose={() => setIsCustomTimelineDialogOpen(false)}
        onSave={(template) => console.log("save template", template)}
        templateToEdit={null}
      />
    </>
  );
};
interface CustomTimelineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: TimelineTemplate) => void;
  templateToEdit: TimelineTemplate | null;
}

const CustomTimelineDialog = ({
  isOpen,
  onClose,
  onSave,
  templateToEdit,
}: CustomTimelineDialogProps) => {
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState("");
  const [phases, setPhases] = useState<Phase[]>([
    {
      name: "Phase 1",
      stages: [{ name: "Stage 1", tasks: [{ name: "Task 1", duration: "" }] }],
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      if (templateToEdit) {
        setTemplateName(templateToEdit.name);
        setPhases(templateToEdit.phases);
      } else {
        setTemplateName("");
        setPhases([
          {
            name: "Phase 1",
            stages: [
              { name: "Stage 1", tasks: [{ name: "New Task", duration: "" }] },
            ],
          },
        ]);
      }
    }
  }, [templateToEdit, isOpen]);

  const handleSave = () => {
    toast({ title: "Custom timelines not yet implemented" });
    onClose();
  };

  const addPhase = () =>
    setPhases((p) => [
      ...p,
      {
        name: `Phase ${p.length + 1}`,
        stages: [
          { name: "New Stage", tasks: [{ name: "New Task", duration: "" }] },
        ],
      },
    ]);

  const addStage = (phaseIndex: number) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].stages.push({
      name: `New Stage`,
      tasks: [{ name: "New Task", duration: "" }],
    });
    setPhases(newPhases);
  };

  const addTask = (phaseIndex: number, stageIndex: number) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].stages[stageIndex].tasks.push({
      name: `New Task`,
      duration: "",
    });
    setPhases(newPhases);
  };

  const removePhase = (phaseIndex: number) => {
    const newPhases = phases.filter((_, i) => i !== phaseIndex);
    setPhases(newPhases);
  };
  const removeStage = (phaseIndex: number, stageIndex: number) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].stages = newPhases[phaseIndex].stages.filter(
      (_, i) => i !== stageIndex,
    );
    setPhases(newPhases);
  };
  const removeTask = (
    phaseIndex: number,
    stageIndex: number,
    taskIndex: number,
  ) => {
    const newPhases = [...phases];
    newPhases[phaseIndex].stages[stageIndex].tasks = newPhases[
      phaseIndex
    ].stages[stageIndex].tasks.filter((_, i) => i !== taskIndex);
    setPhases(newPhases);
  };

  const handleInputChange = (
    value: string,
    type: "phase" | "stage" | "task" | "duration",
    indices: { phase: number; stage?: number; task?: number },
  ) => {
    const newPhases = [...phases];
    if (type === "phase" && indices.stage === undefined) {
      newPhases[indices.phase].name = value;
    } else if (type === "stage" && indices.stage !== undefined) {
      newPhases[indices.phase].stages[indices.stage].name = value;
    } else if (
      type === "task" &&
      indices.stage !== undefined &&
      indices.task !== undefined
    ) {
      newPhases[indices.phase].stages[indices.stage].tasks[indices.task].name =
        value;
    } else if (
      type === "duration" &&
      indices.stage !== undefined &&
      indices.task !== undefined
    ) {
      newPhases[indices.phase].stages[indices.stage].tasks[
        indices.task
      ].duration = value;
    }
    setPhases(newPhases);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "p-0 flex flex-col bg-card text-card-foreground transition-all m-0 border-none",
          "sm:max-w-4xl rounded-t-[50px] md:rounded-[50px] h-full md:h-auto md:max-h-[90vh] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        )}
      >
        <DialogHeader className="p-6 border-b shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-semibold">
              {templateToEdit
                ? "Edit Timeline Template"
                : "Create Custom Timeline"}
            </span>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 bg-background dark:bg-input rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 space-y-4">
            <Input
              placeholder="Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="h-14 rounded-full bg-background dark:bg-input text-lg"
            />
            <div className="text-xs text-muted-foreground p-4 bg-background dark:bg-input rounded-lg space-y-1">
              <p>
                <strong>Phase:</strong> A major section of the project (e.g.,
                Design, Construction).
              </p>
              <p>
                <strong>Stage:</strong> A sub-section within a phase (e.g.,
                Foundation, Framing).
              </p>
              <p>
                <strong>Task:</strong> An individual action item within a stage
                (e.g., Pour concrete, Install windows).
              </p>
            </div>
          </div>
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4">
              {phases.map((phase, phaseIndex) => (
                <Card
                  key={phaseIndex}
                  className="p-4 border rounded-[30px] space-y-4 bg-background dark:bg-input"
                >
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-center gap-2">
                      <GanttChartSquare className="h-5 w-5 text-muted-foreground cursor-grab" />
                      <Input
                        value={phase.name}
                        onChange={(e) =>
                          handleInputChange(e.target.value, "phase", {
                            phase: phaseIndex,
                          })
                        }
                        className="text-xl font-semibold bg-transparent border-0 shadow-none focus-visible:ring-0 p-0"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removePhase(phaseIndex)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="pl-6 space-y-4">
                      {phase.stages.map((stage, stageIndex) => (
                        <Card
                          key={stageIndex}
                          className="p-4 rounded-2xl border bg-card"
                        >
                          <CardContent className="p-0 space-y-4">
                            <div className="flex items-center gap-2">
                              <GanttChartSquare className="h-5 w-5 text-muted-foreground cursor-grab" />
                              <Input
                                value={stage.name}
                                onChange={(e) =>
                                  handleInputChange(e.target.value, "stage", {
                                    phase: phaseIndex,
                                    stage: stageIndex,
                                  })
                                }
                                className="font-medium text-lg bg-transparent border-0 shadow-none focus-visible:ring-0 p-0"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  removeStage(phaseIndex, stageIndex)
                                }
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="pl-6 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stage.tasks.map((task, taskIndex) => (
                                  <div
                                    key={taskIndex}
                                    className="grid grid-cols-[1fr_auto] items-center gap-2"
                                  >
                                    <Input
                                      placeholder="Task Name"
                                      value={task.name}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e.target.value,
                                          "task",
                                          {
                                            phase: phaseIndex,
                                            stage: stageIndex,
                                            task: taskIndex,
                                          },
                                        )
                                      }
                                      className="h-12 bg-background dark:bg-input rounded-full px-5"
                                    />
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        removeTask(
                                          phaseIndex,
                                          stageIndex,
                                          taskIndex,
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                className="rounded-full"
                                onClick={() => addTask(phaseIndex, stageIndex)}
                              >
                                <Plus className="mr-2 h-4 w-4" /> Add Task
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => addStage(phaseIndex)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Stage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={addPhase}
                className="w-full mt-4 h-14 rounded-full text-lg"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Phase
              </Button>
            </div>
          </ScrollArea>
          <div className="px-6 py-4 border-t flex flex-col gap-4 shrink-0 bg-card rounded-b-[20px] mt-auto">
            <Button
              onClick={handleSave}
              className="h-[54px] rounded-full text-lg w-full"
            >
              Save Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface CreateProjectSheetProps {
  trigger?: React.ReactNode;
  onProjectAdded: (project: Project) => void;
  onProjectUpdated: (project: Project) => void;
  projectToEdit: Project | null;
  onOpenChange: (isOpen: boolean) => void;
}

export function CreateProjectSheet({
  trigger,
  onProjectAdded,
  projectToEdit,
  onProjectUpdated,
  onOpenChange,
}: CreateProjectSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState<any>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  const isEditMode = !!projectToEdit;

  useEffect(() => {
    if (projectToEdit) {
      setIsOpen(true);
      setProjectData(projectToEdit);
    }
  }, [projectToEdit]);

  const handleOpenChangeInternal = (open: boolean) => {
    if (!open) {
      setStep(1);
      setProjectData(null);
      onOpenChange(false);
    }
    setIsOpen(open);
  };

  const handleSuccess = (newOrUpdatedProject: Project, responseData: any) => {
    setIsOpen(false);
    setSuccessData(responseData);
    setShowSuccess(true);
    if (isEditMode) {
      onProjectUpdated(newOrUpdatedProject);
    } else {
      onProjectAdded(newOrUpdatedProject);
    }
    setTimeout(() => {
      setStep(1);
      setProjectData(null);
    }, 500); // Reset step after closing
  };

  const handleNext = (data: any) => {
    setProjectData(data);
    setStep(2);
  };
  const handleBack = () => setStep(1);

  const title = isEditMode
    ? "Edit Project"
    : step === 1
      ? "Create New Project"
      : "Project Timeline";

  const DefaultTrigger = (
    <Button className="bg-primary/10 text-primary dark:text-primary dark:bg-primary/10 border border-primary md:h-14 rounded-full h-[54px] hover:bg-primary/20 text-lg px-6 w-[54px] md:w-auto p-0 md:p-2.5">
      <PlusCircle className="h-5 w-5 md:mr-2" />
      <span className="hidden md:inline">Create project</span>
    </Button>
  );

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleOpenChangeInternal}>
        {!isEditMode && trigger && (
          <SheetTrigger asChild>{trigger}</SheetTrigger>
        )}
        {!isEditMode && !trigger && (
          <SheetTrigger asChild>{DefaultTrigger}</SheetTrigger>
        )}
        <SheetContent
          side="bottom"
          className={cn(
            "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-3xl md:mx-auto rounded-t-[50px] border-none",
          )}
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (
              target.closest("[data-radix-popper-content-wrapper]") ||
              target.closest("[role='dialog']")
            ) {
              e.preventDefault();
            }
          }}
        >
          <SheetHeader className="p-6 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-2xl font-semibold">
                {title}
              </SheetTitle>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[54px] h-[54px] bg-background dark:bg-input rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="flex-1 flex flex-col overflow-hidden">
            {step === 1 ? (
              <CreateProjectForm
                onNext={handleNext}
                projectToEdit={projectToEdit}
                projectData={projectData}
              />
            ) : (
              <ProjectTimelineForm
                onFormSuccess={handleSuccess}
                onBack={handleBack}
                isEditMode={isEditMode}
                projectData={projectData}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={isEditMode ? "Project Updated" : "New Project added"}
        message={
          isEditMode
            ? "The project details have been successfully updated."
            : "Congratulations! You have successfully added a new project."
        }
        responseData={successData}
      />
    </>
  );
}
