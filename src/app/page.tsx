import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-card text-card-foreground shadow-2xl md:grid md:grid-cols-2">
        
        <div className="relative h-48 md:h-full">
            <Image 
                src="https://placehold.co/800x1200.png"
                alt="Abstract blue background"
                layout="fill"
                objectFit="cover"
                className="hidden md:block"
                data-ai-hint="blue gradient"
            />
            <div 
                className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center p-8 text-center text-primary-foreground md:bg-transparent"
                style={{ backgroundImage: "url('https://placehold.co/800x400.png')" }}
                data-ai-hint="blue gradient"
            >
                <div className="md:hidden absolute inset-0 bg-primary/80"></div>
                <div className="relative z-10">
                    <p className="text-lg">Welcome to</p>
                    <h1 className="mt-2 text-4xl font-bold font-headline">Astramaan</h1>
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="mx-auto w-full max-w-md">
              <div>
                <Logo />
                <p className="mt-4 text-sm text-muted-foreground">
                  Log in and let's get to work on your projects.
                </p>
              </div>

              <div className="mt-8">
                <AuthForm />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
