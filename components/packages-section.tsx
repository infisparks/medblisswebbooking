"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Check, Star, Heart, Shield, Activity, ArrowRight } from "lucide-react"
import { getFeaturedPackages } from "@/lib/data/tests-database"
import type { CartItem } from "@/lib/data/booking-types"

export default function PackagesSection() {
  const featuredPackages = getFeaturedPackages()

  const packageImages = {
    "basic-health": "/basic-health-checkup.png",
    comprehensive: "/comprehensive-health-package.png",
    executive: "/executive-health-screening.png",
    "women-wellness": "/women-wellness-package.png",
    cardiac: "/cardiac-health-package.png",
    "senior-citizen": "/placeholder.svg",
  }

  const addToCart = (pkg: any) => {
    const cartItem: CartItem = {
      id: pkg.id,
      type: "package",
      name: pkg.name,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
    }

    const savedCart = localStorage.getItem("medbliss-cart")
    const cart = savedCart ? JSON.parse(savedCart) : []

    const exists = cart.find((item: CartItem) => item.id === pkg.id && item.type === "package")
    if (!exists) {
      cart.push(cartItem)
      localStorage.setItem("medbliss-cart", JSON.stringify(cart))
      window.dispatchEvent(new Event("cartUpdated"))
      window.location.href = "/booking"
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Comprehensive Health Packages
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Choose Your Health Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professionally designed health screening packages with comprehensive testing and expert analysis
          </p>
        </div>

        {/* Mobile Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full lg:hidden mb-16"
        >
          <CarouselContent className="-ml-6">
            {featuredPackages.map((pkg) => (
              <CarouselItem key={pkg.id} className="pl-6 md:basis-1/2">
                <Card className="relative bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group h-full flex flex-col overflow-hidden p-0">
                  {pkg.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold shadow-sm">
                        <Star className="w-3 h-3 mr-1.5 fill-current" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="relative h-44 overflow-hidden bg-gray-50">
                    <img
                      src={packageImages[pkg.id as keyof typeof packageImages] || "/placeholder.svg"}
                      alt={pkg.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                        {pkg.category === "Heart Health" || pkg.name.toLowerCase().includes("heart") ? (
                          <Heart className="w-5 h-5 text-red-500" />
                        ) : pkg.category === "Women's Health" || pkg.name.toLowerCase().includes("women") ? (
                          <Shield className="w-5 h-5 text-pink-500" />
                        ) : (
                          <Activity className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3 px-5 pt-5">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</CardTitle>
                    <p className="text-sm text-gray-500 font-medium">{pkg.parameters} comprehensive tests</p>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0 flex-grow px-5 pb-5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                      <span className="text-lg text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 font-semibold">
                        {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">What's Included</h4>
                      <div className="space-y-2 max-h-24 overflow-y-auto">
                        {pkg.includes.slice(0, 6).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className={`w-full py-3 font-semibold transition-all duration-200 group/btn ${
                        pkg.featured
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                      onClick={() => addToCart(pkg)}
                    >
                      Book Package
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white border-gray-200 hover:bg-gray-50" />
          <CarouselNext className="right-2 bg-white border-gray-200 hover:bg-gray-50" />
        </Carousel>

        {/* Desktop Grid */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="relative bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group h-full flex flex-col overflow-hidden p-0"
            >
              {pkg.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold shadow-sm">
                    <Star className="w-3 h-3 mr-1.5 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="relative h-44 overflow-hidden bg-gray-50">
                <img
                  src={packageImages[pkg.id as keyof typeof packageImages] || "/placeholder.svg"}
                  alt={pkg.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                    {pkg.category === "Heart Health" || pkg.name.toLowerCase().includes("heart") ? (
                      <Heart className="w-5 h-5 text-red-500" />
                    ) : pkg.category === "Women's Health" || pkg.name.toLowerCase().includes("women") ? (
                      <Shield className="w-5 h-5 text-pink-500" />
                    ) : (
                      <Activity className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3 px-5 pt-5">
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</CardTitle>
                <p className="text-sm text-gray-500 font-medium">{pkg.parameters} comprehensive tests</p>
              </CardHeader>

              <CardContent className="space-y-4 pt-0 flex-grow px-5 pb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 font-semibold">
                    {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">What's Included</h4>
                  <div className="space-y-2 max-h-24 overflow-y-auto">
                    {pkg.includes.slice(0, 6).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className={`w-full py-3 font-semibold transition-all duration-200 group/btn ${
                    pkg.featured
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                  onClick={() => addToCart(pkg)}
                >
                  Book Package
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 px-8 py-3 bg-transparent"
          >
            <a href="/tests" className="flex items-center gap-2">
              View All Packages & Tests
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
