
import { Suspense } from 'react';
import ChangePasswordPageContent from './page-content';

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordPageContent />
    </Suspense>
  );
}
