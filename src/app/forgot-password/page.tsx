
import SetPasswordForm from "@/components/set-password-form";
import { HabiLogo } from "@/components/habi-logo";
import Image from "next/image";

export default function ForgotPasswordPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile view */}
      <div className="md:hidden flex flex-col min-h-screen">
         <div className="relative w-full h-[250px] shrink-0">
           <Image 
              src="https://placehold.co/430x250.png"
              alt="Abstract blue background"
              fill
              className="object-cover"
              data-ai-hint="construction site"
          />
        </div>
        <div className="flex-grow bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] relative flex flex-col">
            <div className="mb-6">
              <HabiLogo />
            </div>
            <SetPasswordForm flow="forgot-password" />
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
                <div className="mx-auto w-full max-w-md flex flex-col h-full">
                    <HabiLogo />
                    <div className="mt-8 flex-grow flex flex-col">
                      <SetPasswordForm flow="forgot-password" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
