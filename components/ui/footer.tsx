import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">! Wallah Habibi !</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for all your needs. Quality products at affordable prices.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/new" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories/sale" className="text-muted-foreground hover:text-foreground">
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-foreground">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-foreground">
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground hover:text-foreground">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: support@shopease.com</li>
              <li className="text-muted-foreground">Phone: (123) 456-7890</li>
              <li className="text-muted-foreground">Address: 123 Commerce St, City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
