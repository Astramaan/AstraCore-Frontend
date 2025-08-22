import Image from 'next/image';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
        <Image src="/image/logo.png" alt="Astramaan Logo" width={132} height={50} priority />
    </div>
  );
};

export default Logo;
