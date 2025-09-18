
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface AvatarWithProgressProps {
  value: number;
  children: React.ReactNode;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const AvatarWithProgress = ({
  value,
  children,
  className,
  size = 56,
  strokeWidth = 4,
}: AvatarWithProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="text-gray-300"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            transition: 'stroke-dashoffset 0.3s ease-out',
          }}
        />
      </svg>
      <div className="absolute">{children}</div>
    </div>
  );
};
