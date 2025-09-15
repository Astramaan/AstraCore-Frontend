
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { DefaultHomePage } from './default-home';
import { ProjectManagerHome } from './project-manager-home';

export default function OrganizationHomePage() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role');

  if (userRole === 'Project Manager') {
    return <ProjectManagerHome />;
  }
  
  return <DefaultHomePage />;
}
