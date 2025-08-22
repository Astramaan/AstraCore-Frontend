import SignupForm from "@/components/signup-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function SignupPage() {
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
            <p className="text-lg text-grey-1 mb-6">Sign up to manage and grow<br/>your projects.</p>
            <SignupForm />
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex md:items-center md:justify-center md:h-screen md:p-4">
        <div className="overflow-hidden rounded-[50px] bg-card text-card-foreground">
          <div className="grid grid-cols-2 h-full">
            <div className="relative h-full w-full overflow-hidden">
                <div className="pt-4 pl-4 pb-4 h-full">
                    <Image 
                        src="https://placehold.co/396x507.png"
                        alt="Abstract blue background"
                        width={396}
                        height={507}
                        className="w-full h-full object-cover rounded-tl-[40px] rounded-bl-[40px]"
                        data-ai-hint="construction site"
                    />
                </div>
            </div>

            <div className="flex flex-col py-6 px-10">
                <div className="mx-auto w-full max-w-md flex flex-col h-full">
                    <Logo />
                    <h2 className="mt-8 text-lg text-grey-1 tracking-tight font-body">Sign up to manage and grow your projects.</h2>
                    <div className="mt-8 flex-grow flex flex-col">
                        <SignupForm />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
