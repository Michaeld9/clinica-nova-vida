import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Clínica Nova Vida | Fisioterapia e Ortopedia",
  description: "Especialistas em ortopedia e reabilitação avançada. Agende sua consulta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-zinc-950 bg-zinc-50 selection:bg-cyan-700 selection:text-white`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
