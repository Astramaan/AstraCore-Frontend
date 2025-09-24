
import SignupForm from "@/components/signup-form";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";

export default function SignupPage({ searchParams }: { searchParams: { [key:string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
       {/* Combined Layout */}
       <div className="flex flex-col md:flex-row overflow-hidden md:rounded-[50px] bg-card text-card-foreground w-full max-w-4xl md:w-[844px] md:h-auto">

          {/* Image Section */}
          <div className="relative w-full h-[250px] shrink-0 md:w-[396px] md:h-auto self-stretch">
            <div className="h-full relative p-4">
              <Image 
                  src="/images/logoimage.png"
                  alt="Astramaan construction site"
                  fill
                  priority
                  className="object-cover rounded-[40px]"
                  data-ai-hint="construction site company building"
              />
            </div>
          </div>
          
          {/* Form Section */}
          <div className="bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] md:mt-0 relative flex flex-col md:py-6 md:pl-6 md:pr-10 md:w-[448px]">
            <div className="mx-auto w-full max-w-md flex flex-col h-full">
              <HabiLogo className="md:mx-auto"/>
              <p className="text-lg text-grey-1 mt-6 md:mt-8 mb-6 md:mb-0">Sign up to manage and grow<br className="md:hidden"/> your projects.</p>
              <div className="mt-0 md:mt-8 flex-grow flex flex-col">
                <SignupForm />
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}
