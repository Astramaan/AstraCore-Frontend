
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Search, Plus, Phone, ChevronDown, Trash2, ShieldAlert, RefreshCw, X, Edit } from 'lucide-react';
import { AddLeadSheet } from '@/components/add-lead-sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { LeadDetailsSheet, type Lead } from '@/components/lead-details-sheet';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const LeadCard = ({ lead, organizationId, onSelectionChange, isSelected, onSingleDelete, onContact, onViewDetails, onLevelChange, onEdit, isFirst, isLast }: { lead: Lead, organizationId: string, onSelectionChange: (id: string, checked: boolean) => void, isSelected: boolean, onSingleDelete: (id: string) => void, onContact: (lead: Lead) => void, onViewDetails: (lead: Lead) => void, onLevelChange: (leadId: string, level: string) => void, onEdit: (lead: Lead) => void, isFirst?: boolean, isLast?: boolean }) => (
    <div className="flex flex-col group">
        {/* Desktop View */}
         <div className="hidden lg:block py-6 px-10 hover:bg-hover-bg dark:hover:bg-muted/50 cursor-pointer" onClick={() => onViewDetails(lead)}>
            <div className="grid lg:grid-cols-[1.2fr_1.5fr_1fr] items-stretch">
                {/* Col 1: Name + Location */}
                <div
                    className="flex items-center gap-4"
                >
                    <Checkbox
                        id={`select-${lead.leadId}-desktop`}
                        className="w-6 h-6 rounded-full"
                        checked={isSelected}
                        onCheckedChange={(checked) => onSelectionChange(lead.leadId, !!checked)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div onClick={(e) => e.stopPropagation()} className="flex-1">
                        <div>
                        <p className="text-xl font-semibold text-foreground">{lead.fullName}</p>
                        <p className="text-lg">
                            <span className="text-muted-foreground">Pincode: </span> 
                            <span className="text-foreground">
                            {lead.pincode}
                            </span>
                        </p>
                        </div>
                    </div>
                </div>

                {/* Col 2: Contact + ID */}
                <div className="flex flex-col justify-center gap-2 border-l border-border px-6">
                    <p className="text-lg break-words">
                        <span className="text-muted-foreground">Contact: </span> 
                        <span className="text-foreground">{lead.contact}</span>
                    </p>
                    <p className="text-lg">
                        <span className="text-muted-foreground">Lead ID: </span> 
                        <span className="text-foreground">{lead.leadId}</span>
                    </p>
                </div>

                {/* Col 3: Actions */}
                <div
                    className="flex items-center justify-between border-l border-border px-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="h-12 lg:h-14 px-6 rounded-full text-foreground text-base lg:text-lg font-medium w-full lg:w-auto justify-between hover:bg-primary/10 hover:text-primary"
                        >
                            {lead.level}
                            <ChevronDown className="ml-2" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onLevelChange(lead.leadId, "Level 1")}>
                            Level 1
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onLevelChange(lead.leadId, "Level 2")}>
                            Level 2
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onLevelChange(lead.leadId, "Level 3")}>
                            Level 3
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => onContact(lead)}
                        variant="outline"
                        className="h-12 lg:h-14 px-4 rounded-full text-foreground text-base lg:text-lg font-medium hover:bg-primary/10 hover:text-primary"
                    >
                        <Phone className="mr-2 h-4 w-4" />
                        Contact
                    </Button>
                    </div>
                    <div
                    className="ml-auto self-center"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onViewDetails(lead)}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onEdit(lead)}>Edit</DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                            className="text-red-600"
                            onSelect={(e) => {
                                e.preventDefault();
                                onSingleDelete(lead.leadId);
                            }}
                            >
                            Delete
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Mobile View */}
        <div className="block lg:hidden p-6 md:p-10" onClick={() => onViewDetails(lead)}>
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-4">
                     <Checkbox 
                        id={`select-${lead.leadId}-mobile`} 
                        className="w-6 h-6 rounded-full" 
                        checked={isSelected}
                        onCheckedChange={(checked) => onSelectionChange(lead.leadId, !!checked)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div>
                        <p className="text-xl font-semibold text-foreground">{lead.fullName}</p>
                    </div>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => onViewDetails(lead)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => onEdit(lead)}>Edit</DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-600" onSelect={(e) => { e.preventDefault(); onSingleDelete(lead.leadId); }}>Delete</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mt-4 ml-0 space-y-2 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <p className="text-base break-words"><span className="text-muted-foreground">Contact: </span><span className="text-foreground">{lead.contact}</span></p>
                </div>
                <div>
                     <p className="text-base"><span className="text-muted-foreground">Pincode: </span><span className="text-foreground">{lead.pincode}</span></p>
                </div>
                <div>
                     <p className="text-base"><span className="text-muted-foreground">Lead ID: </span><span className="text-foreground">{lead.leadId}</span></p>
                </div>
                <div className="col-span-2 flex flex-col sm:flex-row items-center gap-4 pt-2 w-full">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                             <Button variant="outline" className="w-full h-12 px-6 rounded-full text-foreground text-base font-medium justify-between hover:bg-primary/10 hover:text-primary" onClick={(e) => e.stopPropagation()}>
                                {lead.level}
                                <ChevronDown className="ml-2"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onSelect={() => onLevelChange(lead.leadId, 'Level 1')}>Level 1</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onLevelChange(lead.leadId, 'Level 2')}>Level 2</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onLevelChange(lead.leadId, 'Level 3')}>Level 3</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={(e) => {e.stopPropagation(); onContact(lead);}} variant="outline" className="w-full h-12 px-4 rounded-full text-foreground text-base font-medium hover:bg-primary/10 hover:text-primary">
                        <Phone className="mr-2 h-4 w-4"/>
                        Contact
                    </Button>
                </div>
            </div>
        </div>
        {!isLast && (
          <div className="px-10">
            <Separator />
          </div>
        )}
    </div>
);

