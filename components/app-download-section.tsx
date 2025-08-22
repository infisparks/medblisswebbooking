import { Button } from "@/components/ui/button"
import { Smartphone, Download, Star } from "lucide-react"

export default function AppDownloadSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold font-heading">Download Our App Now</h2>
              <p className="text-lg opacity-90">
                Get instant access to your health reports, book tests, and consult with doctors - all from your mobile
                device.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Book tests and health packages instantly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Access reports and track health progress</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>24/7 customer support and consultations</span>
              </div>
            </div>

            {/* App store buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="flex items-center gap-2">
                <img src="/placeholder.svg?height=24&width=24" alt="Google Play" className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </Button>
              <Button variant="secondary" className="flex items-center gap-2">
                <img src="/placeholder.svg?height=24&width=24" alt="App Store" className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm opacity-90">4.8/5 rating from 10,000+ users</span>
            </div>
          </div>

          {/* Right content - Phone mockup */}
          <div className="relative">
            <div className="relative z-10 max-w-sm mx-auto">
              <img src="/placeholder.svg?height=600&width=300" alt="MedBliss Mobile App" className="w-full" />
            </div>
            {/* Floating elements */}
            <div className="absolute top-10 -left-10 bg-background text-foreground p-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold">50K+</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-20 -right-10 bg-background text-foreground p-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold">4.8★</div>
                  <div className="text-xs text-muted-foreground">App Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
