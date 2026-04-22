import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ISHES - L'excellence de la langue arabe à votre portée",
  description: "Institut de référence à Toulouse. Pédagogie certifiée CECRL pour une maîtrise complète, du niveau débutant à l'expertise.",
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="fr"
        className={cn("antialiased", "h-full", outfit.variable, "font-sans", geist.variable)}
      >
        <body className="font-sans min-h-full flex flex-col bg-white text-ishes-dark selection:bg-ishes-green selection:text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
