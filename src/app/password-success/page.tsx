
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
    <div className="min-h-screen bg-background">
      {/* Mobile view */}
      <div className="md:hidden flex flex-col min-h-screen">
          <div className="relative w-full h-[250px] shrink-0">
              <Image 
                  src="https://placehold.co/430x250.png"
                  alt="Abstract green shapes"
                  fill
                  className="object-cover"
                  data-ai-hint="abstract green"
              />
          </div>
          <div className="flex-grow bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] relative flex flex-col items-center text-center">
              <div className="absolute top-8 left-4">
                  <HabiLogo />
              </div>
              <div className='flex-grow flex flex-col justify-center items-center'>
                  <div className="relative mb-6 flex items-center justify-center">
                      <div className="w-20 h-20 bg-lime-600/5 rounded-full" />
                      <div className="w-14 h-14 bg-lime-600/20 rounded-full absolute" />
                      <div className="w-10 h-10 bg-primary/20 rounded-full absolute flex items-center justify-center">
                          <Check className="w-8 h-8 text-primary" />
                      </div>
                  </div>
                  <h1 className="text-2xl font-semibold mb-2">Password Created Successfully</h1>
                  <p className="text-muted-foreground mb-6">You're all set! You can now Login with your new password.</p>
              </div>
              <p className="text-sm text-muted-foreground pb-[env(safe-area-inset-bottom)]">
                  Redirecting in {countdown}s. <Link href="/" className="underline text-primary">Login now</Link>
              </p>
          </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex md:items-center md:justify-center md:h-screen md:p-4">
        <div className="overflow-hidden rounded-[50px] bg-card text-card-foreground">
          <div className="grid grid-cols-2 h-full">
            <div className="relative h-full w-full overflow-hidden">
                <div className="pt-4 pl-4 pb-4 h-full">
                    <Image 
                        src="/images/logoimage.png"
                        alt="Astramaan Company Logo"
                        width={396}
                        height={507}
                        className="object-cover rounded-tl-[40px] rounded-bl-[40px]"
                        data-ai-hint="company building"
                    />
                </div>
            </div>

            <div className="flex flex-col py-6 px-10 w-[448px]">
                <div className="mx-auto w-full max-w-md flex flex-col h-full text-center">
                    <HabiLogo className="mx-auto" />
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
                    <div className="text-grey-1 text-sm">
                      <p>Redirecting you to the login page in {countdown} seconds. If it doesn't happen automatically, <Link href="/" className="underline text-primary">click here</Link>.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
