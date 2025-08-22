"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShoppingCart, Trash2, Plus, ArrowRight, ShoppingBag, CreditCard, Shield, Clock } from "lucide-react"
import { getTestById, getPackageById, getFeaturedTests, getFeaturedPackages } from "@/lib/data/tests-database"
import type { CartItem } from "@/lib/data/booking-types"

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("medbliss-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("medbliss-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: any, type: "test" | "package") => {
    const cartItem: CartItem = {
      id: item.id,
      type,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
    }

    setCart((prev) => {
      const exists = prev.find((cartItem) => cartItem.id === item.id && cartItem.type === type)
      return exists ? prev : [...prev, cartItem]
    })
  }

  const removeFromCart = (id: number, type: "test" | "package") => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.type === type)))
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const getTotalSavings = () => {
    return cart.reduce((total, item) => total + (item.originalPrice - item.price), 0)
  }

  const getFinalTotal = () => {
    return getSubtotal() - discount
  }

  const applyPromoCode = () => {
    // Simple promo code logic - in real app, this would be validated on backend
    if (promoCode.toUpperCase() === "HEALTH10") {
      setDiscount(Math.floor(getSubtotal() * 0.1))
    } else if (promoCode.toUpperCase() === "FIRST20") {
      setDiscount(Math.floor(getSubtotal() * 0.2))
    } else {
      alert("Invalid promo code")
    }
  }

  const getItemDetails = (item: CartItem) => {
    if (item.type === "test") {
      return getTestById(item.id)
    } else {
      return getPackageById(item.id)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-12">
          <div className="space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Discover our comprehensive range of health tests and packages to get started
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <a href="/tests">Browse Tests & Packages</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Recommendations for empty cart */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold font-heading mb-6">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFeaturedTests()
              .slice(0, 3)
              .map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-smooth">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{test.name}</h4>
                        <Badge variant="outline" className="mt-1">
                          {test.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{test.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">₹{test.price}</span>
                          <span className="text-sm text-muted-foreground line-through">₹{test.originalPrice}</span>
                        </div>
                        <Button size="sm" onClick={() => addToCart(test, "test")}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Cart Items ({cart.length})
                </span>
                <Dialog open={showRecommendations} onOpenChange={setShowRecommendations}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add More Tests & Packages</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Featured Tests */}
                      <div>
                        <h3 className="font-semibold mb-3">Popular Tests</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {getFeaturedTests().map((test) => (
                            <Card key={test.id} className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{test.name}</h4>
                                <Badge variant="outline">{test.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{test.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-primary">₹{test.price}</span>
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₹{test.originalPrice}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => addToCart(test, "test")}
                                  disabled={cart.some((item) => item.id === test.id && item.type === "test")}
                                >
                                  {cart.some((item) => item.id === test.id && item.type === "test") ? "Added" : "Add"}
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Featured Packages */}
                      <div>
                        <h3 className="font-semibold mb-3">Popular Packages</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {getFeaturedPackages().map((pkg) => (
                            <Card key={pkg.id} className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{pkg.name}</h4>
                                <Badge variant="outline">{pkg.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{pkg.description}</p>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-primary">₹{pkg.price}</span>
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₹{pkg.originalPrice}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => addToCart(pkg, "package")}
                                  disabled={cart.some((item) => item.id === pkg.id && item.type === "package")}
                                >
                                  {cart.some((item) => item.id === pkg.id && item.type === "package") ? "Added" : "Add"}
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => {
                const details = getItemDetails(item)
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="border rounded-lg p-4 hover:shadow-md transition-smooth"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={details?.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <Badge variant="outline" className="mt-1">
                              {item.type === "test" ? "Test" : "Package"}
                            </Badge>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id, item.type)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{details?.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">₹{item.price}</span>
                            <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                            </Badge>
                          </div>
                          {details && "parameters" in details && (
                            <span className="text-sm text-muted-foreground">{details.parameters} tests</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">100% Safe & Secure</h4>
                    <p className="text-sm text-muted-foreground">NABL certified labs</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Quick Reports</h4>
                    <p className="text-sm text-muted-foreground">Same day results</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Easy Payment</h4>
                    <p className="text-sm text-muted-foreground">Multiple payment options</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{getSubtotal()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>You Save</span>
                  <span>-₹{getTotalSavings()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Home Collection</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{getFinalTotal()}</span>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button size="sm" onClick={applyPromoCode} disabled={!promoCode}>
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Try: HEALTH10 or FIRST20</p>
              </div>

              <Button className="w-full" size="lg" asChild>
                <a href="/booking">
                  Proceed to Book
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>

              <div className="text-center">
                <Button variant="link" size="sm" asChild>
                  <a href="/tests">Continue Shopping</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Savings Highlight */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-green-700">
                <h4 className="font-semibold">Great Savings!</h4>
                <p className="text-sm">You're saving ₹{getTotalSavings() + discount} on this order</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
