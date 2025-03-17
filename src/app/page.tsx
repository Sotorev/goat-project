"use client";
import Header from "@/components/header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />

      <main className="pt-32 px-4 sm:px-8 lg:px-12">
        <Hero />
      </main>
    </div>
  );
}
