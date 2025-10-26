"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/data";

export default function LeadCard({
  lead,
  onEdit,
  onDelete,
  onViewDetails,
  isFirst = false,
  isLast = false,
}: {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onViewDetails: (lead: Lead) => void;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className={cn("flex flex-col group")}>
      {/* ✅ Mobile & Tablet View */}
      <div className="md:hidden p-4 gap-4">
        <div className="flex items-start justify-between gap-4">
          <div
            onClick={() => onViewDetails(lead)}
            className="flex items-center gap-4 w-full cursor-pointer"
          >
            <Checkbox />
            <div>
              <p className="text-xl font-semibold text-black">
                {lead.fullName}
              </p>
              <p className="text-lg">
                <span className="text-grey-2">Location: </span>
                <span className="text-black">
                  {lead.address.split(",").pop()?.trim().split(" ")[0] || "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => onEdit(lead)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => onDelete(lead)}
                  className="text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <p className="text-lg whitespace-nowrap">
            <span className="text-grey-2">Contact: </span>
            <span className="text-black break-all">{lead.contact}</span>
          </p>
          <p className="text-lg">
            <span className="text-zinc-900">{lead.leadId}</span>
          </p>
        </div>
      </div>

      {/* ✅ Desktop View */}
      <div
        className={cn(
          "hidden md:grid md:grid-cols-[1.2fr_1.5fr_1fr] items-stretch py-6 gap-x-6 cursor-pointer hover:bg-hover-bg px-4",
          isFirst && "hover:rounded-t-[30px]",
          isLast && "hover:rounded-b-[30px]",
        )}
      >
        {/* Col 1: Name + Location */}
        <div
          onClick={() => onViewDetails(lead)}
          className="flex items-center gap-4 cursor-pointer"
        >
          <Checkbox />
          <div>
            <p className="text-xl font-semibold text-black">{lead.fullName}</p>
            <p className="text-lg">
              <span className="text-grey-2">Location: </span>
              <span className="text-black">
                {lead.address.split(",").pop()?.trim().split(" ")[0] || "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Col 2: Contact + ID */}
        <div className="flex flex-col justify-center gap-2 border-l border-gray-200 pl-6">
          <p className="text-lg whitespace-nowrap">
            <span className="text-grey-2">Contact: </span>
            <span className="text-black break-all">{lead.contact}</span>
          </p>
          <p className="text-lg">
            <span className="text-zinc-900">{lead.leadId}</span>
          </p>
        </div>

        {/* Col 3: Actions */}
        <div
          className="flex items-center justify-between border-l border-gray-200 pl-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4 py-2 text-sm font-medium"
          >
            Level {lead.level}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10"
          >
            <Phone className="w-5 h-5 text-primary" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => onEdit(lead)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => onDelete(lead)}
                className="text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
