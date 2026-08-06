import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "ISHES - L'excellence de la langue arabe à votre portée",
  description: "Institut des Sciences Humaines et Spirituelles. Pédagogie certifiée pour une maîtrise complète, du niveau débutant à l'expertise.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { frFR } from "@/lib/clerk-fr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      localization={frFR}
      appearance={{
        layout: {
          logoImageUrl: "/logo.png",
        },
        elements: {
          logoImage: "h-20 sm:h-24 w-auto object-contain",
          logoBox: "flex justify-center w-full mb-6"
        }
      }}
    >
      <html
        lang="fr"
        className={cn("antialiased", "h-full", outfit.variable, "font-sans")}
      >
        <body className="font-sans min-h-full flex flex-col bg-white text-ishes-dark selection:bg-ishes-blue selection:text-white">
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
