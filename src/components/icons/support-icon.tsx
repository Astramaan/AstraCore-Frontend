import React from "react";
import { cn } from "@/lib/utils";

const SupportIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      d="M8.27091 19.9998H15.729M19.25 15.2288C19.25 15.2288 19.923 11.9618 17.202 9.24083C14.481 6.51983 11.214 5.84783 11.214 5.84783C11.214 5.84783 7.947 6.51983 5.226 9.24083C2.505 11.9618 3.177 15.2288 3.177 15.2288M12 15.5V11M12 8.5V7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SupportIcon;
