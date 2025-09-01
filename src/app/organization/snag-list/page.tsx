

'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreVertical, Trash2, ShieldAlert, ChevronDown, Plus } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AddSnagSheet } from '@/components/add-snag-sheet';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Snag {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: string;
    status: 'Open' | 'Closed' | 'In Progress';
    subStatus: string;
    statusColor: string;
    image: string;
    projectId: string;
    projectName: string;
}

const allSnagsData: Snag[] = [
    {
        id: 'SNAG001',
        title: 'Material Damage',
        description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
        createdBy: 'Yaswanth',
        createdAt: '01 June 2024, 11:00am',
        status: 'Open',
        subStatus: 'unresolved',
        statusColor: 'text-red-600',
        image: 'https://placehold.co/60x60',
        projectId: 'CHA2024',
        projectName: 'Charan Project'
    },
    {
        id: 'SNAG002',
        title: 'Material Damage',
        description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
        createdBy: 'Yaswanth',
        createdAt: '01 June 2024, 11:00am',
        status: 'Closed',
        subStatus: 'Resolved',
        statusColor: 'text-cyan-500',
        image: 'https://placehold.co/60x60',
        projectId: 'CHA2024',
        projectName: 'Charan Project'
    },
     {
        id: 'SNAG003',
        title: 'Material Damage',
        description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
        createdBy: 'Yaswanth',
        createdAt: '01 June 2024, 11:00am',
        status: 'Closed',
        subStatus: 'Resolved',
        statusColor: 'text-cyan-500',
        image: 'https://placehold.co/60x60',
        projectId: 'CHA2024',
        projectName: 'Charan Project'
    },
    {
        id: 'SNAG004',
        title: 'Material Damage',
        description: 'Delivered Materials damaged fjvjvjlvjlvjlvnvjl cmdmvdkmvdkmvvknflvn',
        createdBy: 'Yaswanth',
        createdAt: '01 June 2024, 11:00am',
        status: 'Open',
        subStatus: 'unresolved',
        statusColor: 'text-red-600',
        image: 'https://placehold.co/60x60',
        projectId: 'SAT2024',
        projectName: 'Satish Project'
    },
];

const SnagCard = ({ snag, onSelectionChange, isSelected, onSingleDelete, isLast }: { snag: Snag, onSelectionChange: (id: string, checked: boolean) => void, isSelected: boolean, onSingleDelete: (id: string) => void, isLast?: boolean }) => (
    <div className="flex flex-col px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
            <div className="flex items-center gap-4 flex-1">
                <Checkbox 
                    id={`select-${snag.id}`} 
                    className="w-6 h-6 rounded-full" 
                    checked={isSelected}
                    onCheckedChange={(checked) => onSelectionChange(snag.id, !!checked)}
                />
                <Image src={snag.image} alt={snag.title} width={60} height={60} className="rounded-lg" data-ai-hint="defect photo"/>
                <div className="flex flex-col gap-1 w-full md:w-60">
                    <p className="font-medium text-lg text-black">{snag.title}</p>
                    <p className="text-sm text-grey-1 line-clamp-2">{snag.description}</p>
                </div>
            </div>

            <div className="w-px h-14 bg-stone-200 hidden md:block" />

            <div className="flex flex-col gap-2 flex-1">
                <p className="text-lg"><span className="text-grey-1">Created By: </span><span className="text-black font-medium">{snag.createdBy}</span></p>
                <p className="text-sm text-grey-1">{snag.createdAt}</p>
            </div>
            
            <div className="w-px h-14 bg-stone-200 hidden md:block" />

            <div className="flex items-center justify-between w-full md:w-auto md:gap-4 flex-wrap">
                <div>
                  <p className={cn("text-lg font-medium", snag.statusColor)}>{snag.status}</p>
                  <p className="text-sm text-grey-1">{snag.subStatus}</p>
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-600" onSelect={(e) => { e.preventDefault(); onSingleDelete(snag.id); }}>Delete</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        {!isLast && <Separator />}
    </div>
);


