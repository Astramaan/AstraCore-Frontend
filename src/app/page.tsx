
import AuthForm from "@/components/auth-form";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";

export default function LoginPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-background md:flex md:items-center md:justify-center md:p-4">
      <div className="flex flex-col min-h-screen md:h-auto md:flex-row overflow-hidden md:rounded-[50px] bg-card text-card-foreground md:max-w-4xl w-full">
          
          {/* Image Section */}
          <div className="relative w-full h-[250px] shrink-0 md:w-[396px] md:h-auto">
            <div className="h-full relative md:pt-4 md:pl-4 md:pb-4">
              <Image 
                  src="/images/logoimage.png"
                  alt="Astramaan construction site"
                  fill
                  priority
                  className="object-cover md:rounded-tl-[40px] md:rounded-bl-[40px]"
                  data-ai-hint="construction site company building"
              />
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-grow bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] md:mt-0 relative flex flex-col md:py-6 md:px-10 md:w-auto">
            <div className="mx-auto w-full max-w-md flex flex-col h-full">
              <HabiLogo className="md:mx-auto" />
              <p className="text-lg text-grey-1 mt-6 md:mt-8">Log in and let’s get to work on your projects.</p>
              <div className="mt-8 flex-grow flex flex-col">
                <AuthForm />
              </div>
            </div>
          </div>

        </div>
    </div>
  );
}