const LeadCardSkeleton = () => (
    <div className="flex flex-col">
        <div className="hidden lg:block py-6 px-10">
            <div className="grid lg:grid-cols-[1.2fr_1.5fr_1fr] items-center gap-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                </div>
                <div className="space-y-2 border-l border-gray-200 px-6">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-28" />
                </div>
                <div className="flex items-center justify-between border-l border-gray-200 px-6">
                    <Skeleton className="h-14 w-32 rounded-full" />
                    <Skeleton className="h-14 w-36 rounded-full" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </div>
        </div>
        <div className="block lg:hidden p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-8 w-8" />
            </div>
            <div className="mt-4 space-y-4">
                <Skeleton className="h-5 w-full" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </div>
                <div className="flex gap-4 pt-2">
                    <Skeleton className="h-12 w-full rounded-full" />
                    <Skeleton className="h-12 w-full rounded-full" />
                </div>
            </div>
        </div>
        <div className="px-10">
            <Separator />
        </div>
    </div>
);


const FloatingActionBar = ({ selectedCount, onSelectAll, allSelected, onDeleteMultiple, onBulkLevelChange }: { selectedCount: number, onSelectAll: (checked: boolean) => void, allSelected: boolean, onDeleteMultiple: () => void, onBulkLevelChange: (level: string) => void }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-[828px] h-20 bg-card rounded-[50px] shadow-[-5px_-5px_25px_0px_rgba(17,17,17,0.25)] flex items-center justify-between px-4 md:px-6 z-50">
            <div className="hidden md:flex items-center gap-4">
                <Checkbox id="select-all-floating" className="w-6 h-6 rounded-full" checked={allSelected} onCheckedChange={(checked) => onSelectAll(!!checked)} />
                <label htmlFor="select-all-floating" className="text-lg font-medium">{allSelected ? 'Deselect all' : 'Select all'}</label>
            </div>
            <p className="text-sm md:text-lg font-medium">{selectedCount} Selected</p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-14 px-4 md:px-6 rounded-full text-muted-foreground text-sm md:text-lg font-medium md:w-48 justify-between hover:bg-primary/10 hover:text-primary">
                        Lead Level
                        <ChevronDown className="ml-2"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => onBulkLevelChange('Level 1')}>Level 1</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onBulkLevelChange('Level 2')}>Level 2</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onBulkLevelChange('Level 3')}>Level 3</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
             <AlertDialogTrigger asChild>
                <Button variant="destructive" className="h-14 px-4 md:px-10 rounded-[50px] bg-background hover:bg-destructive/10 text-red-600 text-sm md:text-lg font-medium" onClick={onDeleteMultiple}>
                    <Trash2 className="md:mr-2" />
                    <span className="hidden md:inline">Delete</span>
                </Button>
            </AlertDialogTrigger>
        </div>
    )
}


