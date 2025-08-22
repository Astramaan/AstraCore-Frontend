
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/logo';
import Image from 'next/image';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PasswordSuccessPage() {
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
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen bg-card p-6 text-center">
        <div className="absolute top-8">
            <Logo />
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

      {/* Desktop view */}
      <div className="hidden md:flex md:items-center md:justify-center md:h-screen md:p-4">
        <div className="w-[844px] h-[539px] overflow-hidden rounded-[50px] bg-card text-card-foreground">
          <div className="grid grid-cols-2 h-full">
              <div className="relative group">
                <div className="p-4 h-full">
                    <div className="relative h-full w-full">
                         <Image 
                            src="https://placehold.co/396x507.png"
                            alt="Abstract green shapes"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-tl-[40px] rounded-bl-[40px]"
                            data-ai-hint="abstract green"
                        />
                    </div>
                </div>
              </div>

              <div className="flex flex-col py-12 px-10">
                  <div className="mx-auto w-full max-w-md flex flex-col h-full text-center">
                      <Logo className="mx-auto" />
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
