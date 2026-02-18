import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono as Mono } from "next/font/google";
import localFont from "next/font/local";

const mono = Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const lausanne = localFont({
  src: [
    {
      path: "../fonts/TWKLausanne-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/TWKLausanne-400Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/TWKLausanne-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/TWKLausanne-700Italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "rashadphz",
  description: "rashad's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          mono.className,
          mono.variable
        )}
      >
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
