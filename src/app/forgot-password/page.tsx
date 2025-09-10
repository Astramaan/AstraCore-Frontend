
import SetPasswordForm from "@/components/set-password-form";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";

export default function ForgotPasswordPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Combined Layout */}
      <div className="md:flex md:items-center md:justify-center md:h-screen md:p-4">
        <div className="flex flex-col min-h-screen md:h-auto md:flex-row overflow-hidden md:rounded-[50px] bg-card text-card-foreground md:w-auto">

          {/* Image Section */}
          <div className="relative w-full h-[250px] shrink-0 md:w-[396px] md:h-auto">
            <div className="md:pt-4 md:pl-4 md:pb-4 h-full">
              <Image 
                  src="/images/logoimage.png"
                  alt="Astramaan construction site"
                  fill
                  className="object-cover md:rounded-tl-[40px] md:rounded-bl-[40px]"
                  data-ai-hint="construction site company building"
              />
            </div>
          </div>
          
          {/* Form Section */}
          <div className="flex-grow bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] md:mt-0 relative flex flex-col md:py-6 md:px-10 md:w-[448px]">
            <div className="mx-auto w-full max-w-md flex flex-col h-full">
              <HabiLogo className="md:mx-auto"/>
              <div className="mt-8 flex-grow flex flex-col">
                <SetPasswordForm flow="forgot-password" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
