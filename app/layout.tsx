import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GridBackground } from "@/components/grid-background";
import { LiquidGlassProvider } from "@/components/ui/liquid/liquid-glass-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glass UI - Component Library",
  description: "A modern, glassmorphic component library inspired by Apple's design language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <LiquidGlassProvider>
            <GridBackground />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </LiquidGlassProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
