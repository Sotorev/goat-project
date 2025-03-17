"use client"

import { useState } from "react"
import { FaRocket, FaCode, FaLaptopCode, FaHeadset } from "react-icons/fa"
import Goat from "./goat"
import { useTheme } from "@/components/context/theme-provider"

// Tech stack icons
import {
    SiReact,
    SiNodedotjs,
    SiAngular,
    SiLaravel,
    SiVuedotjs,
    SiTypescript,
    SiMongodb,
    SiMysql,
    SiPostgresql,
    SiGithub,
    SiHtml5,
    SiDigitalocean,
    SiDocker,
    SiAmazon,
    SiAmazonwebservices,
} from "react-icons/si"

export default function HeroSection() {
    const { isDarkMode } = useTheme()
    const [hoveredTech, setHoveredTech] = useState<string | null>(null)

    // Adjust light intensity based on theme
    const lightIntensity = isDarkMode ? 15 : 60

    const technologies = [
        { icon: <SiNodedotjs />, name: "Node.js" },
        { icon: <SiReact />, name: "React" },
        { icon: <SiAngular />, name: "Angular" },
        { icon: <SiLaravel />, name: "Laravel" },
        { icon: <SiVuedotjs />, name: "Vue.js" },
        { icon: <SiTypescript />, name: "TypeScript" },
        { icon: <SiMongodb />, name: "MongoDB" },
        { icon: <SiMysql />, name: "MySQL" },
        { icon: <SiPostgresql />, name: "PostgreSQL" },
        { icon: <SiAmazonwebservices />, name: "AWS" },
        { icon: <SiGithub />, name: "GitHub" },
        { icon: <SiHtml5 />, name: "HTML/CSS" },
        { icon: <SiDigitalocean />, name: "DigitalOcean" },
        { icon: <SiDocker />, name: "Docker" },
    ]

    return (
        <section className="w-full py-16 lg:py-24 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left content column */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                Bienvenido a{" "}
                                <span className="bg-clip-text text-black dark:text-white">
                                    Aigisoft
                                </span>
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

                        {/* Services */}
                        <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-medium mb-4 flex items-center text-gray-900 dark:text-gray-100">
                                <FaCode className="mr-2 text-[#D35C1A] dark:text-[#D9D813]" />
                                Nuestros servicios
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start">
                                    <div className="mt-0.5 mr-3 text-[#D35C1A] dark:text-[#D9D813]">
                                        <FaLaptopCode size={18} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                        Desarrollo de aplicaciones web y móviles
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <div className="mt-0.5 mr-3 text-[#D35C1A] dark:text-[#D9D813]">
                                        <FaRocket size={18} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">Consultoría en tecnología</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="mt-0.5 mr-3 text-[#D35C1A] dark:text-[#D9D813]">
                                        <FaCode size={18} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                                        Soluciones personalizadas de software
                                    </span>
                                </div>
                                <div className="flex items-start">
                                    <div className="mt-0.5 mr-3 text-[#D35C1A] dark:text-[#D9D813]">
                                        <FaHeadset size={18} />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">Mantenimiento y soporte técnico</span>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Tecnologías:</p>
                            <div className="flex flex-wrap gap-3">
                                {technologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="relative"
                                        onMouseEnter={() => setHoveredTech(tech.name)}
                                        onMouseLeave={() => setHoveredTech(null)}
                                    >
                                        <div className="flex items-center justify-center w-9 h-9 bg-gray-100/80 dark:bg-gray-800/60 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <div className="text-gray-700 dark:text-gray-300">{tech.icon}</div>
                                        </div>
                                        {hoveredTech === tech.name && (
                                            <div className="absolute z-10 -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap">
                                                {tech.name}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="bg-[#D9D813] hover:bg-[#D9D813]/90 text-black font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm hover:shadow">
                                Empieza ahora
                            </button>
                            <button className="border border-[#D35C1A] text-[#D35C1A] hover:bg-[#D35C1A]/10 font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                                Contáctanos
                            </button>
                        </div>
                    </div>

                    {/* 3D Goat model container */}
                    <div className="relative h-[450px] md:h-[500px] lg:h-[550px] w-full rounded-xl overflow-hidden shadow-md">
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:to-black opacity-90"></div>
                        <div className="absolute bottom-0 right-0 w-full h-full opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#D35C1A]/30 to-[#D9D813]/30"></div>
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

