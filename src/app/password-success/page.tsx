
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HabiLogo } from '@/components/habi-logo';
import Image from 'next/image';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PasswordSuccessPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Desktop view */}
      <div className="flex flex-col md:flex-row overflow-hidden md:rounded-[50px] bg-card text-card-foreground w-full max-w-4xl md:w-auto md:h-auto items-center">
        <div className="relative w-full h-[250px] shrink-0 md:w-[396px] md:h-[507px]">
            <div className="h-full relative pl-4">
                <Image 
                    src="/images/logoimage.png"
                    alt="Astramaan Company Logo"
                    fill
                    priority
                    className="object-cover rounded-t-[40px] md:rounded-l-[40px] md:rounded-r-none"
                    data-ai-hint="company building"
                />
            </div>
        </div>

        <div className="bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] md:mt-0 relative flex flex-col md:py-6 md:pl-10 md:pr-6 md:w-[448px]">
            <div className="mx-auto w-full max-w-md flex flex-col h-full text-center">
              <div className="flex-1 flex flex-col justify-start">
                  <HabiLogo />
                  <div className="flex-grow flex flex-col justify-center items-center">
                    <div className="relative mb-6 flex items-center justify-center">
                      <div className="w-20 h-20 bg-lime-600/5 rounded-full" />
                      <div className="w-14 h-14 bg-lime-600/20 rounded-full absolute" />
                      <div className="w-10 h-10 bg-primary/20 absolute flex items-center justify-center rounded-full">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    <h1 className="text-2xl font-semibold text-black mb-2">Password Created Successfully</h1>
                    <p className="text-lg text-grey-2">You're all set! You can now Login<br/>with your new password.</p>
                  </div>
              </div>
                <div className="text-grey-1 text-sm pb-[env(safe-area-inset-bottom)]">
                  <p>Redirecting you to the login page in {countdown} seconds. If it doesn't happen automatically, <Link href="/" className="underline text-primary">click here</Link>.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
