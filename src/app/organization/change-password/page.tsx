
import { Suspense } from 'react';
import ChangePasswordPageContent from './page-content';

export default function ChangePasswordPage({ params: { organizationId } }: { params: { organizationId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordPageContent />
    </Suspense>
  );
}
