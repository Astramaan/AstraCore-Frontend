import React from "react";
import { cn } from "@/lib/utils";

const HandCoinsIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      d="M12 7.75H14.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 10.75H14.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 13.75H14.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 16.63V15.79C21 14.2 19.82 12.98 18.25 12.91L17.75 12.89C16.8 12.83 16 12.01 16 11.04V7.5C16 5.29 14.21 3.5 12 3.5C9.79 3.5 8 5.29 8 7.5V11.04C8 12.01 7.2 12.83 6.25 12.89L5.75 12.91C4.18 12.98 3 14.2 3 15.79V16.63C3 18.58 4.41 20.21 6.34 20.47L10.5 21V19C10.5 17.9 11.4 17 12.5 17H13.5C14.6 17 15.5 17.9 15.5 19V21L17.66 20.47C19.59 20.21 21 18.58 21 16.63Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HandCoinsIcon;
