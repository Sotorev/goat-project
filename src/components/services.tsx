"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Páginas Web",
      description:
        "Creamos sitios web modernos, responsive y totalmente personalizados que transforman la presencia digital de tu negocio. Desde landing pages corporativas, sitios web complejos con funcionalidades avanzadas, garantizamos un diseño elegante, una navegación intuitiva y un rendimiento óptimo.",
      cta: "¿Quieres ver cómo podemos elevar tu presencia online? ¡Explora nuestras soluciones web!",
      image: "/placeholder.svg?height=400&width=500",
      alt: "Desarrollo de páginas web modernas",
    },
    {
      id: 2,
      title: "Aplicaciones Móviles",
      description:
        "Desarrollamos aplicaciones móviles innovadoras para iOS y Android que llevan la experiencia de tu marca a la palma de la mano de tus usuarios. Nuestras soluciones móviles combinan diseño intuitivo, rendimiento fluido y funcionalidades personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio.",
      cta: "Descubre cómo una app puede revolucionar tu conexión con los clientes. ¡Transforma tu estrategia móvil!",
      image: "/placeholder.svg?height=400&width=500",
      alt: "Desarrollo de aplicaciones móviles",
    },
    {
      id: 3,
      title: "Aplicaciones Web",
      description:
        "Diseñamos aplicaciones web a medida que optimizan los procesos de tu empresa, mejoran la productividad y soluciones tecnológicas actualizadas.",
      cta: "Potencia tu negocio con aplicaciones web de próxima generación. ¡Conoce más!",
      image: "/placeholder.svg?height=400&width=500",
      alt: "Desarrollo de aplicaciones web",
    },
  ]

  return (
    <section className="w-full py-16 lg:py-24 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section - Alternating sides */}
              <div className={`${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-lg shadow-lg">
                  <Image src={service.image || "/placeholder.svg"} alt={service.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              </div>

              {/* Text Section - Alternating sides */}
              <div className={`space-y-6 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                <h3 className="text-3xl font-bold text-black dark:text-theme-yellow">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
                <div className="pt-2">
                  <p className="text-black dark:text-theme-yellow font-medium flex items-center gap-2 group cursor-pointer">
                    {service.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

