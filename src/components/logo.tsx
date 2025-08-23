import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image 
        src="/image/logo.png" 
        alt="Astramaan Logo" 
        width="132" 
        height="50" 
        className={cn(className)}
    />
  );
};

export default Logo;
