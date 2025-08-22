import Header from "@/components/header"
import Footer from "@/components/footer"
import BookingForm from "@/components/booking-form"
import Calendar from "@/components/icons/calendar"
import Shield from "@/components/icons/shield"
import Clock from "@/components/icons/clock"
import Users from "@/components/icons/users"
import Award from "@/components/icons/award"

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <div className="py-8 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Calendar className="w-4 h-4" />
              Professional Healthcare Booking
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading text-foreground mb-6 leading-tight">
              Book Your
              <span className="text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
                {" "}
                Health Test
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Schedule your appointment with our professional healthcare team and take control of your health journey
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-16">
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <div className="text-lg lg:text-xl font-bold text-foreground mb-1">100% Safe</div>
              <div className="text-sm text-muted-foreground">Secure & Certified</div>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <div className="text-lg lg:text-xl font-bold text-foreground mb-1">Quick Results</div>
              <div className="text-sm text-muted-foreground">Same Day Reports</div>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <div className="text-lg lg:text-xl font-bold text-foreground mb-1">Expert Team</div>
              <div className="text-sm text-muted-foreground">NABL Certified</div>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Award className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <div className="text-lg lg:text-xl font-bold text-foreground mb-1">50K+ Happy</div>
              <div className="text-sm text-muted-foreground">Customers</div>
            </div>
          </div>

          {/* Booking Form Container */}
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-6 lg:p-8 shadow-2xl">
            <BookingForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
