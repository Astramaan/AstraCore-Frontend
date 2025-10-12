"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const DetailField = ({
  label,
  value,
  isEditing,
  onChange,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string | undefined;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  type?: string;
}) => (
  <div className="space-y-2">
    <Label
      className={cn(
        "text-lg font-medium px-2",
        value ? "text-grey-1" : "text-zinc-900",
      )}
    >
      {label}
    </Label>
    {isEditing ? (
      <Input
        name={name}
        value={value}
        onChange={onChange}
        className="h-14 bg-background rounded-full px-5"
        placeholder={placeholder || label}
        type={type}
      />
    ) : (
      <div className="h-14 flex items-center px-5 rounded-full bg-background">
        <p className="text-black dark:text-white text-base leading-tight truncate">
          {value}
        </p>
      </div>
    )}
  </div>
);

export const VendorAccountDetailsCard = ({
  details,
  setDetails,
  isEditing,
}: {
  details: Record<string, string>;
  setDetails: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isEditing: boolean;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev: Record<string, string>) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="rounded-[50px] p-6">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-lg">Account details</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailField
            label="Bank Name*"
            name="bankName"
            value={details.bankName}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <DetailField
            label="Account Holder Name*"
            name="accountHolder"
            value={details.accountHolder}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <DetailField
            label="Account Number*"
            name="accountNumber"
            value={details.accountNumber}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <DetailField
            label="IFSC Code*"
            name="ifscCode"
            value={details.ifscCode}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <div className="md:col-span-2">
            <DetailField
              label="UPI ID"
              name="upiId"
              value={details.upiId}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
