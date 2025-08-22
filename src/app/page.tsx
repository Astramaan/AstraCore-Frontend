import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile view */}
      <div className="md:hidden flex flex-col h-screen">
        <div className="relative w-full h-[323px] shrink-0">
           <Image 
              src="https://placehold.co/430x323.png"
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
            <p className="text-lg text-grey-1 mb-6">Log in and let’s get to work on<br/>your projects.</p>
            <AuthForm />
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex md:items-center md:justify-center md:h-screen md:p-4">
        <div className="w-[844px] h-[539px] overflow-hidden rounded-[50px] bg-card text-card-foreground">
          <div className="grid grid-cols-2 h-full">
              <div className="relative overflow-hidden">
                 <Image 
                    src="https://placehold.co/800x1200.png"
                    alt="Abstract blue background"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-tl-[40px] rounded-bl-[40px]"
                    data-ai-hint="construction site"
                />
              </div>

              <div className="flex flex-col py-12 px-10">
                  <div className="mx-auto w-full max-w-md flex flex-col h-full">
                      <Logo />
                      <h2 className="mt-8 text-lg text-grey-1 tracking-tight font-body">Log in and let’s get to work on your projects.</h2>
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
