"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Activity, Shield, Users, Stethoscope, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Heart,
    title: "Health Checkups",
    description: "Comprehensive health screenings",
    image: "/modern-medical-room.png",
  },
  {
    icon: Activity,
    title: "Preventive Care",
    description: "Early detection and prevention",
    image: "/preventive-healthcare-consultation.png",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    description: "Accurate diagnostic testing",
    image: "/modern-medical-lab.png",
  },
  {
    icon: Stethoscope,
    title: "Consultations",
    description: "Expert medical advice",
    image: "/doctor-consultation.png",
  },
  {
    icon: Shield,
    title: "Health Insurance",
    description: "Comprehensive coverage plans",
    image: "/family-healthcare-protection.png",
  },
  {
    icon: Users,
    title: "Family Packages",
    description: "Special rates for families",
    image: "/happy-family-checkup.png",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">Our Healthcare Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to keep you and your family healthy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-primary">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                  <Button variant="ghost" className="mt-4 p-0 h-auto text-primary hover:text-primary/80 font-semibold">
                    Learn More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="btn-primary px-8 py-3">
            <a href="/tests">Explore All Services</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
