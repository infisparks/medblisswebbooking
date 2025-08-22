"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  Home,
  Building,
} from "lucide-react"
import { mockBookings, type BookingDetails } from "@/lib/data/booking-types"
import { getTestById, getPackageById } from "@/lib/data/tests-database"

export default function MyBookings() {
  const [bookings, setBookings] = useState<BookingDetails[]>([])
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // In a real app, this would fetch from an API
    setBookings(mockBookings)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getBookingTests = (booking: BookingDetails) => {
    const tests = booking.selectedTests.map((id) => getTestById(id)).filter(Boolean)
    const packages = booking.selectedPackages.map((id) => getPackageById(id)).filter(Boolean)
    return { tests, packages }
  }

  if (bookings.length === 0) {
    return (
      <Card className="text-center p-12">
        <div className="space-y-6">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Calendar className="w-12 h-12 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No bookings yet</h2>
            <p className="text-muted-foreground">
              Book your first health test to get started with your wellness journey
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
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{bookings.length}</div>
            <div className="text-sm text-muted-foreground">Total Bookings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {bookings.filter((b) => b.status === "pending" || b.status === "confirmed").length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">
              ₹{bookings.reduce((total, booking) => total + booking.totalAmount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({bookings.filter((b) => b.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confirmed ({bookings.filter((b) => b.status === "confirmed").length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({bookings.filter((b) => b.status === "completed").length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({bookings.filter((b) => b.status === "cancelled").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-6">
              {filteredBookings.map((booking) => {
                const { tests, packages } = getBookingTests(booking)
                return (
                  <Card key={booking.id} className="hover:shadow-md transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          {/* Booking Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-lg">Booking #{booking.id}</h3>
                              <Badge className={`${getStatusColor(booking.status)} border`}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1 capitalize">{booking.status}</span>
                              </Badge>
                              <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                                {booking.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                              </Badge>
                            </div>
                          </div>

                          {/* Appointment Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{formatDate(booking.appointmentDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{booking.appointmentTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {booking.homeCollection ? (
                                <Home className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Building className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span>{booking.homeCollection ? "Home Collection" : "Lab Visit"}</span>
                            </div>
                          </div>

                          {/* Tests & Packages */}
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Selected Items:</div>
                            <div className="flex flex-wrap gap-2">
                              {tests.map((test) => (
                                <Badge key={test?.id} variant="outline" className="text-xs">
                                  {test?.name}
                                </Badge>
                              ))}
                              {packages.map((pkg) => (
                                <Badge key={pkg?.id} variant="secondary" className="text-xs">
                                  {pkg?.name}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Total Amount:</span>
                            <span className="font-bold text-primary text-lg">₹{booking.totalAmount}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 lg:w-48">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                <FileText className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                          </Dialog>

                          {booking.status === "completed" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Download className="w-4 h-4 mr-2" />
                              Download Report
                            </Button>
                          )}

                          {booking.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              Cancel Booking
                            </Button>
                          )}

                          {(booking.status === "confirmed" || booking.status === "pending") && (
                            <Button size="sm" variant="outline">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {filteredBookings.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No {activeTab} bookings found</p>
                    <p className="text-sm">Try selecting a different filter or book a new test</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Booking Details - #{selectedBooking.id}
                  <Badge className={`${getStatusColor(selectedBooking.status)} border`}>
                    {getStatusIcon(selectedBooking.status)}
                    <span className="ml-1 capitalize">{selectedBooking.status}</span>
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h4 className="font-semibold mb-3">Patient Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{selectedBooking.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedBooking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedBooking.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPaymentStatusColor(selectedBooking.paymentStatus)}>
                        {selectedBooking.paymentStatus === "paid" ? "Payment Completed" : "Payment Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address */}
                <div>
                  <h4 className="font-semibold mb-3">Address</h4>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{selectedBooking.address.street}</p>
                      <p>
                        {selectedBooking.address.city}, {selectedBooking.address.state} -{" "}
                        {selectedBooking.address.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Appointment Details */}
                <div>
                  <h4 className="font-semibold mb-3">Appointment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(selectedBooking.appointmentDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedBooking.appointmentTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedBooking.homeCollection ? (
                        <Home className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Building className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span>{selectedBooking.homeCollection ? "Home Collection" : "Lab Visit"}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Selected Tests & Packages */}
                <div>
                  <h4 className="font-semibold mb-3">Selected Tests & Packages</h4>
                  <div className="space-y-3">
                    {(() => {
                      const { tests, packages } = getBookingTests(selectedBooking)
                      return (
                        <>
                          {tests.map((test) => (
                            <div key={test?.id} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <h5 className="font-medium">{test?.name}</h5>
                                <Badge variant="outline" className="mt-1">
                                  Test
                                </Badge>
                              </div>
                              <span className="font-semibold">₹{test?.price}</span>
                            </div>
                          ))}
                          {packages.map((pkg) => (
                            <div key={pkg?.id} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <h5 className="font-medium">{pkg?.name}</h5>
                                <Badge variant="secondary" className="mt-1">
                                  Package
                                </Badge>
                              </div>
                              <span className="font-semibold">₹{pkg?.price}</span>
                            </div>
                          ))}
                        </>
                      )
                    })()}
                  </div>
                </div>

                <Separator />

                {/* Special Instructions */}
                {selectedBooking.specialInstructions && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-3">Special Instructions</h4>
                      <p className="text-sm text-muted-foreground">{selectedBooking.specialInstructions}</p>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Total Amount */}
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{selectedBooking.totalAmount}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {selectedBooking.status === "completed" && (
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  )}
                  {selectedBooking.paymentStatus === "pending" && <Button className="flex-1">Complete Payment</Button>}
                  {(selectedBooking.status === "confirmed" || selectedBooking.status === "pending") && (
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
