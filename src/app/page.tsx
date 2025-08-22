import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Logo />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-foreground sm:text-3xl font-headline">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="mt-10">
            <AuthForm />
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-primary/20 to-accent/20" />
        <div 
          className="absolute inset-0 h-full w-full bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://placehold.co/1200x900.png')",
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
          }}
          data-ai-hint="modern architecture"
        />
      </div>
    </div>
  );
}
