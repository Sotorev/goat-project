"use client"

import Goat from "./goat"
import { useTheme } from "@/components/context/theme-provider"

export default function HeroSection() {
    const { isDarkMode } = useTheme()

    // Adjust light intensity based on theme
    const lightIntensity = isDarkMode ? 15 : 60

    return (
        <section className="w-full py-16 lg:py-24 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#D9D813]">
                         Tu mejor aliado para el desarrollo de software
                        </h1>
                            <p className="text-gray-700 dark:text-gray-300 text-lg">
                                Desarrollamos soluciones de software a medida para
                                <span className="font-medium text-[#D35C1A] dark:text-[#D9D813]"> transformar ideas </span>
                                en
                                <span className="font-medium text-[#D35C1A] dark:text-[#D9D813]">
                                    {" "}
                                    experiencias digitales excepcionales
                                </span>
                                .
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="bg-[#D9D813] hover:bg-[#D9D813]/90 text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow hover:cursor-pointer">
                              Empieza ahora
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[450px] md:h-[500px] lg:h-[550px] w-full  overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b  dark:from-black dark:to-black opacity-90"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-tr" ></div>
                        </div>
                        <Goat
                            scale={4.5}
                            position={[0, -0.5, 0]}
                            lightIntensity={lightIntensity}
                            rotationSpeed={0.003}
                            rotationLimit={Math.PI / 4}
                            lightColor="white"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

