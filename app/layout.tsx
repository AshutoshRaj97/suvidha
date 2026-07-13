import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Suvidha • सुविधा — Your Government Scheme Guide",
  description:
    "Talk to Suvidha in Hindi or English to discover which Indian government welfare schemes you qualify for — PM Kisan, Ayushman Bharat, PM Awas, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-[#070d1f] text-white antialiased">{children}</body>
    </html>
  );
}
