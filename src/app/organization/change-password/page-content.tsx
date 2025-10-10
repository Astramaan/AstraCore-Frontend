'use client';

import { ChangePasswordDialog } from '@/components/change-password-dialog';
import { HabiLogo } from '@/components/habi-logo';
import { useUser } from '@/context/user-context';
import Image from 'next/image';

export default function ChangePasswordPageContent() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Please log in to change your password.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row overflow-hidden md:rounded-[50px] bg-card text-card-foreground w-full max-w-4xl md:w-auto md:h-auto items-center">
        <div className="relative w-full h-[250px] shrink-0 md:w-[396px] md:h-[507px]">
          <div className="h-full relative pl-4">
            <Image
              src="/images/logoimage.png"
              alt="Astramaan construction site"
              fill
              priority
              className="object-cover rounded-t-[40px] md:rounded-l-[40px] md:rounded-r-none"
              data-ai-hint="construction site company building"
            />
          </div>
        </div>
        <div className="bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] md:mt-0 relative flex flex-col md:py-6 md:pl-10 md:pr-6 md:w-[448px]">
          <div className="mx-auto w-full max-w-md flex flex-col h-full">
            <HabiLogo />
            <div className="mt-8 flex-grow flex flex-col">
              <ChangePasswordDialog email={user.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
