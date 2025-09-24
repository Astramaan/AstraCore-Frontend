
import OtpForm from "@/components/otp-form";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";

export default function OtpVerificationPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Combined Layout */}
      <div className="md:flex md:items-center md:justify-center md:h-screen md:p-4">
        <div className="flex flex-col md:flex-row overflow-hidden md:rounded-[50px] bg-card text-card-foreground md:w-auto">

          {/* Image Section */}
          <div className="relative w-full h-[250px] shrink-0 md:w-[396px] md:h-[507px]">
            <div className="p-4 h-full relative">
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
          <div className="bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] md:mt-0 relative flex flex-col md:py-6 md:px-10 md:w-[448px]">
            <div className="mx-auto w-full max-w-md flex flex-col h-full">
              <HabiLogo className="md:mx-auto"/>
              <div className="mt-8 flex-grow flex flex-col">
                <OtpForm searchParams={searchParams} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