const FloatingActionBar = ({ selectedCount, onSelectAll, allSelected, onDeleteMultiple, onBulkStatusChange }: { selectedCount: number, onSelectAll: (checked: boolean) => void, allSelected: boolean, onDeleteMultiple: () => void, onBulkStatusChange: (status: Snag['status']) => void }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-[828px] h-20 bg-white rounded-[50px] shadow-[-5px_-5px_25px_0px_rgba(17,17,17,0.25)] flex items-center justify-between px-4 md:px-6 z-50">
            <div className="hidden md:flex items-center gap-4">
                <Checkbox id="select-all-floating" className="w-6 h-6 rounded-full" checked={allSelected} onCheckedChange={(checked) => onSelectAll(!!checked)} />
                <label htmlFor="select-all-floating" className="text-lg font-medium">{allSelected ? 'Deselect all' : 'Select all'}</label>
            </div>
            <p className="text-sm md:text-lg font-medium">{selectedCount} Selected</p>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-14 px-4 md:px-6 rounded-full text-grey-1 text-sm md:text-lg font-medium md:w-48 justify-between hover:bg-primary/10 hover:text-primary">
                        Change Status
                        <ChevronDown className="ml-2"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => onBulkStatusChange('Open')}>Open</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onBulkStatusChange('In Progress')}>In Progress</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onBulkStatusChange('Closed')}>Closed</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
             <AlertDialogTrigger asChild>
                <Button variant="destructive" className="h-14 px-4 md:px-10 rounded-[50px] bg-background hover:bg-destructive/10 text-red-600 text-sm md:text-lg font-medium" onClick={onDeleteMultiple}>
                    <Trash2 className="mr-2" />
                    Delete
                </Button>
            </AlertDialogTrigger>
        </div>
    )
}


