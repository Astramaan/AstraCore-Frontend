
import { Suspense } from 'react';
import TeamsPageContent from './teams-page-content';

export default function TeamsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamsPageContent />
    </Suspense>
  );
}
