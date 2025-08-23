"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, FlaskConical, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const services = [
  {
    icon: Heart,
    title: "Health Checkups",
    description: "Comprehensive health screenings tailored to your needs with advanced diagnostics.",
    image: "/placeholder.svg?height=300&width=400",
    details:
      "Our health checkups include a range of tests to assess your overall health, identify potential risks, and provide personalized recommendations for a healthier lifestyle. From basic screenings to executive profiles, we offer packages for all age groups.",
    highlight: "Most Popular",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    description: "Accurate and reliable diagnostic testing with quick results and expert analysis.",
    image: "/placeholder.svg?height=300&width=400",
    details:
      "We provide a wide array of laboratory tests, utilizing state-of-the-art technology and experienced professionals to ensure accurate and timely results. Our services cover everything from routine blood work to specialized diagnostic panels, all under strict quality control.",
    highlight: "24h Results",
  },
  {
    icon: Users,
    title: "Family Packages",
    description: "Cost-effective health packages designed for your entire family's wellbeing.",
    image: "/placeholder.svg?height=300&width=400",
    details:
      "Ensure the well-being of your loved ones with our specially designed family health packages. These comprehensive plans offer significant savings and cover essential health checkups and tests for all family members, promoting a healthy lifestyle together.",
    highlight: "Save 40%",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Healthcare Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Your Health, Our
            <span className="text-blue-600 block">Priority</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience world-class healthcare with our comprehensive range of services, designed to keep you and your
            family healthy and thriving.
          </p>
        </div>

        {/* Mobile Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full lg:hidden mb-16">
          <CarouselContent className="-ml-6">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-6 md:basis-1/2">
                <Card className="group relative overflow-hidden rounded-3xl border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full p-0">
                  {/* Highlight Badge */}
                  {service.highlight && (
                    <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {service.highlight}
                    </div>
                  )}

                  {/* Image Section */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-8 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed flex-grow mb-6">{service.description}</p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="group/btn p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold justify-start hover:bg-transparent"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg p-0 rounded-2xl overflow-hidden border-0 shadow-2xl">
                        <div className="p-8">
                          <DialogHeader className="mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                              <service.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-slate-900 mb-3">
                              {service.title}
                            </DialogTitle>
                            <DialogDescription className="text-slate-600 leading-relaxed text-base">
                              {service.details}
                            </DialogDescription>
                          </DialogHeader>
                        </div>
                        <DialogFooter className="bg-slate-50 px-8 py-6 flex flex-col sm:flex-row sm:justify-end gap-3 border-t border-slate-100">
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto rounded-xl bg-transparent">
                              Close
                            </Button>
                          </DialogClose>
                          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl">
                            Book Package
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white" />
          <CarouselNext className="right-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white" />
        </Carousel>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-3xl border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full hover:-translate-y-2 p-0"
            >
              {/* Highlight Badge */}
              {service.highlight && (
                <div className="absolute top-6 right-6 z-10 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {service.highlight}
                </div>
              )}

              {/* Image Section */}
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-8 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed flex-grow mb-6">{service.description}</p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="group/btn p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold justify-start hover:bg-transparent"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg p-0 rounded-2xl overflow-hidden border-0 shadow-2xl">
                    <div className="p-8">
                      <DialogHeader className="mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                          <service.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-slate-900 mb-3">{service.title}</DialogTitle>
                        <DialogDescription className="text-slate-600 leading-relaxed text-base">
                          {service.details}
                        </DialogDescription>
                      </DialogHeader>
                    </div>
                    <DialogFooter className="bg-slate-50 px-8 py-6 flex flex-col sm:flex-row sm:justify-end gap-3 border-t border-slate-100">
                      <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto rounded-xl bg-transparent">
                          Close
                        </Button>
                      </DialogClose>
                      <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl">
                        Book Package
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold group"
          >
            <a href="/tests" className="inline-flex items-center gap-2">
              Explore All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
