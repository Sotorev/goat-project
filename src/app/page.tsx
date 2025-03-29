"use client";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import GeometricShaders from "@/components/shaders/geometric-shader";
import { useTheme } from "@/components/context/theme-provider";
import About from "@/components/about";
import Services from "@/components/services";
import Benefits from "@/components/benefits";
export default function Home() {
  const { isDarkMode } = useTheme()
  return (
    <div className="relative min-h-screen bg-white dark:bg-black z-20">
      <Header />
      <GeometricShaders isDarkMode={isDarkMode} />
      <main className="pt-32 px-4 sm:px-8 lg:px-12">
        <Hero />
        <About />
        <Services />
        <Benefits />
      </main>
    </div>
  );
}
