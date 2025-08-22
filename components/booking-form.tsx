"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, ShoppingCart, Plus, Trash2, Home, CreditCard, CheckCircle, Users } from "lucide-react"
import { getFeaturedTests, getFeaturedPackages } from "@/lib/data/tests-database"
import { timeSlots, type CartItem, type BookingDetails } from "@/lib/data/booking-types"

interface FamilyMember {
  id: string
  name: string
  age: string
  gender: string
  phone: string
  relationship: string
}

interface EnhancedCartItem extends CartItem {
  patientId?: string
  patientName?: string
}

export default function BookingForm() {
  const [cart, setCart] = useState<EnhancedCartItem[]>([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [homeCollection, setHomeCollection] = useState(true)
  const [showAddTests, setShowAddTests] = useState(false)
  const [bookingStep, setBookingStep] = useState<"details" | "confirmation" | "success">("details")

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [selectedPatient, setSelectedPatient] = useState<string>("self")

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    specialInstructions: "",
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("medbliss-cart")
    const savedFamily = localStorage.getItem("familyMembers")
    const savedProfile = localStorage.getItem("userProfile")

    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    if (savedFamily) {
      setFamilyMembers(JSON.parse(savedFamily))
    }
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserProfile(profile)
      // Pre-fill form with user profile data
      setFormData((prev) => ({
        ...prev,
        patientName: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: {
          street: profile.address || "",
          city: "",
          state: "",
          pincode: "",
        },
      }))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("medbliss-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: any, type: "test" | "package", patientId?: string, patientName?: string) => {
    const cartItem: EnhancedCartItem = {
      id: item.id,
      type,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      patientId: patientId || "self",
      patientName: patientName || userProfile?.name || "Self",
    }

    setCart((prev) => {
      const exists = prev.find(
        (cartItem) => cartItem.id === item.id && cartItem.type === type && cartItem.patientId === (patientId || "self"),
      )
      return exists ? prev : [...prev, cartItem]
    })
  }

  const removeFromCart = (id: number, type: "test" | "package", patientId?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.type === type && item.patientId === (patientId || "self"))),
    )
  }

  const assignTestToPatient = (cartIndex: number, patientId: string, patientName: string) => {
    setCart((prev) => prev.map((item, index) => (index === cartIndex ? { ...item, patientId, patientName } : item)))
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const getTotalSavings = () => {
    return cart.reduce((total, item) => total + (item.originalPrice - item.price), 0)
  }

  const getAvailablePatients = () => {
    const patients = [
      { id: "self", name: userProfile?.name || "Self", age: userProfile?.age || "", gender: userProfile?.gender || "" },
    ]

    familyMembers.forEach((member) => {
      patients.push({
        id: member.id,
        name: member.name,
        age: member.age,
        gender: member.gender,
      })
    })

    return patients
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const validateForm = () => {
    return (
      formData.patientName &&
      formData.email &&
      formData.phone &&
      formData.address.street &&
      formData.address.city &&
      formData.address.state &&
      formData.address.pincode &&
      selectedDate &&
      selectedTime &&
      cart.length > 0
    )
  }

  const handleBooking = () => {
    if (!validateForm()) {
      alert("Please fill all required fields")
      return
    }
    setBookingStep("confirmation")
  }

  const confirmBooking = () => {
    const bookingData: Partial<BookingDetails> = {
      id: `BK${Date.now()}`,
      patientName: formData.patientName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      selectedTests: cart.filter((item) => item.type === "test").map((item) => item.id),
      selectedPackages: cart.filter((item) => item.type === "package").map((item) => item.id),
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      totalAmount: getTotalAmount(),
      status: "pending",
      paymentStatus: "pending",
      homeCollection,
      specialInstructions: formData.specialInstructions,
      // Add multi-patient booking details
      patientAssignments: cart.map((item) => ({
        testId: item.id,
        testType: item.type,
        testName: item.name,
        patientId: item.patientId,
        patientName: item.patientName,
        price: item.price,
      })),
    }

    console.log("Multi-patient booking confirmed:", bookingData)
    setBookingStep("success")

    // Clear cart after successful booking
    setTimeout(() => {
      setCart([])
      localStorage.removeItem("medbliss-cart")
    }, 2000)
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const getCartByPatient = () => {
    const grouped: { [key: string]: { patient: any; items: EnhancedCartItem[] } } = {}

    cart.forEach((item) => {
      const patientId = item.patientId || "self"
      if (!grouped[patientId]) {
        const patient = getAvailablePatients().find((p) => p.id === patientId)
        grouped[patientId] = {
          patient: patient || { id: "self", name: "Self", age: "", gender: "" },
          items: [],
        }
      }
      grouped[patientId].items.push(item)
    })

    return grouped
  }

  if (bookingStep === "success") {
    return (
      <Card className="max-w-2xl mx-auto text-center p-8">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Your health test appointment has been successfully booked for multiple patients. You will receive a
              confirmation email shortly.
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Booking ID: <span className="font-mono font-semibold">BK{Date.now()}</span>
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => (window.location.href = "/my-bookings")}>View My Bookings</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/tests")}>
              Book More Tests
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  if (bookingStep === "confirmation") {
    const cartByPatient = getCartByPatient()

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Confirm Your Multi-Patient Booking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Details */}
            <div>
              <h3 className="font-semibold mb-3">Booking Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span> {formData.patientName}
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span> {formData.phone}
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span> {formData.email}
                </div>
                <div>
                  <span className="text-muted-foreground">Collection:</span>{" "}
                  {homeCollection ? "Home Collection" : "Lab Visit"}
                </div>
              </div>
            </div>

            <Separator />

            {/* Address */}
            <div>
              <h3 className="font-semibold mb-3">Address</h3>
              <p className="text-sm text-muted-foreground">
                {formData.address.street}, {formData.address.city}, {formData.address.state} -{" "}
                {formData.address.pincode}
              </p>
            </div>

            <Separator />

            {/* Appointment Details */}
            <div>
              <h3 className="font-semibold mb-3">Appointment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span> {selectedDate}
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span> {selectedTime}
                </div>
              </div>
            </div>

            <Separator />

            {/* Tests by Patient */}
            <div>
              <h3 className="font-semibold mb-3">Tests by Patient</h3>
              <div className="space-y-4">
                {Object.entries(cartByPatient).map(([patientId, { patient, items }]) => (
                  <div key={patientId} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {patient.age && `${patient.age} years`} {patient.gender && `• ${patient.gender}`}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 ml-10">
                      {items.map((item, index) => (
                        <div
                          key={`${item.type}-${item.id}-${index}`}
                          className="flex justify-between items-center text-sm"
                        >
                          <span>{item.name}</span>
                          <span className="font-semibold">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center font-semibold">
                <span>Total Amount</span>
                <span className="text-primary">₹{getTotalAmount()}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>Total Savings</span>
                <span>₹{getTotalSavings()}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setBookingStep("details")} className="flex-1">
                Back to Edit
              </Button>
              <Button onClick={confirmBooking} className="flex-1">
                <CreditCard className="w-4 h-4 mr-2" />
                Confirm & Pay
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const availablePatients = getAvailablePatients()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cart Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Cart ({cart.length} items)
            </span>
            <div className="flex gap-2">
              {availablePatients.length > 1 && (
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Dialog open={showAddTests} onOpenChange={setShowAddTests}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add More Tests
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Tests & Packages</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {availablePatients.length > 1 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Label className="text-sm font-medium mb-2 block">Adding tests for:</Label>
                        <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {availablePatients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id}>
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  <span>{patient.name}</span>
                                  {patient.age && <span className="text-muted-foreground">({patient.age}y)</span>}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Featured Tests */}
                    <div>
                      <h3 className="font-semibold mb-3">Featured Tests</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getFeaturedTests().map((test) => {
                          const selectedPatientData = availablePatients.find((p) => p.id === selectedPatient)
                          const isAdded = cart.some(
                            (item) => item.id === test.id && item.type === "test" && item.patientId === selectedPatient,
                          )

                          return (
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
                                  onClick={() => addToCart(test, "test", selectedPatient, selectedPatientData?.name)}
                                  disabled={isAdded}
                                >
                                  {isAdded ? "Added" : "Add"}
                                </Button>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                    </div>

                    {/* Featured Packages */}
                    <div>
                      <h3 className="font-semibold mb-3">Featured Packages</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getFeaturedPackages().map((pkg) => {
                          const selectedPatientData = availablePatients.find((p) => p.id === selectedPatient)
                          const isAdded = cart.some(
                            (item) =>
                              item.id === pkg.id && item.type === "package" && item.patientId === selectedPatient,
                          )

                          return (
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
                                  onClick={() => addToCart(pkg, "package", selectedPatient, selectedPatientData?.name)}
                                  disabled={isAdded}
                                >
                                  {isAdded ? "Added" : "Add"}
                                </Button>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={() => setShowAddTests(false)}>Done Adding</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
              <Button variant="outline" className="mt-4 bg-transparent" asChild>
                <a href="/tests">Browse Tests & Packages</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(getCartByPatient()).map(([patientId, { patient, items }]) => (
                <div key={patientId} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{patient.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {patient.age && `${patient.age} years`} {patient.gender && `• ${patient.gender}`}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 ml-10">
                    {items.map((item, index) => (
                      <div
                        key={`${item.type}-${item.id}-${item.patientId}-${index}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.type === "test" ? "Test" : "Package"}
                            </Badge>
                            {availablePatients.length > 1 && (
                              <Select
                                value={item.patientId}
                                onValueChange={(newPatientId) => {
                                  const newPatient = availablePatients.find((p) => p.id === newPatientId)
                                  assignTestToPatient(cart.indexOf(item), newPatientId, newPatient?.name || "")
                                }}
                              >
                                <SelectTrigger className="w-32 h-6 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {availablePatients.map((p) => (
                                    <SelectItem key={p.id} value={p.id} className="text-xs">
                                      {p.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-primary">₹{item.price}</div>
                            <div className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id, item.type, item.patientId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Amount</span>
                <span className="text-primary">₹{getTotalAmount()}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>You Save</span>
                <span>₹{getTotalSavings()}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {cart.length > 0 && familyMembers.length === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Book for Family Members</h4>
                <p className="text-sm text-blue-700">Add family members to book tests for multiple people at once.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
              >
                <a href="/profile">Add Family Members</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {cart.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Contact Person Name *</Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  placeholder="Enter contact person's full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter 10-digit phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  placeholder="Any special instructions or medical conditions"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address & Appointment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address & Appointment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange("address.street", e.target.value)}
                  placeholder="House/Flat No., Street Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange("address.city", e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) => handleInputChange("address.state", e.target.value)}
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.address.pincode}
                  onChange={(e) => handleInputChange("address.pincode", e.target.value)}
                  placeholder="6-digit pincode"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Appointment Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                />
              </div>

              <div className="space-y-2">
                <Label>Appointment Time *</Label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      size="sm"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className="text-xs"
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="homeCollection" checked={homeCollection} onCheckedChange={setHomeCollection} />
                <Label htmlFor="homeCollection" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home Collection (Recommended)
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Book Appointment Button */}
      {cart.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold text-primary">₹{getTotalAmount()}</div>
                <div className="text-sm text-green-600">You save ₹{getTotalSavings()}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Booking for {Object.keys(getCartByPatient()).length} patient(s)
                </div>
              </div>
              <Button onClick={handleBooking} disabled={!validateForm()} className="px-8">
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
