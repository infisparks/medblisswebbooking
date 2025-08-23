"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Calendar, Play, Star, Shield, Clock, Users, ArrowRight, Sparkles, Heart, Award } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    window.location.href = `/tests?${params.toString()}`
  }

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-primary via-primary/95 to-primary/80">
      <div className="absolute inset-0 bg-[url('/placeholder-loeo1.png')] opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/10"></div>

      <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/8 rounded-full blur-2xl animate-pulse delay-1000 hidden lg:block"></div>

      <div className="absolute top-1/4 right-1/3 animate-float hidden lg:block">
        <div className="w-10 h-10 bg-white/8 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl">
          <Heart className="w-5 h-5 text-white/70" />
        </div>
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float delay-1000 hidden lg:block">
        <div className="w-8 h-8 bg-accent/15 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-xl">
          <Sparkles className="w-4 h-4 text-white/70" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-8 lg:py-16">
          <div className="space-y-6 lg:space-y-8 text-white order-2 lg:order-1">
            {/* Main Heading */}
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="block text-transparent bg-gradient-to-r from-white via-accent to-white bg-clip-text animate-gradient">
                  Premium Healthcare Services
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 max-w-xl leading-relaxed">
                Experience world-class healthcare with our comprehensive diagnostic services. Book your health checkup
                today and take the first step towards a healthier tomorrow.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-xs lg:text-sm font-semibold text-white/90">Trusted by 50,000+ Users</span>
              <Award className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400" />
            </div>

            {/* Special Offer */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 lg:px-6 lg:py-3 rounded-full lg:hidden">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-accent" />
              <p className="text-base lg:text-lg text-white/70 font-semibold">Premium Health Packages Starting @ ₹99</p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 pt-2 lg:pt-4">
              <div className="flex items-center gap-2 lg:gap-3 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Shield className="w-4 h-4 lg:w-6 lg:h-6 text-white/70" />
                </div>
                <div>
                  <div className="text-xs lg:text-sm font-bold opacity-90">100% Safe</div>
                  <div className="text-xs opacity-70">& Secure</div>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-white/70" />
                </div>
                <div>
                  <div className="text-xs lg:text-sm font-bold opacity-90">Quick Results</div>
                  <div className="text-xs opacity-70">Same Day</div>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Users className="w-4 h-4 lg:w-6 lg:h-6 text-white/70" />
                </div>
                <div>
                  <div className="text-xs lg:text-sm font-bold opacity-90">Expert Team</div>
                  <div className="text-xs opacity-70">NABL Certified</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <Card className="p-6 text-primary-foreground backdrop-blur-md bg-white/95 border border-white/20 shadow-2xl rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">Book Your Health Checkup</h3>
                      <p className="text-sm text-muted-foreground">Quick & easy booking for all your diagnostic needs.</p>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="space-y-2">
                      <label htmlFor="search-package" className="text-sm font-semibold text-primary">
                        Select Test or Package
                      </label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          id="search-package"
                          type="text"
                          placeholder="Search for tests, packages..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleSearch} className="flex-1 h-12 text-base group rounded-xl">
                      Find Tests & Packages
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Link href="/login" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full h-12 border-2 border-primary/20 text-primary hover:bg-primary/5 py-3 px-6 text-base font-semibold rounded-xl transition-all duration-300"
                      >
                        Login / Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:hidden pb-8">
              <Card className="p-4 text-primary-foreground backdrop-blur-md bg-white/95 border border-white/20 shadow-2xl rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary">Book Your Health Checkup</h3>
                      <p className="text-xs text-muted-foreground">Quick & easy booking for all your diagnostic needs.</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="search-package-mobile" className="text-sm font-semibold text-primary">
                        Select Test or Package
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          id="search-package-mobile"
                          type="text"
                          placeholder="Search for tests, packages..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 rounded-lg border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button onClick={handleSearch} className="h-10 text-sm group rounded-lg">
                      Find Tests & Packages
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full h-10 border-2 border-primary/20 text-primary hover:bg-primary/5 px-4 text-sm font-semibold rounded-lg transition-all duration-300"
                      >
                        Login / Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="order-1 lg:order-2 hidden lg:block">
            <div className="relative">
              <div className="relative group">
                <img
                  src="/modern-healthcare-hero.png"
                  alt="Professional healthcare team providing comprehensive diagnostic services"
                  className="w-full rounded-3xl shadow-2xl hover-lift transition-all duration-500"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Button
                    size="lg"
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border-2 border-white/40 shadow-2xl transition-all duration-300 hover:scale-110"
                  >
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </Button>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -right-4 card-modern text-foreground p-3 rounded-xl shadow-2xl border border-white/20 hover-lift">
                <div className="text-xl font-bold text-primary">50K+</div>
                <div className="text-xs font-medium text-muted-foreground">Happy Customers</div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs ml-1 font-semibold">4.9</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 card-modern text-foreground p-3 rounded-xl shadow-2xl border border-white/20 hover-lift">
                <div className="text-xl font-bold text-primary">99.9%</div>
                <div className="text-xs font-medium text-muted-foreground">Accuracy Rate</div>
                <div className="flex items-center gap-1 mt-1">
                  <Award className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600 font-semibold">NABL Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}
