
"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
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
  GripVertical,
  Calendar as CalendarIcon,
  ShieldAlert,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
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
import { getLeadByEmail } from "@/app/actions";
import { useRouter, useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";
import { useUser } from "@/context/user-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  {
    id: "CHA2024",
    name: "Charan Project",
    city: "Mysuru",
    address: "123, Mysore Palace Road, Mysore, Karnataka 570001",
    email: "admin@abc.com",
    phone: "+91 1234567890",
    type: "client" as const,
  },
  {
    id: "DEL2024",
    name: "Delta Project",
    city: "Bengaluru",
    address: "456, MG Road, Bengaluru, Karnataka 560001",
    email: "contact@delta.com",
    phone: "+91 9876543210",
    type: "client" as const,
  },
  {
    id: "GAM2024",
    name: "Gamma Project",
    city: "Chennai",
    address: "789, T Nagar, Chennai, Tamil Nadu 600017",
    email: "support@gamma.co",
    phone: "+91 8765432109",
    type: "client" as const,
  },
];
const mockLeads = [
  {
    id: "LEAD2024",
    name: "Alpha Lead",
    city: "Hyderabad",
    address: "101, Hitech City, Hyderabad, Telangana 500081",
    email: "sales@alpha.io",
    phone: "+91 7654321098",
    type: "lead" as const,
  },
  {
    id: "LEAD2024-2",
    name: "Beta Lead",
    city: "Mumbai",
    address: "202, Bandra West, Mumbai, Maharashtra 400050",
    email: "info@betaleads.com",
    phone: "+91 6543210987",
    type: "lead" as const,
  },
];
const allContacts = [...mockClients, ...mockLeads];
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

