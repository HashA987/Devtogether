import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AppProvider } from "@/context/AppContext";
import NavBar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevTogather - Job Platform for Tech Professionals",
  description:
    "Find your dream job with DevTogather - a job platform exclusively for tech professionals",
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="grow">{children}</main>
              <Footer />
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
