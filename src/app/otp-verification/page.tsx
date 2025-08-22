import OtpForm from "@/components/otp-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function OtpVerificationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile view */}
      <div className="md:hidden flex flex-col min-h-screen">
         <div className="relative w-full h-[250px] shrink-0">
           <Image 
              src="https://placehold.co/430x250.png"
              alt="Abstract blue background"
              layout="fill"
              objectFit="cover"
              data-ai-hint="construction site"
          />
        </div>
        <div className="flex-grow bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] relative flex flex-col">
            <div className="mb-6">
              <Logo />
            </div>
            <OtpForm />
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex md:items-center md:justify-center md:h-screen md:p-4">
        <div className="w-full max-w-[844px] h-[539px] overflow-hidden rounded-[50px] bg-card text-card-foreground">
          <div className="grid grid-cols-2 h-full">
            <div className="relative h-full w-full overflow-hidden rounded-tl-[40px] rounded-bl-[40px]">
                <Image 
                    src="https://placehold.co/396x507.png"
                    alt="Abstract blue background"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="construction site"
                />
            </div>

            <div className="flex flex-col py-12 px-10">
                <div className="mx-auto w-full max-w-md h-full flex flex-col">
                    <Logo />
                    <div className="mt-8 flex-grow flex flex-col">
                      <OtpForm />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
