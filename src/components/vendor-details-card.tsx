"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Upload, X, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";

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

const FileField = ({
  label,
  fileName,
  isEditing,
  onFileChange,
  onFileRemove,
}: {
  label: string;
  fileName: string | undefined;
  isEditing: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dummyPdfUrl = `https://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true`;

  return (
    <div className="space-y-2">
      <Label
        className={cn(
          "text-lg font-medium px-2",
          fileName ? "text-grey-1" : "text-zinc-900",
        )}
      >
        {label}
      </Label>
      <div className="h-14 flex items-center px-5 rounded-full bg-background">
        <div className="p-2.5 bg-zinc-100 dark:bg-zinc-700 rounded-[15px] flex-1 flex justify-between items-center">
          {fileName && !isEditing ? (
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-black dark:text-white text-sm font-normal truncate hover:underline">
                  {fileName}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col">
                <DialogHeader className="p-4 border-b">
                  <DialogTitle>{fileName}</DialogTitle>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-4 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </DialogHeader>
                <div className="flex-1">
                  <iframe
                    src={dummyPdfUrl}
                    className="w-full h-full"
                    title={fileName}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <span className="text-black dark:text-white text-sm font-normal truncate">
              {fileName || "No file selected"}
            </span>
          )}
          {isEditing && (
            <div className="flex items-center gap-1">
              {fileName && (
                <button
                  type="button"
                  onClick={onFileRemove}
                  className="text-destructive p-1 rounded-full hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="border-l border-stone-300 h-6" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-neutral-500 flex items-center gap-1 pl-2"
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
};

const DayToggle = ({
  day,
  selectedDays,
  onDayToggle,
  isEditing,
}: {
  day: string;
  selectedDays: string[];
  onDayToggle: (day: string) => void;
  isEditing: boolean;
}) => {
  const isActive = selectedDays.includes(day);
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0",
        isActive
          ? "bg-primary text-white border-primary"
          : "bg-input text-foreground border-input",
        !isEditing && "pointer-events-none",
      )}
      onClick={() => {
        if (isEditing) {
          onDayToggle(day);
        }
      }}
    >
      {day}
    </Button>
  );
};

export const VendorDetailsCard = ({
  vendor,
  setVendor,
  isEditing,
}: {
  vendor: any;
  setVendor: Function;
  isEditing: boolean;
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setVendor((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setVendor((prev: any) => ({
          ...prev,
          [name]: e.target.files![0].name,
        }));
      }
    };

  const handleFileRemove = (name: string) => () => {
    setVendor((prev: any) => ({ ...prev, [name]: "" }));
  };

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const city = e.currentTarget.value.trim();
      if (city && !vendor.serviceableCities.includes(city)) {
        setVendor((prev: any) => ({
          ...prev,
          serviceableCities: [...prev.serviceableCities, city],
        }));
        e.currentTarget.value = "";
      }
    }
  };

  const removeCity = (cityToRemove: string) => {
    setVendor((prev: any) => ({
      ...prev,
      serviceableCities: prev.serviceableCities.filter(
        (city: string) => city !== cityToRemove,
      ),
    }));
  };

  const handleDayToggle = (day: string) => {
    const newDays = vendor.availability.days.includes(day)
      ? vendor.availability.days.filter((d: string) => d !== day)
      : [...vendor.availability.days, day];
    setVendor((prev: any) => ({
      ...prev,
      availability: { ...prev.availability, days: newDays },
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendor((prev: any) => ({
      ...prev,
      availability: { ...prev.availability, time: e.target.value },
    }));
  };

  return (
    <Card className="rounded-[50px] p-6">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <Image
            src={vendor.logo}
            width={150}
            height={150}
            alt={vendor.companyName}
            className="rounded-[25px] border border-stone-300"
            data-ai-hint="company logo"
          />
          <div className="space-y-6 flex-1 w-full">
            <DetailField
              label="Company Name*"
              name="companyName"
              value={vendor.companyName}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-6">
          <DetailField
            label="Phone Number*"
            name="phone"
            value={vendor.phone}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <DetailField
            label="Email*"
            name="email"
            value={vendor.email}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <div className="space-y-2">
            <Label
              className={cn(
                "text-lg font-medium px-2",
                vendor.address ? "text-grey-1" : "text-zinc-900",
              )}
            >
              Address*
            </Label>
            {isEditing ? (
              <Textarea
                name="address"
                value={vendor.address}
                onChange={handleInputChange}
                className="rounded-[25px] bg-background p-4 min-h-[96px]"
              />
            ) : (
              <div className="rounded-[25px] bg-background p-4 min-h-[96px]">
                <p>{vendor.address}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileField
              label="CIN Certificate"
              fileName={vendor.cinCertificate}
              isEditing={isEditing}
              onFileChange={handleFileChange("cinCertificate")}
              onFileRemove={handleFileRemove("cinCertificate")}
            />
            <FileField
              label="GST Certificate"
              fileName={vendor.gstCertificate}
              isEditing={isEditing}
              onFileChange={handleFileChange("gstCertificate")}
              onFileRemove={handleFileRemove("gstCertificate")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailField
              label="GST Number*"
              name="gstNumber"
              value={vendor.gstNumber}
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <FileField
              label="Product Brochure"
              fileName={vendor.brochure}
              isEditing={isEditing}
              onFileChange={handleFileChange("brochure")}
              onFileRemove={handleFileRemove("brochure")}
            />
          </div>

          <div className="space-y-2">
            <Label
              className={cn(
                "text-lg font-medium px-2",
                vendor.serviceableCities.length > 0
                  ? "text-grey-1"
                  : "text-zinc-900",
              )}
            >
              Serviceable City
            </Label>
            <div className="bg-background p-2 md:min-h-[56px] rounded-[28px] md:rounded-full flex flex-wrap gap-2 items-center">
              {vendor.serviceableCities.map((city: string) => (
                <div
                  key={city}
                  className="flex items-center gap-1 bg-white dark:bg-zinc-700 rounded-full px-2.5 py-[5px]"
                >
                  <span className="text-black dark:text-white text-sm font-normal">
                    {city}
                  </span>
                  {isEditing && (
                    <button type="button" onClick={() => removeCity(city)}>
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <Input
                  onKeyDown={handleCityKeyDown}
                  placeholder="Add city..."
                  className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm p-0 m-0"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                className={cn(
                  "text-lg font-medium px-2",
                  vendor.availability.days.length > 0
                    ? "text-grey-1"
                    : "text-zinc-900",
                )}
              >
                Days
              </Label>
              <div className="flex gap-2 items-center h-14">
                {["S", "M", "T", "W", "Th", "F", "Sa"].map((day) => (
                  <DayToggle
                    key={day}
                    day={day}
                    selectedDays={vendor.availability.days}
                    onDayToggle={handleDayToggle}
                    isEditing={isEditing}
                  />
                ))}
              </div>
            </div>
            <DetailField
              label="Time"
              name="time"
              value={vendor.availability.time}
              isEditing={isEditing}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
