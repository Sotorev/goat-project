"use client"

import { useState } from "react"
import { FaRocket, FaCode, FaLaptopCode, FaHeadset, FaGithub, FaReact, FaPython, FaNodeJs, FaAws, FaDigitalOcean, FaDocker, FaAngular, FaLaravel, FaVuejs } from "react-icons/fa"
import { SiTypescript, SiTailwindcss, SiMongodb, SiMysql, SiPostgresql } from "react-icons/si"

export default function HeroSection() {
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    
    return (
        <section className="w-full py-8 md:py-12 lg:py-16 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left content column */}
                    <div className="space-y-6 md:space-y-8 animate-fadeIn">

                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center sm:text-left text-navy-900 dark:text-white leading-tight">
                            Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Aigisoft</span>
                        </h1>
                        
                        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl text-center sm:text-left mb-6">
                            Desarrollamos soluciones de software a medida para <span className="font-semibold">transformar ideas</span> en <span className="font-semibold">experiencias digitales excepcionales</span>.
                        </p>
                        
                        {/* Services */}
                        <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3 flex items-center">
                                <FaCode className="mr-2 text-blue-500" /> Nuestros servicios:
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-start">
                                    <FaLaptopCode className="mr-2 text-blue-500 mt-1" />
                                    <span>Desarrollo de aplicaciones web y móviles</span>
                                </div>
                                <div className="flex items-start">
                                    <FaRocket className="mr-2 text-blue-500 mt-1" />
                                    <span>Consultoría en tecnología</span>
                                </div>
                                <div className="flex items-start">
                                    <FaCode className="mr-2 text-blue-500 mt-1" />
                                    <span>Soluciones personalizadas de software</span>
                                </div>
                                <div className="flex items-start">
                                    <FaHeadset className="mr-2 text-blue-500 mt-1" />
                                    <span>Mantenimiento y soporte técnico</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Tech Stack */}
                        <div className="pt-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tecnologías:</p>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { icon: <FaNodeJs />, name: "Node.js" },
                                    { icon: <FaReact />, name: "React" },
                                    { icon: <FaAngular />, name: "Angular" },
                                    { icon: <FaLaravel />, name: "Laravel" },
                                    { icon: <FaVuejs />, name: "Vue.js" },
                                    { icon: <SiTypescript />, name: "TypeScript" },
                                    { icon: <SiMongodb />, name: "MongoDB" },
                                    { icon: <SiMysql />, name: "MySQL" },
                                    { icon: <SiPostgresql />, name: "PostgreSQL" },
                                    { icon: <FaAws />, name: "AWS" },
                                    { icon: <FaGithub />, name: "GitHub" },
                                    { icon: <FaLaptopCode />, name: "HTML/CSS" },
                                    { icon: <FaDigitalOcean />, name: "DigitalOcean" },
                                    { icon: <FaDocker />, name: "Docker" },
  

                                ].map((tech, index) => (
                                    <div 
                                        key={index}
                                        className="relative flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-all duration-300"
                                        onMouseEnter={() => setHoveredTech(tech.name)}
                                        onMouseLeave={() => setHoveredTech(null)}
                                    >
                                        <div className="text-lg text-gray-700 dark:text-gray-300">{tech.icon}</div>
                                        {hoveredTech === tech.name && (
                                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                {tech.name}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex flex-wrap justify-around py-3 px-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                            {[
                                { value: "1+", label: "Clientes" },
                                { value: "1+", label: "Proyectos" },
                                { value: "99%", label: "Satisfacción" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center px-4">
                                    <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">{stat.value}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button className="px-6 py-3 text-white bg-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1">
                                Empieza ahora!
                            </button>
                            <button className="px-6 py-3 text-blue-600 bg-white dark:bg-transparent border-2 border-blue-500 font-medium rounded-lg shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/30 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1">
                                Contáctanos
                            </button>
                        </div>
                    </div>

                    {/* Espacio para el modelo 3D*/}
                    <div className="relative h-auto w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02] group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 to-purple-600/80 opacity-75 group-hover:opacity-90 transition-opacity"></div>
                        <img 
                            src="https://placehold.co/800x600/2563eb/FFFFFF/png?text=Aigisoft&font=montserrat" 
                            alt="Aigisoft software development" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

