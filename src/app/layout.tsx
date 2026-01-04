import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
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
  title: "shadcn-password-strength",
  description: "A customizable password strength indicator component for React with multi-language support",
  keywords: ["react", "password", "strength", "indicator", "validation", "shadcn", "tailwind"],
  authors: [{ name: "Samuel Prigent" }],
  openGraph: {
    title: "shadcn-password-strength",
    description: "A customizable password strength indicator component for React",
    type: "website",
  },
};

// Script to apply theme before React hydrates (prevents flash)
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme-storage');
      if (stored) {
        var parsed = JSON.parse(stored);
        if (parsed.state && parsed.state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
