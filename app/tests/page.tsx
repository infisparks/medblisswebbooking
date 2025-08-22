import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TestsListing from "@/components/tests-listing"
import { Card } from "@/components/ui/card"

export default function TestsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-heading text-foreground mb-4">Blood Tests & Health Packages</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Choose from our comprehensive range of blood tests and health packages designed for early detection and
              preventive care.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-3 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </Card>
                ))}
              </div>
            }
          >
            <TestsListing />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  )
}
