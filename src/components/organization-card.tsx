
"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const OrganizationCard = ({ organization }: { organization: any }) => {
  return (
    <>
       {/* Mobile View */}
      <div className="md:hidden flex flex-col p-4 gap-4">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                    <AvatarImage src={organization.logo} />
                    <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-lg font-semibold">{organization.name}</p>
                    <p className="text-base text-muted-foreground">
                      City: <span className="text-black dark:text-white">{organization.city}</span>
                    </p>
                </div>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="w-6 h-6 text-muted-foreground/30" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="space-y-2">
            <p className="text-base">
                <span className="text-muted-foreground">Contact: </span>
                <span className="font-medium">
                {organization.contact.email} | {organization.contact.phone}
                </span>
            </p>
            <p className="text-base">
                <span className="text-muted-foreground">Projects: </span>
                <span className="text-green-600 font-medium">
                {organization.projects}
                </span>
            </p>
            <p className="text-base">
                <span className="text-muted-foreground">Plan: </span>
                <span className="font-medium text-blue-600">
                {organization.plan}
                </span>
            </p>
            <p className="text-base text-muted-foreground">
              Validity: <span className="text-black dark:text-white">{organization.validity}</span>
            </p>
        </div>
      </div>
      {/* Desktop & Tablet View */}
      <div className="hidden md:grid md:grid-cols-[1.5fr_auto_1.5fr_auto_1fr_auto] items-center py-4 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={organization.logo} />
            <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg md:text-xl font-semibold">{organization.name}</p>
            <p className="text-base text-muted-foreground">
              City: <span className="text-black dark:text-white">{organization.city}</span>
            </p>
          </div>
        </div>
        <Separator orientation="vertical" className="h-14" />
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg">
            <span className="text-muted-foreground">Contact: </span>
            <span className="font-medium">
              {organization.contact.email} | {organization.contact.phone}
            </span>
          </p>
          <p className="text-base md:text-lg">
            <span className="text-muted-foreground">Projects: </span>
            <span className="text-green-600 font-medium">
              {organization.projects}
            </span>
          </p>
        </div>
        <Separator orientation="vertical" className="h-14" />
        <div className="flex flex-col items-end gap-2">
          <p className="text-base md:text-lg">
            <span className="text-muted-foreground">Plan: </span>
            <span className="font-medium text-blue-600">
              {organization.plan}
            </span>
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Validity: <span className="text-black dark:text-white">{organization.validity}</span>
          </p>
        </div>
        <div className="justify-self-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-6 h-6 text-muted-foreground/30" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="last:hidden" />
    </>
  );
};
