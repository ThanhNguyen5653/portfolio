import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Duy - Portfolio",
    template: "%s | Duy Nguyen",
  },
  description:
    "Personal portfolio of Duy(Michael) Nguyen, showcasing projects, skills, and certifications in IT and Cybersecurity.",
  keywords: [
    "Duy Nguyen",
    "Michael Nguyen",
    "Portfolio",
    "Cybersecurity",
    "IT",
    "Developer",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Duy Nguyen" }],
  creator: "Duy Nguyen",
  openGraph: {
    title: "Duy - Portfolio",
    description: "Explore the projects and skills of Duy Nguyen.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16 sm:pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
