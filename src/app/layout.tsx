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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "ISHES - L'excellence de la langue arabe à votre portée",
  description: "Institut de référence à Toulouse. Pédagogie certifiée CECRL pour une maîtrise complète, du niveau débutant à l'expertise.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
