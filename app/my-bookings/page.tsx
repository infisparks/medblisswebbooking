import Header from "@/components/header"
import Footer from "@/components/footer"
import MyBookings from "@/components/my-bookings"

export default function MyBookingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-heading text-foreground mb-4">My Bookings</h1>
            <p className="text-lg text-muted-foreground">View and manage all your health test appointments</p>
          </div>

          <MyBookings />
        </div>
      </div>

      <Footer />
    </main>
  )
}
