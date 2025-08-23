"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, Mail, Plus, Minus, ShoppingCart, Shield } from "lucide-react"
import Link from "next/link"
import { bloodTests, healthPackages } from "@/lib/data/tests-database"

export default function ProductBooking() {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    selectedDate: "",
    selectedTime: "",
  })

  const allProducts = [...bloodTests, ...healthPackages]

  const addToCart = (item: any) => {
    const existingItem = selectedItems.find((selected) => selected.id === item.id)
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((selected) =>
          selected.id === item.id ? { ...selected, quantity: selected.quantity + 1 } : selected,
        ),
      )
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, change: number) => {
    setSelectedItems(
      selectedItems
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-primary">Product Booking</h1>
            <p className="text-muted-foreground">Select tests and packages for your health checkup</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-modern p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Available Tests & Packages</h2>
              <div className="grid gap-4">
                {allProducts.map((product) => (
                  <div key={product.id} className="border border-border rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-primary">{product.name}</h3>
                          {product.featured && (
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          )}
                          {product.category === "package" && (
                            <Badge className="text-xs bg-primary/10 text-primary">Package</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {product.duration}
                          </span>
                          {product.category === "blood" && "fasting" in product && (
                            <span className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              {product.fasting}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">₹{product.price}</div>
                        {product.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</div>
                        )}
                        <Button onClick={() => addToCart(product)} size="sm" className="mt-2 gap-2">
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Summary & Details */}
          <div className="space-y-6">
            {/* Cart Summary */}
            <Card className="card-modern p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-primary">Your Cart ({selectedItems.length})</h3>
              </div>

              {selectedItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No items selected</p>
              ) : (
                <div className="space-y-3">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">₹{item.price} each</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Patient Details Form */}
            {selectedItems.length > 0 && (
              <Card className="card-modern p-6">
                <h3 className="text-lg font-bold text-primary mb-4">Patient Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={patientDetails.name}
                        onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 input-modern"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={patientDetails.phone}
                        onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 input-modern"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={patientDetails.email}
                        onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 input-modern"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        placeholder="Enter complete address"
                        value={patientDetails.address}
                        onChange={(e) => setPatientDetails({ ...patientDetails, address: e.target.value })}
                        className="w-full pl-10 pr-3 py-3 input-modern min-h-[80px] resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <input
                          type="date"
                          value={patientDetails.selectedDate}
                          onChange={(e) => setPatientDetails({ ...patientDetails, selectedDate: e.target.value })}
                          min={getMinDate()}
                          className="w-full pl-10 pr-3 py-3 input-modern"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Slot</label>
                      <select
                        value={patientDetails.selectedTime}
                        onChange={(e) => setPatientDetails({ ...patientDetails, selectedTime: e.target.value })}
                        className="w-full px-3 py-3 input-modern"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button className="w-full btn-primary py-3 text-base font-semibold">
                    Confirm Booking - ₹{getTotalPrice()}
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
