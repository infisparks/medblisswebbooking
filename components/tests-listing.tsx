"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter, ShoppingCart, Clock, FlaskConical, Star, Info, Calendar, Users } from "lucide-react"
import {
  bloodTests,
  healthPackages,
  testCategories,
  packageCategories,
  type BloodTest,
  type HealthPackage,
} from "@/lib/data/tests-database"
import type { CartItem } from "@/lib/data/booking-types"

export default function TestsListing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTestCategory, setSelectedTestCategory] = useState("All Tests")
  const [selectedPackageCategory, setSelectedPackageCategory] = useState("All Packages")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedItem, setSelectedItem] = useState<BloodTest | HealthPackage | null>(null)

  const filteredTests = bloodTests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedTestCategory === "All Tests" || test.category === selectedTestCategory
    return matchesSearch && matchesCategory
  })

  const filteredPackages = healthPackages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedPackageCategory === "All Packages" || pkg.category === selectedPackageCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (item: BloodTest | HealthPackage, type: "test" | "package") => {
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

  const isInCart = (id: number, type: "test" | "package") => {
    return cart.some((item) => item.id === id && item.type === type)
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const TestCard = ({ test }: { test: BloodTest }) => (
    <Card className="overflow-hidden hover:shadow-strong transition-smooth group">
      <div className="relative">
        <img
          src={test.image || "/placeholder.svg"}
          alt={test.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100)}% OFF
        </Badge>
        {test.featured && (
          <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-900">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-tight">{test.name}</CardTitle>
          <Badge variant="outline" className="ml-2 shrink-0">
            {test.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{test.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{test.reportTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <FlaskConical className="w-3 h-3" />
            <span>{test.parameters} tests</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{test.fasting ? "Fasting" : "No fasting"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>{test.sampleType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">₹{test.price}</span>
              <span className="text-sm text-muted-foreground line-through">₹{test.originalPrice}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedItem(test)}>
                  <Info className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button
              onClick={() => (isInCart(test.id, "test") ? removeFromCart(test.id, "test") : addToCart(test, "test"))}
              variant={isInCart(test.id, "test") ? "secondary" : "default"}
              className="transition-smooth"
            >
              {isInCart(test.id, "test") ? "Remove" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const PackageCard = ({ pkg }: { pkg: HealthPackage }) => (
    <Card className="overflow-hidden hover:shadow-strong transition-smooth group">
      <div className="relative">
        <img
          src={pkg.image || "/placeholder.svg"}
          alt={pkg.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
        </Badge>
        {pkg.featured && (
          <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-900">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-tight">{pkg.name}</CardTitle>
          <Badge variant="outline" className="ml-2 shrink-0">
            {pkg.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <FlaskConical className="w-3 h-3" />
            <span>{pkg.parameters} tests</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Package</span>
          </div>
          <div className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            <span>Comprehensive</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">₹{pkg.price}</span>
              <span className="text-sm text-muted-foreground line-through">₹{pkg.originalPrice}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedItem(pkg)}>
                  <Info className="w-4 h-4" />
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button
              onClick={() =>
                isInCart(pkg.id, "package") ? removeFromCart(pkg.id, "package") : addToCart(pkg, "package")
              }
              variant={isInCart(pkg.id, "package") ? "secondary" : "default"}
              className="transition-smooth"
            >
              {isInCart(pkg.id, "package") ? "Remove" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card className="p-6 shadow-soft">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tests and packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {cart.length > 0 && (
            <Button className="flex items-center gap-2" asChild>
              <a href="/booking">
                <ShoppingCart className="w-4 h-4" />
                Cart ({cart.length}) - ₹{getTotalAmount()}
              </a>
            </Button>
          )}
        </div>
      </Card>

      {/* Tabs for Tests and Packages */}
      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tests">Blood Tests ({filteredTests.length})</TabsTrigger>
          <TabsTrigger value="packages">Health Packages ({filteredPackages.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-6">
          {/* Test Category Filter */}
          <div className="flex justify-between items-center">
            <Select value={selectedTestCategory} onValueChange={setSelectedTestCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {testCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>

          {filteredTests.length === 0 && (
            <Card className="p-12 text-center">
              <div className="text-muted-foreground">
                <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No tests found matching your criteria</p>
                <p className="text-sm">Try adjusting your search or filter options</p>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          {/* Package Category Filter */}
          <div className="flex justify-between items-center">
            <Select value={selectedPackageCategory} onValueChange={setSelectedPackageCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {packageCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <Card className="p-12 text-center">
              <div className="text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No packages found matching your criteria</p>
                <p className="text-sm">Try adjusting your search or filter options</p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Item Details Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedItem.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.name}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Price</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">₹{selectedItem.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{selectedItem.originalPrice}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <p>{selectedItem.parameters} tests included</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>

                {"includes" in selectedItem && (
                  <div>
                    <h4 className="font-semibold mb-2">What's Included</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedItem.includes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {"preparation" in selectedItem && (
                  <div>
                    <h4 className="font-semibold mb-2">Preparation Instructions</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedItem.preparation.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {"suitableFor" in selectedItem && (
                  <div>
                    <h4 className="font-semibold mb-2">Suitable For</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedItem.suitableFor.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  onClick={() => {
                    const type = "includes" in selectedItem && "suitableFor" in selectedItem ? "package" : "test"
                    if (isInCart(selectedItem.id, type)) {
                      removeFromCart(selectedItem.id, type)
                    } else {
                      addToCart(selectedItem, type)
                    }
                  }}
                  className="w-full"
                >
                  {isInCart(
                    selectedItem.id,
                    "includes" in selectedItem && "suitableFor" in selectedItem ? "package" : "test",
                  )
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
