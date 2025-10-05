

'use client';

import React, { useState, useEffect } from 'react';
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
import { Users, X } from "lucide-react";
import { useToast } from './ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SuccessPopup } from './success-popup';

const InviteUserForm = ({ onFormSuccess }: { onFormSuccess: () => void }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if(data.success) {
                onFormSuccess();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: data.message
                });
            }
        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: "An unexpected error occurred."
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email ID</Label>
                    <Input id="email" name="email" type="email" placeholder="Enter user's email" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" required>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Invitation'}
                </Button>
            </div>
        </form>
    );
};

export function InviteUserSheet() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = () => {
        setIsOpen(false);
        setShowSuccess(true);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-white text-black rounded-full h-14 px-10 text-lg font-medium hover:bg-primary hover:text-white hidden md:flex">
                        <Users className="mr-2 h-6 w-6" />
                        Invite
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-0 rounded-2xl">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle className="flex justify-between items-center">
                            Invite User
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <X className="h-4 w-4" />
                                </Button>
                            </DialogClose>
                        </DialogTitle>
                    </DialogHeader>
                    <InviteUserForm onFormSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
            <SuccessPopup
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Invitation Sent!"
                message="The user has been invited to join the platform."
            />
        </>
    );
}
