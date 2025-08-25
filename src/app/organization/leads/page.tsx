
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Search, Plus, Phone, ChevronDown, Trash2 } from 'lucide-react';
import { AddLeadSheet } from '@/components/add-lead-sheet';

const leads = [
    {
        organization: "Golden Ventures",
        leadId: "GOLDMYS7890",
        fullName: "Balaji Naik",
        contact: "Employee@abc.com | +91 1234567890",
    },
    {
        organization: "Silver Innovations",
        leadId: "SILVERBLR123",
        fullName: "Anil Kumar",
        contact: "anil.k@silver.io | +91 9876543210",
    },
    {
        organization: "Bronze Builders",
        leadId: "BRONZECHE456",
        fullName: "Sunita Reddy",
        contact: "s.reddy@bronze.dev | +91 8765432109",
    },
     {
        organization: "Platinum Partners",
        leadId: "PLATINUMHYD789",
        fullName: "Rajesh Singh",
        contact: "raj.singh@platinum.co | +91 7654321098",
    },
];

const LeadCard = ({ lead, onSelectionChange, isSelected }: { lead: typeof leads[0], onSelectionChange: (id: string, checked: boolean) => void, isSelected: boolean }) => (
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

                <Button className="h-14 px-10 rounded-full bg-background text-black hover:bg-muted text-lg font-medium w-full md:w-auto">
                    <Phone className="mr-2"/>
                    Contact
                </Button>
                
                <Button variant="ghost" size="icon">
                    <MoreVertical className="w-6 h-6" />
                </Button>
            </div>
        </div>
        <div className="h-px bg-stone-200" />
    </div>
);


const FloatingActionBar = ({ selectedCount, onSelectAll, allSelected, clearSelection }: { selectedCount: number, onSelectAll: (checked: boolean) => void, allSelected: boolean, clearSelection: () => void }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[828px] h-20 bg-white rounded-[50px] shadow-[-5px_-5px_25px_0px_rgba(17,17,17,0.25)] flex items-center justify-between px-6 z-50">
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
            <Button variant="destructive" className="h-14 px-10 rounded-[50px] bg-background hover:bg-destructive/10 text-red-600 text-lg font-medium">
                <Trash2 className="mr-2" />
                Delete
            </Button>
        </div>
    )
}


export default function LeadsPage() {
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

    const handleSelectionChange = (id: string, checked: boolean) => {
        setSelectedLeads(prev => 
            checked ? [...prev, id] : prev.filter(leadId => leadId !== id)
        );
    };

    const allLeadsSelected = useMemo(() => selectedLeads.length === leads.length && leads.length > 0, [selectedLeads.length, leads.length]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedLeads(leads.map(lead => lead.leadId));
        } else {
            setSelectedLeads([]);
        }
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

            <Card className="rounded-[50px] overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex flex-col">
                        {leads.map((lead) => (
                            <LeadCard 
                                key={lead.leadId} 
                                lead={lead} 
                                onSelectionChange={handleSelectionChange}
                                isSelected={selectedLeads.includes(lead.leadId)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <FloatingActionBar 
                selectedCount={selectedLeads.length}
                onSelectAll={handleSelectAll}
                allSelected={allLeadsSelected}
                clearSelection={() => setSelectedLeads([])}
            />
        </div>
    )
}
