import React from "react";
import { cn } from "@/lib/utils";

const OnboardingIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      d="M10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5C12.7614 12.5 15 10.2614 15 7.5C15 4.73858 12.7614 2.5 10 2.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M19.5 21.5L19.5 14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16.5 17.5L19.5 14.5L22.5 17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 21.5C12.8333 21.5 8.5 22 2.5 21.5C3 18.5 4.5 16.5 10 16.5C12.5 16.5 13.5 17 14.5 17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default OnboardingIcon;
