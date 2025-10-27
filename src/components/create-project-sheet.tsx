
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  X,
  ArrowRight,
  Check,
  ChevronsUpDown,
  ShieldAlert,
  Calendar as CalendarIcon,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { SuccessPopup } from "./success-popup";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Project } from "@/lib/data";
import { ScrollArea } from "./ui/scroll-area";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

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

const ProjectTimelineForm = ({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: () => void;
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [stages, setStages] = useState([
    { title: "Design Presentation", duration: "2 Days" },
    { title: "Excavation", duration: "5 Days" },
  ]);
  const [newStageTitle, setNewStageTitle] = useState("");
  const [newStageDuration, setNewStageDuration] = useState("");

  const handleAddStage = () => {
    if (newStageTitle && newStageDuration) {
      setStages([...stages, { title: newStageTitle, duration: newStageDuration }]);
      setNewStageTitle("");
      setNewStageDuration("");
    }
  };

  const handleRemoveStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index));
  };


  return (
    <div className="flex flex-col h-full">
       <ScrollArea className="flex-1 p-6 no-scrollbar">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-medium px-2 text-foreground">
            Project Start Date*
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-14 bg-background rounded-full px-5",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  startDate.toLocaleDateString()
                ) : (
                  <span>Pick a date</span>
                )}
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Add Stages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 items-end">
            <FloatingLabelInput
              id="new-stage-title"
              label="Stage Title"
              value={newStageTitle}
              onChange={(e) => setNewStageTitle(e.target.value)}
              placeholder="e.g., Foundation Work"
            />
            <FloatingLabelInput
              id="new-stage-duration"
              label="Duration"
              value={newStageDuration}
              onChange={(e) => setNewStageDuration(e.target.value)}
              placeholder="e.g., 10 Days"
            />
            <Button onClick={handleAddStage} className="h-14 rounded-full" type="button">Add</Button>
          </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-lg font-medium text-foreground">Timeline Stages</h3>
          {stages.map((stage, index) => (
            <div key={index} className="flex items-center justify-between bg-background p-4 rounded-full">
              <span className="font-medium">{stage.title}</span>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">{stage.duration}</span>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveStage(index)} className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4"/>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </ScrollArea>
      <div className="p-6 mt-auto border-t md:border-0 flex justify-between gap-4 shrink-0">
         <Button
          type="button"
          variant="outline"
          className="h-14 rounded-full px-10 text-lg"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          className="h-14 rounded-full px-10 text-lg"
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};


const CreateProjectForm = ({
  onNext,
  projectToEdit,
}: {
  onNext: (data: any) => void;
  projectToEdit: Project | null;
}) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [leadEmails, setLeadEmails] = useState<string[]>([]);
  const allUsers = mockUsers;
  const [leadEmailError, setLeadEmailError] = useState<string | null>(null);
  const [emailComboboxOpen, setEmailComboboxOpen] = useState(false);
  const [projectTypeComboboxOpen, setProjectTypeComboboxOpen] =
    useState(false);
  const [floorComboboxOpen, setFloorComboboxOpen] = useState(false);
  const [architectComboboxOpen, setArchitectComboboxOpen] = useState(false);
  const [supervisorComboboxOpen, setSupervisorComboboxOpen] = useState(false);

  const [name, setName] = useState(
    projectToEdit?.personalDetails?.name || "",
  );
  const [phone, setPhone] = useState(
    projectToEdit?.personalDetails?.phoneNumber || "",
  );
  const [email, setEmail] = useState(
    projectToEdit?.personalDetails?.email || "",
  );
  const [currentAddress, setCurrentAddress] = useState(
    projectToEdit?.personalDetails?.currentAddress || "",
  );

  const [projectName, setProjectName] = useState(
    projectToEdit?.projectDetails?.projectName ||
      projectToEdit?.name ||
      `Nathvilla ${Math.floor(Math.random() * 100)}`,
  );
  const [projectType, setProjectType] = useState(
    projectToEdit?.projectType ||
      projectToEdit?.projectDetails?.projectType ||
      "New Construction",
  );
  const [projectCost, setProjectCost] = useState(
    projectToEdit?.projectDetails?.projectCost ||
      "50,00,000",
  );
  const [dimension, setDimension] = useState(
    projectToEdit?.projectDetails?.dimension ||
      "2000 sq.ft",
  );
  const [floor, setFloor] = useState(
    projectToEdit?.projectDetails?.floor ||
      "G+2",
  );
  const [siteLocation, setSiteLocation] = useState(
    projectToEdit?.projectDetails?.siteLocation ||
      "Bandra West",
  );
  const [siteLocationLink, setSiteLocationLink] = useState(
    projectToEdit?.projectDetails?.siteLink ||
      "https://maps.google.com/site-link",
  );
  const [architect, setArchitect] = useState(
    projectToEdit?.projectAssign?.architect ||
      "",
  );
  const [siteSupervisor, setSiteSupervisor] = useState(
    projectToEdit?.projectAssign?.siteSupervisor ||
      "",
  );
  
  useEffect(() => {
    const fetchLeadEmails = async () => {
      if (!user) return;
      setLeadEmailError(null);
      try {
        const res = await fetch(`/api/leads/emails`, {
          method: 'GET',
          headers: { 
            'x-user': JSON.stringify(user) 
          },
        });
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
           const emails = result.data.map((item) => item.inviteeEmail);
          setLeadEmails(emails);
        } else {
          setLeadEmailError(result.message || "Failed to load lead emails.");
        }
      } catch (error) {
        console.error("Failed to fetch lead emails:", error);
        setLeadEmailError("An unexpected error occurred while fetching emails.");
      }
    };
    if (!projectToEdit) { // Only fetch if not in edit mode
      fetchLeadEmails();
    }
  }, [user, projectToEdit]);
  
  useEffect(() => {
    if(projectToEdit) {
      setName(projectToEdit.personalDetails?.name || projectToEdit.name);
      setPhone(projectToEdit.personalDetails?.phoneNumber || '');
      setEmail(projectToEdit.personalDetails?.email || projectToEdit.contact.split(' | ')[0] || '');
      setCurrentAddress(projectToEdit.personalDetails?.currentAddress || '');
      setProjectName(projectToEdit.projectDetails?.projectName || projectToEdit.name);
      setProjectType(projectToEdit.projectDetails?.projectType || projectToEdit.projectType);
      setProjectCost(projectToEdit.projectDetails?.projectCost || '');
      setDimension(projectToEdit.projectDetails?.dimension || '');
      setFloor(projectToEdit.projectDetails?.floor || '');
      setSiteLocation(projectToEdit.projectDetails?.siteLocation || '');
      setSiteLocationLink(projectToEdit.projectDetails?.siteLink || '');
      setArchitect(projectToEdit.projectAssign?.architect || '');
      setSiteSupervisor(projectToEdit.projectAssign?.siteSupervisor || '');
    }
  }, [projectToEdit]);

  const handleContactSelect = async (selectedEmail: string) => {
    setEmail(selectedEmail);
    setEmailComboboxOpen(false);

    if (!user) return;
    try {
      const res = await fetch(`/api/leads/info`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user': JSON.stringify(user) 
        },
        body: JSON.stringify({ email: selectedEmail })
      });
      const result = await res.json();
      if (result.success && result.data) {
        const leadDetails = result.data;
        setName(leadDetails.inviteeName || '');
        setPhone(leadDetails.inviteeMobileNumber || '');
        setCurrentAddress(leadDetails.siteLocationAddress || `Pincode: ${leadDetails.siteLocationPinCode || 'N/A'}`);
        setSiteLocation(leadDetails.siteLocationAddress || '');
      } else {
         toast({
          variant: "destructive",
          title: "Error",
          description: result.message || 'Could not fetch lead details.'
        });
      }
    } catch (error) {
      console.error("Failed to fetch lead details:", error);
      toast({
          variant: "destructive",
          title: "Error",
          description: 'An unexpected error occurred while fetching lead details.'
        });
    }
  };


  const architects = useMemo(
    () => allUsers.filter((u) => u.team === "Architect"),
    [allUsers],
  );
  const siteSupervisors = useMemo(
    () => allUsers.filter((u) => u.team === "Site Supervisor"),
    [allUsers],
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
        siteAddress: siteLocation,
        siteLink: siteLocationLink,
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
              {!projectToEdit && (
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
                   <p className="text-sm text-muted-foreground px-2">
                     Select a lead by email to automatically fill their details.
                   </p>
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
                           {email || "select the lead email"}
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
                         <CommandInput placeholder="Search by email..." />
                         <CommandList>
                           <CommandEmpty>
                             {leadEmailError ? (
                               <span className="text-destructive">{leadEmailError}</span>
                             ) : (
                               "No results found."
                             )}
                           </CommandEmpty>
                           <CommandGroup>
                             {leadEmails.map((leadEmail) => (
                               <CommandItem
                                 key={leadEmail}
                                 value={leadEmail}
                                 onSelect={() => handleContactSelect(leadEmail)}
                               >
                                 <Check
                                   className={cn(
                                     "mr-2 h-4 w-4",
                                     email === leadEmail
                                       ? "opacity-100"
                                       : "opacity-0",
                                   )}
                                 />
                                 <span className="font-medium">
                                   {leadEmail}
                                 </span>
                               </CommandItem>
                             ))}
                           </CommandGroup>
                         </CommandList>
                       </Command>
                     </PopoverContent>
                   </Popover>
                 </div>
               </div>
              )}
             
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
               {projectToEdit && (
                 <FloatingLabelInput
                 id="email-input"
                 name="email"
                 label="Email ID*"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
               )}

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

interface CreateProjectSheetProps {
  onProjectAdded?: (project: Project, responseData: any) => void;
  onProjectUpdated?: (project: Project) => void;
  projectToEdit: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectSheet({
  onProjectAdded,
  projectToEdit,
  onProjectUpdated,
  open,
  onOpenChange,
}: CreateProjectSheetProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState<any>(null);

  const isEditMode = !!projectToEdit;

  const handleNext = (data: any) => {
    setProjectData(data);
    setStep(2);
  };
  
  const handleBack = () => {
    setStep(1);
  }

  const handleSaveTimeline = async () => {
    onOpenChange(false); // Close the sheet

    // In a real app, you would combine timeline data with projectData and save
    const finalPayload = {
      ...projectData,
      // ...timelineData,
    };
    console.log("Final project data with timeline:", finalPayload);

    setTimeout(() => {
      setShowSuccess(true);
      if (isEditMode && onProjectUpdated) {
        onProjectUpdated({ ...projectToEdit, ...projectData } as Project);
      } else if(onProjectAdded){
        onProjectAdded(projectData as Project, { message: "New Project added" });
      }
      setSuccessData({
        message: isEditMode ? "Project Updated" : "New Project added",
      });
    }, 500);
  };
  
  const title = isEditMode
    ? "Edit Project"
    : step === 1
      ? "Create New Project"
      : "Project Timeline";

  // Reset step when sheet is closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setProjectData(null);
      }, 300);
    }
  }, [open]);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
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
                  onClick={() => onOpenChange(false)}
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
              />
            ) : (
               <ProjectTimelineForm onBack={handleBack} onSave={handleSaveTimeline} />
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

