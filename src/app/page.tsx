import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[50px] bg-card text-card-foreground border">
        <div className="md:grid md:grid-cols-2">
            <div className="relative hidden h-full min-h-[480px] md:block">
              <div className="absolute inset-0 p-4">
                  <div className="relative h-full w-full">
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

            <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="mx-auto w-full max-w-md">
                <div>
                    <Logo />
                    <h2 className="mt-8 text-lg text-foreground/80 tracking-tight font-body">Log in and let’s get to work on your projects.</h2>
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
