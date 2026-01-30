import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import ChatWidget from "@/components/shared/ChatWidget";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Safari Roast | Awaken the Explorer",
    template: "%s | Safari Roast",
  },
  description: "Experience the best 100% single-origin Kenya coffee. Gourmet, Artisan, and Rich Brew roasts sourced directly from high-altitude farms.",
  keywords: ["coffee", "kenya coffee", "single origin", "safari roast", "specialty coffee"],
  authors: [{ name: "Safari Roast Team" }],
  creator: "Safari Roast",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://safari-roast.com",
    siteName: "Safari Roast",
    title: "Safari Roast | Awaken the Explorer",
    description: "Experience the best 100% single-origin Kenya coffee.",
    images: [
      {
        url: "/images/safari_image_1.jpeg",
        width: 1200,
        height: 630,
        alt: "Safari Roast Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safari Roast | Awaken the Explorer",
    description: "Experience the best 100% single-origin Kenya coffee.",
    images: ["/images/safari_image_1.jpeg"],
  },
  icons: {
    icon: "/images/logo_1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ChatWidget />
        <Toaster position="top-center" richColors />
      </body>
    </html >
  );
}
