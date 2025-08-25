
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { gilroy } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Astramaan',
  description: 'Project Management for the modern age.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-y-scroll">
      <body className={cn("antialiased font-sans", gilroy.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
