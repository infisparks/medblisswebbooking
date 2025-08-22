"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    age: 34,
    location: "Delhi",
    rating: 5,
    text: "MedBliss made my health checkup so convenient. The home collection service was excellent and reports were accurate.",
    image: "/placeholder.svg?height=80&width=80",
    videoThumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Rajesh Kumar",
    age: 42,
    location: "Mumbai",
    rating: 5,
    text: "Comprehensive health package at an affordable price. The doctors were very professional and explained everything clearly.",
    image: "/placeholder.svg?height=80&width=80",
    videoThumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Anita Patel",
    age: 28,
    location: "Bangalore",
    rating: 5,
    text: "Quick and reliable service. Got my reports within 24 hours and the consultation was very helpful.",
    image: "/placeholder.svg?height=80&width=80",
    videoThumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Vikram Singh",
    age: 38,
    location: "Chennai",
    rating: 5,
    text: "Excellent experience with MedBliss. The family package saved us money and the service was top-notch.",
    image: "/placeholder.svg?height=80&width=80",
    videoThumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">What Our Customers Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from thousands of satisfied customers
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Video thumbnail */}
                  <div className="relative mb-4 group cursor-pointer">
                    <img
                      src={testimonial.videoThumbnail || "/placeholder.svg"}
                      alt={`${testimonial.name} testimonial`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Customer info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Age {testimonial.age}, {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
