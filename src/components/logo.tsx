import { Building } from 'lucide-react';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
        <Building className="h-8 w-8" />
        <span className="text-2xl font-bold font-headline">Astramaan</span>
    </div>
  );
};

export default Logo;
