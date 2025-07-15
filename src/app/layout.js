import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ResumeButton from '@/app/components/ResumeButton';
import { ThemeProvider } from "@/context/ThemeContext";
import AssistantWrapper from '@/app/components/AssistantWrapper';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Vishal Singh | Portfolio',
  description: 'Portfolio website of Vishal Singh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* <Navbar />
          <AssistantWrapper></AssistantWrapper> */}
          {/* <ResumeButton></ResumeButton> */}
          <main>{children}</main>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}






