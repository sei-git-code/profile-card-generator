
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LanguageProvider } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Engineer Portfolio",
  description: "Digital Business Card & Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(outfit.variable, "font-sans antialiased bg-background text-foreground min-h-screen")}>
        <LanguageProvider>
          {children}
          <LanguageSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
