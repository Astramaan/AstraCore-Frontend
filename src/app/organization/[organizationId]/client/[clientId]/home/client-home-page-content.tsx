
'use client';

import React from 'react';
import ExistingClientHomePage from './existing-client-home';
import { useUser } from '@/context/user-context';
import NewUserHomePage from './new-user-home';
import { useParams } from 'next/navigation';

export default function ClientHomePageContent() {
  const { user, loading } = useUser();
  const params = useParams();
  
  if (loading || !user) {
      return null;
  }
  
  if (user.team === 'New User') {
      return <NewUserHomePage params={{ organizationId: params.organizationId as string, userId: user.userId }} />;
  }
  
  return (
      <ExistingClientHomePage />
  );
}
