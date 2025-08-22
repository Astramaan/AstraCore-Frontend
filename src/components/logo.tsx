import { Building } from 'lucide-react';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-2xl font-bold font-headline text-foreground">Logo</span>
    </div>
  );
};

export default Logo;
