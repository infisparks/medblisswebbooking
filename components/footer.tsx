import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      {/* Newsletter section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold font-heading mb-4">Subscribe for Healthy Updates</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Get the latest health tips, package offers, and wellness advice delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-background text-foreground" />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary font-heading">MedBliss</div>
              <p className="text-muted-foreground">
                Your trusted healthcare partner providing comprehensive medical services and health packages across
                India.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Services</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Health Packages
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Lab Tests
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Health Checkups
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Consultations
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Home Collection
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">+91-9999-888-777</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">support@medbliss.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    123 Healthcare Street,
                    <br />
                    Medical District, Delhi 110001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 MedBliss. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
