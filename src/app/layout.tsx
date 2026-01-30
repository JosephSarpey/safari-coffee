import type { Metadata } from "next";
import { Inter, Josefin_Sans, Nothing_You_Could_Do, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import ClientFeatures from "@/components/layout/ClientFeatures";

const inter = Inter({ subsets: ["latin"] });

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
});

const nothing = Nothing_You_Could_Do({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nothing",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safari-roast.com"),
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${josefin.variable} ${nothing.variable} ${greatVibes.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ClientFeatures />
        <Toaster position="top-center" richColors />
      </body>
    </html >
  );
}
