

'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Calendar as CalendarIcon, UploadCloud, X, Plus, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Task } from "./task-details-sheet";
import { SuccessPopup } from "./success-popup";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import AssignTaskIcon from "./icons/assign-task-icon";


interface AssignTaskFormProps {
    onTaskAssigned: (task: Omit<Task, 'id' | 'attachments' | 'status'>) => void;
    onClose: () => void;
}


const AssignTaskForm = ({ onTaskAssigned, onClose }: AssignTaskFormProps) => {
    const [date, setDate] = useState<Date>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState<'High' | 'Low' | 'Medium' | null>(null);
    const [attachments, setAttachments] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachments(prev => [...prev, ...Array.from(event.target.files)]);
        }
    };
    
    const handleRemoveFile = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (title && date && members && priority) {
            onTaskAssigned({
                title,
                date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                description,
                priority,
                category: category || 'General',
                project: 'AstraCore App', // Placeholder
                clientId: 'CL005', // Placeholder
            });
            onClose();
        } else {
            // Basic validation feedback
            alert('Please fill all required fields');
        }
    }


    return (
    <div className="flex flex-col h-full">
        <div className="p-6 space-y-6 overflow-y-auto flex-1 no-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="task-title" className={cn("text-lg font-medium", title ? 'text-grey-1' : 'text-zinc-900')}>Task Title*</Label>
                    <Input id="task-title" className="bg-background rounded-full h-14" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description" className={cn("text-lg font-medium", description ? 'text-grey-1' : 'text-zinc-900')}>Description</Label>
                    <Textarea id="description" className="h-32 bg-background rounded-2xl" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="members" className={cn("text-lg font-medium", members ? 'text-grey-1' : 'text-zinc-900')}>Members*</Label>
                     <Select onValueChange={setMembers}>
                        <SelectTrigger className="h-14 bg-background rounded-full" id="members">
                            <SelectValue placeholder="Add members" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="member1">Balaji Naik</SelectItem>
                            <SelectItem value="member2">Anil Kumar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className={cn("text-lg font-medium", date ? 'text-grey-1' : 'text-zinc-900')}>Due Date*</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal h-14 bg-background rounded-full",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? date.toLocaleDateString() : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="category" className={cn("text-lg font-medium", category ? 'text-grey-1' : 'text-zinc-900')}>Category</Label>
                    <Select onValueChange={setCategory}>
                        <SelectTrigger id="category" className="h-14 bg-background rounded-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Meetings">Meetings</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Development">Development</SelectItem>
                            <SelectItem value="QA">QA</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-4">
                    <p className="text-lg font-medium mb-2 text-zinc-900">Priority</p>
                    <div className="flex items-center gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className={cn(
                                "rounded-full px-6", 
                                priority === 'High' 
                                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90' 
                                    : 'bg-background border-stone-300',
                                !priority && "hover:bg-primary/10 hover:text-primary"
                            )} 
                            onClick={() => setPriority('High')}
                        >
                            High
                        </Button>
                        <Button 
                            type="button"
                            variant="outline" 
                            className={cn(
                                "rounded-full px-6", 
                                priority === 'Low' 
                                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90' 
                                    : 'bg-background border-stone-300',
                                !priority && "hover:bg-primary/10 hover:text-primary"
                            )} 
                            onClick={() => setPriority('Low')}
                        >
                            Low
                        </Button>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label className="text-lg font-medium text-zinc-900">Attach Files</Label>
                    <div
                        className="border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-background cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                        />
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">JPG, PNG, PDF • Up to 10Mb</p>
                    </div>
                     {attachments.length > 0 && (
                        <div className="space-y-2 pt-4">
                            <p className="text-sm font-medium">Attached files:</p>
                            <div className="space-y-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <Paperclip className="h-4 w-4" />
                                            <span className="text-sm truncate">{file.name}</span>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => handleRemoveFile(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
        
        <div className="p-6 mt-auto border-t md:border-0 md:flex md:justify-end">
            <Button className="w-full md:w-auto md:px-14 h-[54px] text-lg rounded-full" onClick={handleSubmit}>
                Assign
            </Button>
        </div>
    </div>
    );
};


interface AssignTaskSheetProps {
    onTaskAssigned: (task: Omit<Task, 'id' | 'attachments' | 'status'>) => void;
}

export function AssignTaskSheet({ onTaskAssigned }: AssignTaskSheetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const isMobile = useIsMobile();

    const handleSuccess = (task: Omit<Task, 'id' | 'attachments' | 'status'>) => {
        onTaskAssigned(task);
        setIsOpen(false);
        setShowSuccess(true);
    };

    const DialogOrSheet = Sheet;
    const DialogOrSheetContent = SheetContent;

    return (
        <>
            <DialogOrSheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button className="md:flex-none rounded-full h-[54px] bg-primary text-primary-foreground hover:bg-primary/90 md:text-lg w-[54px] md:w-auto p-0 md:px-6">
                    <AssignTaskIcon className="w-5 h-5 md:mr-2"/>
                    <span className="hidden md:inline">Assign task</span>
                </Button>
            </SheetTrigger>
            <DialogOrSheetContent
                side="bottom"
                className="p-0 m-0 flex flex-col bg-white transition-all h-full md:h-[90vh] md:max-w-4xl md:mx-auto rounded-t-[50px] border-none"
            >
                <DialogHeader className="p-6 border-b bg-white rounded-t-[50px]">
                    <div className="flex justify-between items-center">
                        <DialogTitle className="flex items-center text-2xl font-semibold gilroy-semibold">
                            <div className="w-[54px] h-[54px] rounded-full border border-stone-300 flex items-center justify-center mr-3">
                                <AssignTaskIcon className="h-6 w-6 text-black"/>
                            </div>
                            Assign task
                        </DialogTitle>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="w-[54px] h-[54px] bg-background rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </SheetClose>
                    </div>
                </DialogHeader>
                <div className='font-gilroy-medium text-[18px] flex-1 flex flex-col overflow-hidden'>
                    <AssignTaskForm onTaskAssigned={handleSuccess} onClose={() => setIsOpen(false)} />
                </div>
            </DialogOrSheetContent>
            </DialogOrSheet>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Task Assigned!"
                message="The new task has been successfully assigned and added to the list."
            />
        </>
    );
}
