import React from "react";
import { cn } from "@/lib/utils";

const RedirectionArrowIcon = ({ className }: { className?: string }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.375 7.03125C8.94353 7.03125 8.59375 6.68147 8.59375 6.25C8.59375 5.81853 8.94353 5.46875 9.375 5.46875H18.75C19.1815 5.46875 19.5313 5.81853 19.5313 6.25V15.625C19.5313 16.0565 19.1815 16.4063 18.75 16.4063C18.3185 16.4063 17.9688 16.0565 17.9688 15.625V8.1361L6.80243 19.3024C6.49733 19.6075 6.00267 19.6075 5.69757 19.3024C5.39248 18.9973 5.39248 18.5027 5.69757 18.1976L16.8639 7.03125H9.375Z"
      fill="currentColor"
    />
  </svg>
);

export default RedirectionArrowIcon;
