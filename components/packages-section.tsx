"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Check, Star, Heart, Shield, Activity } from "lucide-react"
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
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4 text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
            Popular Health Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated health packages designed for comprehensive care
          </p>
        </div>

        {/* Mobile Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          // ↓↓↓ THIS IS THE FIX: Allow content to overflow the container ↓↓↓
          className="w-full lg:hidden mb-12 overflow-visible"
        >
          {/* ↓↓↓ Padding removed from here to eliminate the gap ↓↓↓ */}
          <CarouselContent className="-ml-4">
            {featuredPackages.map((pkg, index) => (
              <CarouselItem key={`${pkg.id}-${index}`} className="pl-4 md:basis-1/2 pt-4">
                <Card
                  className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col ${
                    pkg.featured ? "ring-2 ring-primary shadow-lg" : "overflow-hidden"
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 text-xs sm:text-sm shadow-lg">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={packageImages[pkg.id as keyof typeof packageImages] || "/placeholder.svg"}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {pkg.category === "Heart Health" || pkg.name.toLowerCase().includes("heart") ? (
                          <Heart className="w-6 h-6 text-white" />
                        ) : pkg.category === "Women's Health" || pkg.name.toLowerCase().includes("women") ? (
                          <Shield className="w-6 h-6 text-white" />
                        ) : (
                          <Activity className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">₹{pkg.price}</span>
                        <span className="text-sm text-white/80 line-through">₹{pkg.originalPrice}</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-500/90 text-white border-0 mt-1">
                        {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="text-center pb-4 flex-grow">
                    <CardTitle className="text-xl font-heading text-primary">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.parameters} Tests Included</p>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0">
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {pkg.includes.slice(0, 6).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full py-3 font-semibold transition-all duration-300 ${
                        pkg.featured
                          ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105"
                          : "hover:shadow-lg hover:scale-105"
                      }`}
                      variant={pkg.featured ? "default" : "outline"}
                      onClick={() => addToCart(pkg)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>

        {/* Desktop Grid */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {featuredPackages.map((pkg, index) => (
            <Card
              key={`${pkg.id}-${index}`}
              className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col ${
                pkg.featured ? "ring-2 ring-primary shadow-lg" : "overflow-hidden"
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 shadow-lg">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={packageImages[pkg.id as keyof typeof packageImages] || "/placeholder.svg"}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {pkg.category === "Heart Health" || pkg.name.toLowerCase().includes("heart") ? (
                      <Heart className="w-6 h-6 text-white" />
                    ) : pkg.category === "Women's Health" || pkg.name.toLowerCase().includes("women") ? (
                      <Shield className="w-6 h-6 text-white" />
                    ) : (
                      <Activity className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">₹{pkg.price}</span>
                    <span className="text-sm text-white/80 line-through">₹{pkg.originalPrice}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/90 text-white border-0 mt-1">
                    {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </div>

              <CardHeader className="text-center pb-4 flex-grow">
                <CardTitle className="text-xl font-heading text-primary">{pkg.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{pkg.parameters} Tests Included</p>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {pkg.includes.slice(0, 6).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    pkg.featured
                      ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105"
                      : "hover:shadow-lg hover:scale-105"
                  }`}
                  variant={pkg.featured ? "default" : "outline"}
                  onClick={() => addToCart(pkg)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="hover:shadow-lg hover:scale-105 transition-all duration-300 bg-transparent"
          >
            <a href="/tests">View All Packages & Tests</a>
          </Button>
        </div>
      </div>
    </section>
  )
}