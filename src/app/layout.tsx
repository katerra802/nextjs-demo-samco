'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import { useState, createContext, useContext, ReactNode } from 'react';
import Footer from "@/components/layout/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
interface LanguageContextType {
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'vi'>('vi');

  return (
    <html lang={language}>
      <body>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <Header language={language} setLanguage={setLanguage} />
          <main>{children}</main>
          <Footer language={language} setLanguage={setLanguage} />
        </LanguageContext.Provider>
      </body>
    </html>
  );
}