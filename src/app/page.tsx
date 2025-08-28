
import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LoginPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile view */}
      <div className="md:hidden flex flex-col h-screen">
        <div className="relative w-full h-[323px] shrink-0">
           <Image 
              src="https://placehold.co/430x323.png"
              alt="Abstract blue background"
              fill
              className="object-cover"
              data-ai-hint="construction site"
          />
        </div>
        <div className="flex-grow bg-card rounded-t-[50px] px-4 py-8 -mt-[69px] relative flex flex-col">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-lg text-grey-1 mb-6">Log in and let’s get to work on<br/>your projects.</p>
            <AuthForm />
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
                    <Logo />
                    <h2 className="mt-8 text-lg text-grey-1 tracking-tight">Log in and let’s get to work on your projects.</h2>
                    <div className="mt-8 flex-grow flex flex-col">
                        <AuthForm />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
