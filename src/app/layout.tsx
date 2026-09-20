import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "../lib/theme";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { FunkyBlob } from "./components/FunkyBlob";
import { BackButton } from "./components/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fuko — opportunities, without the search",
  description: "Fuko reads every open opportunity and hands you only the few that actually fit you — no searching, no endless lists.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Apply saved theme before first paint to prevent flash */}
      <head />
      <body className="min-h-full flex flex-col bg-paper">
        <ThemeProvider>
          <FunkyBlob />
          <header className="sticky top-0 z-50 bg-paper border-b border-line">
            <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between gap-4">
              <Link
                href="/"
                className="funky-wordmark text-small font-medium text-ink tracking-wide hover:text-accent transition-colors duration-200 shrink-0"
              >
                fuko
              </Link>
              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <Link
                  href="/about"
                  className="text-caption text-ink-faint hover:text-ink-soft transition-colors duration-200"
                >
                  About
                </Link>
              </div>
            </div>
          </header>
          <BackButton />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
