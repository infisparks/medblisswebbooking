import Header from "@/components/header"
import Footer from "@/components/footer"
import CartPage from "@/components/cart-page"

export default function Cart() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-heading text-foreground mb-4">Shopping Cart</h1>
            <p className="text-lg text-muted-foreground">Review your selected tests and packages before booking</p>
          </div>

          <CartPage />
        </div>
      </div>

      <Footer />
    </main>
  )
}
