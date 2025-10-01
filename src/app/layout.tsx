
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { gilroy } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { UserProvider } from '@/context/user-context';

export const metadata: Metadata = {
  title: 'Astramaan',
  description: 'Project Management for the modern age.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="no-scrollbar md:overflow-y-scroll">
      <body className={cn("antialiased font-sans", gilroy.variable)}>
        <UserProvider>
          {children}
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
