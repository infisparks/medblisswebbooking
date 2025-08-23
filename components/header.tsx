"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Phone, MapPin, Clock, ShoppingCart, User } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("medbliss-cart")
      if (savedCart) {
        const cart = JSON.parse(savedCart)
        setCartCount(cart.length)
      }
    }

    const loadUserProfile = () => {
      const savedProfile = localStorage.getItem("userProfile")
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile))
      }
    }

    // Initial load
    updateCartCount()
    loadUserProfile()

    // Listen for storage changes
    window.addEventListener("storage", updateCartCount)
    window.addEventListener("storage", loadUserProfile)

    // Custom event for cart updates within the same tab
    window.addEventListener("cartUpdated", updateCartCount)
    window.addEventListener("profileUpdated", loadUserProfile)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("storage", loadUserProfile)
      window.removeEventListener("cartUpdated", updateCartCount)
      window.removeEventListener("profileUpdated", loadUserProfile)
    }
  }, [])

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+91-9999-888-777</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Near Bypass  Mumbra
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Mon-Sun: 6AM-10PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/">
                <Image src="/img/logo.png" alt="MedBliss Logo" width={220} height={40} priority />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/tests" className="text-foreground hover:text-primary transition-colors">
                Health Packages
              </a>
              <a href="/tests" className="text-foreground hover:text-primary transition-colors">
                Lab Tests
              </a>
              <a href="/product-booking" className="text-foreground hover:text-primary transition-colors">
                Book Tests
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Consultations
              </a>
              <a href="/my-bookings" className="text-foreground hover:text-primary transition-colors">
                My Bookings
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="relative bg-transparent" asChild>
                <a href="/cart">
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </a>
              </Button>
              {userProfile ? (
                <Button variant="outline" className="bg-transparent" asChild>
                  <a href="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {userProfile.name || "Profile"}
                  </a>
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <a href="/login">Login</a>
                </Button>
              )}
              <Button asChild>
                <a href="/booking">Book Now</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </a>
                <a href="/tests" className="text-foreground hover:text-primary transition-colors">
                  Health Packages
                </a>
                <a href="/tests" className="text-foreground hover:text-primary transition-colors">
                  Lab Tests
                </a>
                <a href="/product-booking" className="text-foreground hover:text-primary transition-colors">
                  Book Tests
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Consultations
                </a>
                <a href="/my-bookings" className="text-foreground hover:text-primary transition-colors">
                  My Bookings
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="outline" className="w-full bg-transparent relative" asChild>
                    <a href="/cart">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                      {cartCount > 0 && (
                        <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {cartCount}
                        </Badge>
                      )}
                    </a>
                  </Button>
                  {userProfile ? (
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {userProfile.name || "My Profile"}
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href="/login">Login</a>
                    </Button>
                  )}
                  <Button className="w-full" asChild>
                    <a href="/booking">Book Now</a>
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
