import Image from 'next/image';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
        <Image src="/image/logo.png" alt="AstraCore Logo" width="132" height="50" />
    </div>
  );
};

export default Logo;
