import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Summer Collection 2025</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              Discover our latest products with amazing deals and discounts for the summer season.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/categories/sale">
                <Button size="lg" variant="outline">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-primary/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Product Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {["Clothing", "Electronics", "Home & Garden", "Beauty"].map((category) => (
              <Link
                href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                key={category}
                className="group"
              >
                <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center mb-2 group-hover:bg-muted/80 transition-colors">
                  <span className="text-muted-foreground">{category}</span>
                </div>
                <h3 className="text-sm font-medium text-center">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((product) => (
              <Link href={`/products/${product}`} key={product} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Product Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Product Name {product}</h3>
                    <p className="text-muted-foreground text-sm mb-2">Category</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">$99.99</span>
                      <Button size="sm" variant="secondary">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
