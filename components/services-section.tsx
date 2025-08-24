"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

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
]

export default function ServicesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4 text-gray-900">Our Healthcare Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to keep you and your family healthy.
          </p>
        </div>

        {/* Mobile Carousel */}
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full lg:hidden"
        >
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2">
                <Card className="group flex flex-col h-full overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4 bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="mt-4 p-0 h-auto text-primary hover:text-primary/80 font-medium justify-start"
                        >
                          Learn More →
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] p-0 rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-6">
                          <DialogHeader className="mb-4">
                            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">{service.title}</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                              {service.details}
                            </DialogDescription>
                          </DialogHeader>
                        </div>
                        <DialogFooter className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3 border-t">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                          </DialogClose>
                          <Button className="w-full sm:w-auto">Book Package</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full p-0"
            >
              <div className="relative w-full h-52">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-[1.5rem] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-grow">{service.description}</p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="mt-4 p-0 h-auto text-primary hover:text-primary/80 font-semibold justify-start">
                      Learn More →
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] p-0 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-6">
                      <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{service.title}</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                          {service.details}
                        </DialogDescription>
                      </DialogHeader>
                    </div>
                    <DialogFooter className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3 border-t">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                      </DialogClose>
                      <Button className="w-full sm:w-auto">Book Package</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <a href="/tests">Explore All Services</a>
          </Button>
        </div>
      </div>
    </section>
  )
}