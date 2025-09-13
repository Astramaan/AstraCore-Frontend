
import AuthForm from "@/components/auth-form";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";

export default function LoginPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row overflow-hidden rounded-[50px] bg-card text-card-foreground w-full max-w-4xl h-full md:h-auto">
          
          {/* Image Section */}
          <div className="relative w-full h-[323px] shrink-0 md:w-[396px] md:h-auto">
            <div className="h-full relative">
              <Image 
                  src="/images/logoimage.png"
                  alt="Astramaan construction site"
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint="construction site company building"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-grow bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] md:mt-0 relative flex flex-col md:py-6 md:px-10 md:w-[448px]">
            <div className="mx-auto w-full max-w-md flex flex-col h-full">
              <HabiLogo className="md:mx-auto" />
              <p className="text-lg text-grey-1 mt-6 md:mt-8 mb-6 md:mb-0">Log in and let’s get to work on<br className="md:hidden"/> your projects.</p>
              <div className="mt-0 md:mt-8 flex-grow flex flex-col">
                <AuthForm />
              </div>
            </div>
          </div>

        </div>
    </div>
  );
}
