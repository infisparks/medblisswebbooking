"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Building2, Heart, Microscope, Stethoscope, Instagram, Youtube } from "lucide-react"

export default function OurLegacySection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [])

  const legacyItems = [
    {
      name: "Medford Hospital",
      type: "Multi-Specialty Hospital",
      icon: Building2,
      description: "Advanced healthcare with state-of-the-art facilities",
      established: "Since 2010",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Gautami Medford NX",
      type: "Super Specialty Hospital",
      icon: Stethoscope,
      description: "Next-generation medical care and treatment",
      established: "Since 2018",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Medzeal Wellness Center",
      type: "Wellness & Preventive Care",
      icon: Heart,
      description: "Holistic wellness and preventive healthcare solutions",
      established: "Since 2020",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Medford Diagnosis Center",
      type: "Advanced Diagnostic Lab",
      icon: Microscope,
      description: "Precision diagnostics with cutting-edge technology",
      established: "Since 2015",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            Our Healthcare Network
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">Legacy</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A trusted healthcare network serving communities with excellence, innovation, and compassionate care across
            multiple specialties.
          </p>
        </div>

        {/* Auto-Scrolling Legacy Cards */}
        <div className="relative">
          <div ref={scrollRef} className="flex gap-6 overflow-x-hidden pb-4" style={{ scrollBehavior: "smooth" }}>
            {/* Duplicate items for seamless loop */}
            {[...legacyItems, ...legacyItems].map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card
                  key={index}
                  className="flex-shrink-0 w-80 lg:w-96 p-6 lg:p-8 hover-lift bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl"
                >
                  <div className="space-y-4">
                    {/* Logo Placeholder & Icon */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground">{item.name}</h3>
                        <p className="text-sm text-primary font-semibold">{item.type}</p>
                        <p className="text-xs text-muted-foreground">{item.established}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">10K+</div>
                        <div className="text-xs text-muted-foreground">Patients Served</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">4.9★</div>
                        <div className="text-xs text-muted-foreground">Patient Rating</div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center mt-12 lg:mt-16">
          <h3 className="text-xl font-bold text-foreground mb-6">Follow Our Journey</h3>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              aria-label="Subscribe to our YouTube channel"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  )
}
