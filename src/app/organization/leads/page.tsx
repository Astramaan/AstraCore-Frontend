
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Search, Plus, Phone, ChevronDown, Trash2, ShieldAlert, RefreshCw, X } from 'lucide-react';
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
} from "@/components/ui/dialog";

type Lead = {
    organization: string;
    leadId: string;
    fullName: string;
    contact: string;
    phone: string;
};

const leadsData: Lead[] = [
    {
        organization: "Golden Ventures",
        leadId: "GOLDMYS7890",
        fullName: "Balaji Naik",
        contact: "Employee@abc.com | +91 1234567890",
        phone: "9380032186"
    },
    {
        organization: "Silver Innovations",
        leadId: "SILVERBLR123",
        fullName: "Anil Kumar",
        contact: "anil.k@silver.io | +91 9876543210",
        phone: "9876543210"
    },
    {
        organization: "Bronze Builders",
        leadId: "BRONZECHE456",
        fullName: "Sunita Reddy",
        contact: "s.reddy@bronze.dev | +91 8765432109",
        phone: "8765432109"
    },
     {
        organization: "Platinum Partners",
        leadId: "PLATINUMHYD789",
        fullName: "Rajesh Singh",
        contact: "raj.singh@platinum.co | +91 7654321098",
        phone: "7654321098"
    },
];

const LeadCard = ({ lead, onSelectionChange, isSelected, onSingleDelete, onContact }: { lead: Lead, onSelectionChange: (id: string, checked: boolean) => void, isSelected: boolean, onSingleDelete: (id: string) => void, onContact: (lead: Lead) => void }) => (
    <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center gap-4 flex-1">
                <Checkbox 
                    id={`select-${lead.leadId}`} 
                    className="w-6 h-6 rounded-full" 
                    checked={isSelected}
                    onCheckedChange={(checked) => onSelectionChange(lead.leadId, !!checked)}
                />
                <div className="flex flex-col gap-2">
                    <p className="text-lg"><span className="text-grey-1">Organization: </span><span className="text-black font-medium">{lead.organization}</span></p>
                    <p className="text-lg"><span className="text-grey-1">Lead ID: </span><span className="text-black font-medium">{lead.leadId}</span></p>
                </div>
            </div>

            <div className="w-px h-14 bg-stone-200 hidden md:block" />

            <div className="flex flex-col gap-2 flex-1">
                <p className="text-lg"><span className="text-grey-1">Full Name: </span><span className="text-black font-medium">{lead.fullName}</span></p>
                <p className="text-lg"><span className="text-grey-1">Contact: </span><span className="text-black font-medium">{lead.contact}</span></p>
            </div>
            
            <div className="w-px h-14 bg-stone-200 hidden md:block" />

            <div className="flex items-center gap-4 flex-wrap">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-14 px-6 rounded-full text-grey-1 text-lg font-medium w-full md:w-48 justify-between">
                            Lead Level
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Level 1</DropdownMenuItem>
                        <DropdownMenuItem>Level 2</DropdownMenuItem>
                        <DropdownMenuItem>Level 3</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button className="h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium w-full md:w-auto" onClick={() => onContact(lead)}>
                    <Phone className="mr-2"/>
                    Contact
                </Button>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-600" onClick={() => onSingleDelete(lead.leadId)}>Delete</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div className="h-px bg-stone-200" />
    </div>
);


const FloatingActionBar = ({ selectedCount, onSelectAll, allSelected, onDeleteMultiple }: { selectedCount: number, onSelectAll: (checked: boolean) => void, allSelected: boolean, onDeleteMultiple: () => void }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-[828px] h-20 bg-white rounded-[50px] shadow-[-5px_-5px_25px_0px_rgba(17,17,17,0.25)] flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-4">
                <Checkbox id="select-all-floating" className="w-6 h-6 rounded-full" checked={allSelected} onCheckedChange={(checked) => onSelectAll(!!checked)} />
                <label htmlFor="select-all-floating" className="text-lg font-medium">{allSelected ? 'Deselect all' : 'Select all'}</label>
            </div>
            <p className="text-lg font-medium">{selectedCount} Selected</p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-14 px-6 rounded-full text-grey-1 text-lg font-medium w-48 justify-between">
                        Lead Level
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Level 1</DropdownMenuItem>
                    <DropdownMenuItem>Level 2</DropdownMenuItem>
                    <DropdownMenuItem>Level 3</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
             <AlertDialogTrigger asChild>
                <Button variant="destructive" className="h-14 px-10 rounded-[50px] bg-background hover:bg-destructive/10 text-red-600 text-lg font-medium" onClick={onDeleteMultiple}>
                    <Trash2 className="mr-2" />
                    Delete
                </Button>
            </AlertDialogTrigger>
        </div>
    )
}


