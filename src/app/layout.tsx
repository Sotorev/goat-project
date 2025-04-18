import type { Metadata } from "next";
import { Roboto_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/context/theme-provider";

const roboto = Roboto_Mono({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aigisoft",
  description: "Desarrollamos soluciones de software a medida para impulsar su negocio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${monaSans.className} ${roboto.className} antialiased bg-white dark:bg-black`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
