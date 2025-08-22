import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="md:flex md:min-h-screen md:items-center md:justify-center md:bg-background md:p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-4xl md:overflow-hidden md:rounded-[50px] bg-card text-card-foreground md:border">
        <div className="md:grid md:grid-cols-2">
            <div className="relative h-[33vh] md:h-full min-h-[250px] md:min-h-[480px]">
              <div className="absolute inset-0 p-4 md:p-0">
                  <div className="relative h-full w-full">
                      <Image 
                          src="https://placehold.co/800x1200.png"
                          alt="Abstract blue background"
                          layout="fill"
                          objectFit="cover"
                          className="md:rounded-tl-[40px] md:rounded-bl-[40px]"
                          data-ai-hint="construction site"
                      />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/30 md:hidden">
                          <div className="text-center text-white">
                            <p className="text-lg">Welcome to</p>
                            <h1 className="text-4xl font-bold font-headline">Astramaan</h1>
                          </div>
                       </div>
                  </div>
              </div>
            </div>

            <div className="flex flex-col justify-center py-8 sm:py-12 px-10 md:px-10 bg-card rounded-t-3xl md:rounded-none -mt-8 md:mt-0 relative">
                <div className="mx-auto w-full max-w-md">
                <div className="hidden md:block">
                    <Logo />
                    <h2 className="mt-8 text-lg text-foreground/80 tracking-tight font-body">Log in and let’s get to work on your projects.</h2>
                </div>
                 <div className="md:hidden mb-6">
                    <Logo />
                    <p className="mt-2 text-foreground/80">Log in and let’s get to work on your projects.</p>
                </div>


                <div className="mt-8">
                    <AuthForm />
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