const FloatingLabelSelect = ({
  id,
  label,
  value,
  onValueChange,
  children,
  name,
}: {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  name?: string;
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
    <Select name={name || id} value={value} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        className="h-14 bg-background dark:bg-input rounded-full px-5 cursor-pointer"
      >
        <SelectValue placeholder={label.replace("*", "")} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  </div>
);

const CreateProjectForm = ({
  onNext,
  projectToEdit,
  projectData,
  onProjectAdded,
  onProjectUpdated,
}: {
  onNext: (data: any) => void;
  projectToEdit: Project | null;
  projectData: any;
  onProjectAdded: (project: Project, responseData: any) => void;
  onProjectUpdated: (project: Project, responseData: any) => void;
}) => {
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string>("");
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
      "Commercial",
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
      "2",
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

  const handleContactSelect = (contactId: string) => {
    const contact = allContacts.find((c) => c.id === contactId);
    if (contact) {
      setSelectedContact(contactId);
      setEmail(contact.email);
      setName(contact.name);
      setPhone(contact.phone);
      setCurrentAddress(contact.address);
    }
    setComboboxOpen(false);
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
      },
      projectAssign: {
        architect: architect,
        siteSupervisor: siteSupervisor,
      },
    };
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6 no-scrollbar">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg text-muted-foreground">Personal details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                  <PopoverTrigger asChild>
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
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={comboboxOpen}
                        className="w-full justify-between h-14 bg-background rounded-full px-5"
                      >
                        <span className="truncate">
                          {selectedContact
                            ? allContacts.find(
                                (c) => c.id === selectedContact,
                              )?.email
                            : "Select client or lead..."}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Search by email..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {allContacts.map((contact) => (
                            <CommandItem
                              key={contact.id}
                              value={contact.id}
                              onSelect={() => {
                                handleContactSelect(contact.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedContact === contact.id
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {contact.email}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <FloatingLabelSelect
                  id="project-type"
                  name="project_type"
                  label="Project Type*"
                  value={projectType}
                  onValueChange={setProjectType}
                >
                  <SelectItem value="New Construction">
                    New Construction
                  </SelectItem>
                  <SelectItem value="Renovation">Renovation</SelectItem>
                  <SelectItem value="Interior Design">
                    Interior Design
                  </SelectItem>
                </FloatingLabelSelect>
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
                onChange={handleNumberOnlyChange(setDimension)}
              />
              <FloatingLabelSelect
                id="floor"
                label="Floor*"
                value={floor}
                onValueChange={setFloor}
              >
                {Array.from({ length: 8 }, (_, i) => `G+${i + 1}`).map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </FloatingLabelSelect>
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
              <FloatingLabelInput
                id="architect"
                name="architect"
                label="Architect*"
                value={architect}
                onChange={(e) => setArchitect(e.target.value)}
                placeholder="Enter architect's name"
              />
              <FloatingLabelInput
                id="site-supervisor"
                name="siteSupervisor"
                label="Site Supervisor*"
                value={siteSupervisor}
                onChange={(e) => setSiteSupervisor(e.target.value)}
                placeholder="Enter supervisor's name"
              />
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

  const [startDate, setStartDate] = useState<string>(
    projectData?.startDate
      ? new Date(projectData.startDate).toISOString().split("T")[0]
      : "",
  );
  const [isPending, startTransition] = useTransition();
  const [isCustomTimelineDialogOpen, setIsCustomTimelineDialogOpen] =
    useState(false);
  const [timeline, setTimeline] = useState<Phase[]>(projectData?.phases || []);
  const [templates, setTemplates] = useState<TimelineTemplate[]>([]);

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
      startDate: new Date(startDate).toISOString(),
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
        result = await response.json();

        if (result.success || response.ok) {
          onFormSuccess(result.data, result);
          router.refresh();
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              result.message ||
              `Failed to ${isEditMode ? "update" : "create"} project.`,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
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
                <FloatingLabelInput
                  id="start-date"
                  name="startDate"
                  label="Start Date*"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-14 rounded-full px-4 w-full"
                    >
                      Template
                      <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {templates.map((template) => (
                      <DropdownMenuItem
                        key={template.id}
                        onSelect={() => handleTemplateSelect(template.id)}
                      >
                        {template.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
  const isMobile = useIsMobile();
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

  const DialogComponent = Dialog;
  const DialogContentComponent = DialogContent;

  return (
    <DialogComponent open={isOpen} onOpenChange={onClose}>
      <DialogContentComponent
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
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
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
                              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
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

  const DialogOrSheet = Sheet;
  const DialogOrSheetContent = SheetContent;
  const DialogOrSheetHeader = SheetHeader;
  const DialogOrSheetTitle = SheetTitle;
  const DialogOrSheetClose = SheetClose;
  const DialogOrSheetTrigger = SheetTrigger;

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
      <DialogOrSheet open={isOpen} onOpenChange={handleOpenChangeInternal}>
        {!isEditMode && trigger && (
          <DialogOrSheetTrigger asChild>{trigger}</DialogOrSheetTrigger>
        )}
        {!isEditMode && !trigger && (
          <DialogOrSheetTrigger asChild>{DefaultTrigger}</DialogOrSheetTrigger>
        )}
        <DialogOrSheetContent
          side="bottom"
          className={cn(
            "p-0 m-0 flex flex-col bg-card text-card-foreground transition-all h-full md:h-[90vh] md:max-w-3xl md:mx-auto rounded-t-[50px] border-none",
          )}
        >
          <DialogOrSheetHeader className="p-6 border-b">
            <div className="flex justify-between items-center">
              <DialogOrSheetTitle className="text-2xl font-semibold">
                {title}
              </DialogOrSheetTitle>
              <DialogOrSheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[54px] h-[54px] bg-background dark:bg-input rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </DialogOrSheetClose>
            </div>
          </DialogOrSheetHeader>
          <div className="flex-1 flex flex-col overflow-hidden">
            {step === 1 ? (
              <CreateProjectForm
                onNext={handleNext}
                projectToEdit={projectToEdit}
                projectData={projectData}
                onProjectAdded={handleSuccess}
                onProjectUpdated={handleSuccess}
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
        </DialogOrSheetContent>
      </DialogOrSheet>
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
              Error Creating Project
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
