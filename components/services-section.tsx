"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Activity, Shield, Users, Stethoscope, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const services = [
  {
    icon: Heart,
    title: "Health Checkups",
    description: "Comprehensive health screenings tailored to your needs.",
    image: "/modern-medical-room.png",
    details: "Our health checkups include a range of tests to assess your overall health, identify potential risks, and provide personalized recommendations for a healthier lifestyle. From basic screenings to executive profiles, we offer packages for all age groups.",
  },

  {
    icon: FlaskConical,
    title: "Lab Tests",
    description: "Accurate and reliable diagnostic testing with quick results.",
    image: "/modern-medical-lab.png",
    details: "We provide a wide array of laboratory tests, utilizing state-of-the-art technology and experienced professionals to ensure accurate and timely results. Our services cover everything from routine blood work to specialized diagnostic panels, all under strict quality control.",
  },


  {
    icon: Users,
    title: "Family Packages",
    description: "Cost-effective health packages for your entire family.",
    image: "/happy-family-checkup.png",
    details: "Ensure the well-being of your loved ones with our specially designed family health packages. These comprehensive plans offer significant savings and cover essential health checkups and tests for all family members, promoting a healthy lifestyle together.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultations",
    description: "Expert medical advice from experienced physicians.",
    image: "/doctor-consultation.png",
    details: "Connect with our panel of highly qualified doctors for personalized consultations. Whether you need a general check-up, a second opinion, or advice on managing chronic conditions, our experts are here to guide you towards optimal health.",
  },
  {
    icon: Shield,
    title: "Preventive Care",
    description: "Proactive health management to prevent illness.",
    image: "/preventive-healthcare-consultation.png",
    details: "Our preventive care programs focus on maintaining your health and preventing diseases before they start. Through regular screenings, vaccinations, and lifestyle counseling, we empower you to take control of your health and live a fuller, healthier life.",
  },
  {
    icon: Activity,
    title: "Specialized Treatments",
    description: "Advanced care for specific health conditions.",
    image: "/comprehensive-health-package.png",
    details: "We offer specialized treatment programs for various conditions, combining advanced medical techniques with compassionate care. Our multidisciplinary team works to provide effective and personalized treatment plans, ensuring the best possible outcomes for our patients.",
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

        <ScrollArea className="lg:hidden whitespace-nowrap pb-4">
          <div className="flex space-x-4 pb-1">
            {services.map((service, index) => (
              <Card
                key={index}
                className="w-[280px] flex-shrink-0 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 flex flex-col h-full"
              >
                <CardContent className="p-0 flex flex-col flex-grow">
                  <div className="relative overflow-hidden h-40 flex-shrink-0">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-base mb-1 text-primary group-hover:text-primary-dark transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-xs flex-grow">{service.description}</p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="mt-3 p-0 h-auto text-primary hover:text-primary/80 font-semibold justify-start text-xs"
                        >
                          Learn More →
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] p-0 rounded-lg overflow-hidden">
                        <ScrollArea className="h-[calc(100vh-8rem)] sm:h-[400px]">
                          <div className="p-6">
                            <DialogHeader className="mb-4">
                              <DialogTitle className="text-xl font-bold text-primary mb-2">{service.title}</DialogTitle>
                              <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                                {service.details}
                              </DialogDescription>
                            </DialogHeader>
                            {/* Additional details or images can go here if needed */}
                          </div>
                        </ScrollArea>
                        <DialogFooter className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3 border-t">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                          </DialogClose>
                          <Button className="w-full sm:w-auto">Book Package</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 flex flex-col h-full"
            >
              <CardContent className="p-0 flex flex-col flex-grow">
                <div className="relative overflow-hidden h-48 flex-shrink-0">
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

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-primary-dark transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm flex-grow">{service.description}</p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="mt-4 p-0 h-auto text-primary hover:text-primary/80 font-semibold justify-start">
                        Learn More →
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-0 rounded-lg overflow-hidden">
                      <ScrollArea className="h-[calc(100vh-8rem)] sm:h-[400px]">
                        <div className="p-6">
                          <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-bold text-primary mb-2">{service.title}</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                              {service.details}
                            </DialogDescription>
                          </DialogHeader>
                          {/* Additional details or images can go here if needed */}
                        </div>
                      </ScrollArea>
                      <DialogFooter className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3 border-t">
                        <DialogClose asChild>
                          <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                        </DialogClose>
                        <Button className="w-full sm:w-auto">Book Package</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