export default function LeadsPage() {
    const [allLeads, setAllLeads] = useState(leadsData);
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
    const [leadToDelete, setLeadToDelete] = useState<string[]>([]);
    const [contactedLead, setContactedLead] = useState<Lead | null>(null);
    const [isUpdateLevelDialogOpen, setIsUpdateLevelDialogOpen] = useState(false);

    const handleSelectionChange = (id: string, checked: boolean) => {
        setSelectedLeads(prev => 
            checked ? [...prev, id] : prev.filter(leadId => leadId !== id)
        );
    };

    const allLeadsSelected = useMemo(() => selectedLeads.length === allLeads.length && allLeads.length > 0, [selectedLeads.length, allLeads.length]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedLeads(allLeads.map(lead => lead.leadId));
        } else {
            setSelectedLeads([]);
        }
    };
    
    const handleDelete = () => {
        setAllLeads(prev => prev.filter(lead => !leadToDelete.includes(lead.leadId)));
        setSelectedLeads(prev => prev.filter(id => !leadToDelete.includes(id)));
        setLeadToDelete([]);
    }

    const handleSingleDelete = (id: string) => {
        setLeadToDelete([id]);
    }
    
    const handleDeleteMultiple = () => {
        setLeadToDelete(selectedLeads);
    }

    const handleContact = (lead: Lead) => {
        setContactedLead(lead);
        setIsUpdateLevelDialogOpen(true);
    };


    return (
        <div className="space-y-8 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-semibold text-zinc-900">Lead List</h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-2" />
                        <Input placeholder="Search Lead" className="pl-12 h-14 rounded-full bg-white text-lg" />
                    </div>
                     <AddLeadSheet />
                </div>
            </div>

            <AlertDialog>
                 <Card className="rounded-[50px] overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col">
                            {allLeads.map((lead) => (
                                <LeadCard 
                                    key={lead.leadId} 
                                    lead={lead} 
                                    onSelectionChange={handleSelectionChange}
                                    isSelected={selectedLeads.includes(lead.leadId)}
                                    onSingleDelete={handleSingleDelete}
                                    onContact={handleContact}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <FloatingActionBar 
                    selectedCount={selectedLeads.length}
                    onSelectAll={handleSelectAll}
                    allSelected={allLeadsSelected}
                    onDeleteMultiple={handleDeleteMultiple}
                />

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
                        <AlertDialogDescription className="text-lg text-grey-2">
                            {leadToDelete.length > 1 
                                ? "The selected leads and all associated data will be permanently removed from AstraCore." 
                                : "Deleting this lead will permanently remove all associated data from AstraCore. This action cannot be undone."
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                        <AlertDialogCancel className="w-40 h-14 px-10 py-3.5 bg-background rounded-[50px] text-lg font-medium text-black border-none hover:bg-muted">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="w-40 h-14 px-10 py-3.5 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
            <Dialog open={isUpdateLevelDialogOpen} onOpenChange={setIsUpdateLevelDialogOpen}>
                <DialogContent className="sm:max-w-sm rounded-3xl p-8">
                     <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full" onClick={() => setIsUpdateLevelDialogOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                    <div className="text-center flex flex-col items-center">
                        <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <RefreshCw className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <DialogTitle className="text-lg font-semibold">Update the leads level</DialogTitle>
                        <p className="text-base text-zinc-900">{contactedLead?.fullName}, {contactedLead?.phone}</p>
                        <p className="text-sm text-muted-foreground mt-2">For the better leads management</p>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}


      