export default function SnagListPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const [allSnags, setAllSnags] = useState(allSnagsData);
    const [selectedSnags, setSelectedSnags] = useState<string[]>([]);
    const [snagToDelete, setSnagToDelete] = useState<string[]>([]);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [snagSheetOpen, setSnagSheetOpen] = useState(false);
    const [selectedProjectForSnag, setSelectedProjectForSnag] = useState<string | undefined>(undefined);

    const filteredSnags = useMemo(() => {
        if (!searchTerm) return allSnags;
        return allSnags.filter(snag =>
            snag.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snag.projectId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snag.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snag.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allSnags, searchTerm]);

    const groupedSnags = useMemo(() => {
        return filteredSnags.reduce((acc, snag) => {
            const projectKey = `${snag.projectName} (${snag.projectId})`;
            if (!acc[projectKey]) {
                acc[projectKey] = {
                    projectId: snag.projectId,
                    projectName: snag.projectName,
                    snags: []
                };
            }
            acc[projectKey].snags.push(snag);
            return acc;
        }, {} as Record<string, {projectId: string; projectName: string; snags: Snag[]}>);
    }, [filteredSnags]);

    const handleSelectionChange = (id: string, checked: boolean) => {
        setSelectedSnags(prev => 
            checked ? [...prev, id] : prev.filter(snagId => snagId !== id)
        );
    };

    const allSnagsSelected = useMemo(() => selectedSnags.length === filteredSnags.length && filteredSnags.length > 0, [selectedSnags.length, filteredSnags.length]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedSnags(filteredSnags.map(snag => snag.id));
        } else {
            setSelectedSnags([]);
        }
    };
    
    const handleDelete = () => {
        setAllSnags(prevSnags => 
            prevSnags.filter(snag => !snagToDelete.includes(snag.id))
        );
        setSelectedSnags(prev => prev.filter(id => !snagToDelete.includes(id)));
        setSnagToDelete([]);
        setIsDeleteConfirmationOpen(false);
    }

    const handleSingleDelete = (id: string) => {
        setSnagToDelete([id]);
        setIsDeleteConfirmationOpen(true);
    }
    
    const handleDeleteMultiple = () => {
        setSnagToDelete(selectedSnags);
        setIsDeleteConfirmationOpen(true);
    }
    
    const handleBulkStatusChange = (status: Snag['status']) => {
      const statusColors = {
        'Open': 'text-red-600',
        'In Progress': 'text-yellow-600',
        'Closed': 'text-cyan-500'
      };
      const subStatusText = {
        'Open': 'unresolved',
        'In Progress': 'active',
        'Closed': 'resolved'
      }

      setAllSnags(prevSnags => 
        prevSnags.map(snag => 
            selectedSnags.includes(snag.id) ? { ...snag, status, statusColor: statusColors[status], subStatus: subStatusText[status] } : snag
          )
      );
    };

    const handleAddSnagForProject = (projectId: string) => {
        setSelectedProjectForSnag(projectId);
        setSnagSheetOpen(true);
    }

    const openAddSnagSheet = () => {
        setSelectedProjectForSnag(undefined);
        setSnagSheetOpen(true);
    }


  return (
    <div className="space-y-6 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-medium text-zinc-900">List</h2>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-grey-2" />
                    <Input 
                        placeholder="Search Snags" 
                        className="pl-12 h-14 rounded-full bg-white text-lg" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                 <AddSnagSheet 
                    isOpen={snagSheetOpen} 
                    onOpenChange={setSnagSheetOpen}
                    selectedProjectId={selectedProjectForSnag}
                    trigger={
                         <Button onClick={openAddSnagSheet} className="h-14 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 text-lg font-medium">
                            <Plus className="mr-2"/>
                            New snag
                        </Button>
                    }
                />
            </div>
        </div>
        
         <AlertDialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
            <Accordion type="multiple" className="space-y-6" defaultValue={Object.keys(groupedSnags)}>
                {Object.entries(groupedSnags).map(([projectKey, projectData]) => (
                    <Card key={projectKey} className="rounded-[50px] overflow-hidden">
                        <AccordionItem value={projectKey} className="border-b-0">
                            <AccordionTrigger className="w-full hover:no-underline bg-white px-10 py-6">
                                <div className="flex justify-between items-center w-full">
                                    <h3 className="text-lg font-semibold">{projectKey}</h3>
                                    <div className="flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                                    <MoreVertical className="w-6 h-6" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>View Project</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleAddSnagForProject(projectData.projectId)}>Add Snag</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <CardContent className="p-0 pb-6">
                                    <div className="flex flex-col">
                                        {projectData.snags.map((snag, index) => (
                                            <SnagCard 
                                                key={snag.id} 
                                                snag={snag}
                                                isSelected={selectedSnags.includes(snag.id)}
                                                onSelectionChange={handleSelectionChange}
                                                onSingleDelete={handleSingleDelete}
                                                isLast={index === projectData.snags.length - 1}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>
                ))}
            </Accordion>

            <FloatingActionBar 
                selectedCount={selectedSnags.length}
                onSelectAll={handleSelectAll}
                allSelected={allSnagsSelected}
                onDeleteMultiple={handleDeleteMultiple}
                onBulkStatusChange={handleBulkStatusChange}
            />

            <AlertDialogContent className="max-w-md rounded-[50px]">
                <AlertDialogHeader className="items-center text-center">
                     <div className="relative mb-6 flex items-center justify-center h-20 w-20">
                      <div className="w-full h-full bg-red-600/5 rounded-full" />
                      <div className="w-14 h-14 bg-red-600/20 rounded-full absolute" />
                      <ShieldAlert className="w-8 h-8 text-red-600 absolute" />
                    </div>
                    <AlertDialogTitle className="text-2xl font-semibold">
                        {snagToDelete.length > 1 ? "Delete Selected Snags?" : "Confirm Snag Deletion?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-grey-2">
                        {snagToDelete.length > 1 
                            ? "The selected snags and all associated data will be permanently removed." 
                            : "Deleting this snag will permanently remove all associated data. This action cannot be undone."
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                    <AlertDialogCancel className="w-40 h-14 px-10 rounded-[50px] text-lg font-medium text-black border-none hover:bg-primary/10 hover:text-primary">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="w-40 h-14 px-10 bg-red-600 rounded-[50px] text-lg font-medium text-white hover:bg-red-700">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <AddSnagSheet 
            isOpen={snagSheetOpen} 
            onOpenChange={setSnagSheetOpen} 
            selectedProjectId={selectedProjectForSnag}
        />
    </div>
  );
}
