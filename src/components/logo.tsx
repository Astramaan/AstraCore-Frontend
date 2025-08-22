import { Building } from 'lucide-react';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
        <Building className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold font-headline text-primary">AstraCore</span>
    </div>
  );
};

export default Logo;
