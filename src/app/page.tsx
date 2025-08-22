import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 sm:p-6 md:p-8 font-body">
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
                    
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="mx-auto w-full max-w-md">
              <div>
                <Logo />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-foreground sm:text-3xl font-headline">Sign in to your account</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground font-body">
                  Welcome back! Please enter your details.
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
