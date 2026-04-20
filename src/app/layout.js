//app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import Head from "next/head";
import AssistantWrapper from "./components/AssistantWrapper";
import BackButton from "./components/common/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://singhvishal.vercel.app"),
  title: "Vishal Singh | Full-Stack Dev | AI Native",
  icons: {
    icon: [
      { url: "/vs.png", sizes: "32x32", type: "image/png" },
      { url: "/vs.png", sizes: "192x192", type: "image/png" },
    ],
  },
  description: "Portfolio website of Vishal Singh",
  openGraph: {
    title: "Vishal Singh | Full-Stack Dev | AI Native",
    description: "Portfolio website of Vishal Singh",
    url: "https://singhvishal.vercel.app/",
    siteName: "Vishal Singh",
    images: ["/preview.webp"], // cleaner
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Singh | Full-Stack Dev | AI Native",
    description: "Portfolio website of Vishal Singh",
    images: ["/preview.webp"], // cleaner
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
        <BackButton></BackButton>
        <AssistantWrapper></AssistantWrapper>
      </body>
    </html>
  );
}