export default function LeadsPage() {
    const params = useParams();
    const { toast } = useToast();
    const organizationId = params.organizationId as string;
    const [allLeads, setAllLeads] = useState<Lead[]>([]);
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
    const [leadToDelete, setLeadToDelete] = useState<string[]>([]);
    const [contactedLead, setContactedLead] = useState<Lead | null>(null);
    const [isUpdateLevelDialogOpen, setIsUpdateLevelDialogOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLeadDetails, setSelectedLeadDetails] = useState<Lead | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchLeads = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/leads');
            const result = await res.json();

            if (result.success) {
                const formattedLeads = result.data.map((lead: any) => ({
                    organization: lead.organizationName || "Organization Name",
                    leadId: lead.leadDisplayId,
                    fullName: lead.fullName,
                    contact: `${lead.email} | ${lead.phoneNumber}`,
                    phone: lead.phoneNumber,
                    email: lead.email,
                    address: lead.siteAddress || "Address missing",
                    pincode: lead.siteAddressPinCode || lead.siteLocationPinCode || "Pincode missing",
                    tokenAmount: lead.tokenAmount || "Token missing",
                    level: lead.level || "Level 1",
                    profileImage: "https://placehold.co/94x94.png",
                    coverImage: "https://placehold.co/712x144.png",
                    siteImages: [],
                }));
                setAllLeads(formattedLeads);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching leads',
                    description: result.message,
                });
            }
        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Network Error',
                description: 'Failed to connect to the server.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchLeads();
    }, [toast]);


    const filteredLeads = useMemo(() => {
        let leads = [...allLeads].sort((a, b) => {
            if (a.level === 'Level 3' && b.level !== 'Level 3') return -1;
            if (a.level !== 'Level 3' && b.level === 'Level 3') return 1;
            return 0;
        });
        if (!searchTerm) return leads;
        return leads.filter(lead =>
            lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.leadId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allLeads, searchTerm]);

    const handleSelectionChange = (id: string, checked: boolean) => {
        setSelectedLeads(prev => 
            checked ? [...prev, id] : prev.filter(leadId => leadId !== id)
        );
    };

    const allLeadsSelected = useMemo(() => selectedLeads.length === filteredLeads.length && filteredLeads.length > 0, [selectedLeads.length, filteredLeads.length]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedLeads(filteredLeads.map(lead => lead.leadId));
        } else {
            setSelectedLeads([]);
        }
    };
    
    const handleDelete = () => {
        setAllLeads(prev => prev.filter(lead => !leadToDelete.includes(lead.leadId)));
        setSelectedLeads(prev => prev.filter(id => !leadToDelete.includes(id)));
        setLeadToDelete([]);
        setIsDeleteConfirmationOpen(false);
        if (selectedLeadDetails && leadToDelete.includes(selectedLeadDetails.leadId)) {
            setSelectedLeadDetails(null);
        }
    }

    const handleSingleDelete = (id: string) => {
        setLeadToDelete([id]);
        setIsDeleteConfirmationOpen(true);
    }
    
    const handleDeleteMultiple = () => {
        setLeadToDelete(selectedLeads);
        setIsDeleteConfirmationOpen(true);
    }

    const handleContact = (lead: Lead) => {
        setContactedLead(lead);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsUpdateLevelDialogOpen(true);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        const link = document.createElement('a');
        link.href = `tel:${lead.phone}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLevelChange = (leadId: string, level: string) => {
        setAllLeads(prevLeads =>
            prevLeads.map(lead =>
                lead.leadId === leadId ? { ...lead, level } : lead
            )
        );
    };

    const handleBulkLevelChange = (level: string) => {
        setAllLeads(prevLeads =>
            prevLeads.map(lead =>
                selectedLeads.includes(lead.leadId) ? { ...lead, level } : lead
            )
        );
    };

    const handleViewDetails = (lead: Lead) => {
        setSelectedLeadDetails(lead);
        setIsEditing(false);
    }

    const handleEdit = (lead: Lead) => {
        setSelectedLeadDetails(lead);
        setIsEditing(true);
    }

    const onDeleteFromDetails = (id: string) => {
        setLeadToDelete([id]);
        setIsDeleteConfirmationOpen(true);
        setSelectedLeadDetails(null);
    };

    const onLeadAdded = (newLead: Lead) => {
        setAllLeads(prev => [newLead, ...prev]);
        fetchLeads();
    }


    return (
        <div className="space-y-8 pb-28">
             <div className="flex flex-col gap-4">
                <div className="flex md:hidden flex-col gap-4">
                    <h2 className="text-xl text-foreground font-medium">Leads</h2>
                    <div className="flex items-center gap-4 w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder="Search Lead" 
                                className="pl-12 h-14 rounded-full bg-card text-lg text-left w-full" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <AddLeadSheet onLeadAdded={onLeadAdded} />
                    </div>
                </div>
                 <div className="hidden md:flex justify-between items-center">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search Lead" 
                            className="pl-12 h-14 rounded-full bg-card text-lg text-left" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <AddLeadSheet onLeadAdded={onLeadAdded} />
                </div>
            </div>

             <AlertDialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
                <div className="flex flex-col bg-card rounded-[30px] overflow-hidden">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => <LeadCardSkeleton key={i} />)
                    ) : filteredLeads.length > 0 ? (
                        filteredLeads.map((lead, index) => (
                            <LeadCard 
                                key={`${lead.leadId}-${index}`} 
                                lead={lead} 
                                organizationId={organizationId}
                                onSelectionChange={handleSelectionChange}
                                isSelected={selectedLeads.includes(lead.leadId)}
                                onSingleDelete={handleSingleDelete}
                                onContact={handleContact}
                                onViewDetails={handleViewDetails}
                                onLevelChange={handleLevelChange}
                                onEdit={handleEdit}
                                isFirst={index === 0}
                                isLast={index === filteredLeads.length - 1}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No leads found.</p>
                            <p>Get started by adding a new lead!</p>
                        </div>
                    )}
                </div>
                <AlertDialogContent className="max-w-md rounded-[50px]">
                    <AlertDialogHeader className="items-center text-center">
                         <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                          <div className="w-full h-full bg-red-600/5 rounded-full" />
                          <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                          <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                        </div>
                        <AlertDialogTitle className="text-2xl font-semibold">
                            {leadToDelete.length > 1 ? "Delete Selected Leads?" : "Confirm Lead Deletion?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-lg text-muted-foreground">
                            {leadToDelete.length > 1 
                                ? "The selected leads and all associated data will be permanently removed from AstraCore." 
                                : "Deleting this lead will permanently remove all associated data from AstraCore. This action cannot be undone."
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-foreground border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="w-40 h-14 px-10 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <Dialog open={isUpdateLevelDialogOpen} onOpenChange={setIsUpdateLevelDialogOpen}>
                <DialogContent className="sm:max-w-sm rounded-3xl p-8">
                    <DialogHeader>
                      <DialogTitle className="sr-only">Update Lead Level</DialogTitle>
                    </DialogHeader>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full">
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>
                    <div className="text-center flex flex-col items-center">
                        <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <RefreshCw className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <DialogTitle className="text-lg font-semibold">Update the leads level</DialogTitle>
                        <p className="text-base text-foreground">{contactedLead?.fullName}, {contactedLead?.phone}</p>
                        <p className="text-sm text-muted-foreground mt-2">For the better leads management</p>
                    </div>
                </DialogContent>
            </Dialog>
            
            <LeadDetailsSheet 
                isOpen={!!selectedLeadDetails}
                onClose={() => setSelectedLeadDetails(null)}
                lead={selectedLeadDetails}
                onDelete={(e) => {
                    e.preventDefault();
                    if(selectedLeadDetails) {
                      onDeleteFromDetails(selectedLeadDetails.leadId)
                    }
                  }}
                startInEditMode={isEditing}
            />

                <FloatingActionBar 
                    selectedCount={selectedLeads.length}
                    onSelectAll={handleSelectAll}
                    allSelected={allLeadsSelected}
                    onDeleteMultiple={handleDeleteMultiple}
                    onBulkLevelChange={handleBulkLevelChange}
                />
        </div>
    );
}
