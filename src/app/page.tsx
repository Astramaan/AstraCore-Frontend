import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background md:flex md:items-center md:justify-center md:p-4">
      {/* Mobile view */}
      <div className="md:hidden">
        <div className="bg-primary h-[30vh] flex items-center justify-center text-white">
           <Logo className="text-white" />
        </div>
        <div className="bg-card rounded-t-3xl -mt-8 px-10 py-8">
            <h2 className="text-lg text-foreground/80 tracking-tight font-body mb-6">Log in and let’s get to work on your projects.</h2>
            <AuthForm />
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block w-full max-w-4xl overflow-hidden rounded-[50px] bg-card text-card-foreground border">
        <div className="grid grid-cols-2">
            <div className="relative h-full min-h-[480px]">
              <div className="absolute inset-0">
                  <div className="relative h-full w-full p-4">
                      <Image 
                          src="https://placehold.co/800x1200.png"
                          alt="Abstract blue background"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-tl-[40px] rounded-bl-[40px]"
                          data-ai-hint="construction site"
                      />
                  </div>
              </div>
            </div>

            <div className="flex flex-col justify-center py-12 px-10">
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