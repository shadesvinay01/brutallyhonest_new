import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import CustomCursor from "@/components/CustomCursor";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-outfit"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://brutallyhonest.ai"),
  title: "Brutally Honest | The Brutal AI Startup Roaster",
  description: "Get the raw, unfiltered truth about your startup idea. Multiple realities, visionary timelines, and brutal feedback for entrepreneurs.",
  keywords: ["startup roast", "AI feedback", "brutally honest", "startup analysis", "venture capital AI", "startup failure check", "entrepreneurship tools"],
  authors: [{ name: "Brutally Honest Team" }],
  openGraph: {
    title: "Brutally Honest | AI Startup Roast",
    description: "Your startup idea is probably bad. We prove it.",
    url: "https://brutallyhonest.ai",
    siteName: "Brutally Honest",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brutally Honest Analysis"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brutally Honest | AI Startup Roast",
    description: "The raw truth about your startup idea.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} ${inter.variable} font-sans bg-black text-white antialiased selection:bg-gold selection:text-black`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
