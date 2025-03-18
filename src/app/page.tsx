"use client";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import GeometricShaders from "@/components/shaders/geometric-shader";
import { useTheme } from "@/components/context/theme-provider";
export default function Home() {
  const { isDarkMode } = useTheme()
  return (
    <div className="relative min-h-screen bg-white dark:bg-black z-20">
      <Header />
      <GeometricShaders isDarkMode={isDarkMode} />
      <main className="pt-32 px-4 sm:px-8 lg:px-12">
        <Hero />
      </main>
    </div>
  );
}
