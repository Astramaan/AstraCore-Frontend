"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface DetailFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  type?: string;
}

export const DetailField = ({
  label,
  value,
  isEditing,
  onChange,
  name,
  placeholder,
  type = "text",
}: DetailFieldProps) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-base text-grey-1 px-2">
        {label}
      </Label>
      {isEditing ? (
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          type={type}
          className="h-auto p-2 text-lg text-black font-medium border-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
        />
      ) : (
        <p className="text-lg text-black font-medium p-2">{value}</p>
      )}
    </div>
  );
};
