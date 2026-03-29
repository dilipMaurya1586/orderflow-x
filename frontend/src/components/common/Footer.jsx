import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">
              <span className="text-accent">Order</span>FlowX
            </h3>
            <p className="text-gray-300 text-sm">
              Your one-stop shop for all your needs. Quality products, best prices.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/products" className="hover:text-accent">Shop</Link></li>
              <li><Link to="/orders" className="hover:text-accent">Orders</Link></li>
              <li><Link to="/cart" className="hover:text-accent">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-accent">FAQ</a></li>
              <li><a href="#" className="hover:text-accent">Shipping Info</a></li>
              <li><a href="#" className="hover:text-accent">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@orderflowx.com</li>
              <li>Phone: +91 12345 67890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          &copy; {currentYear} OrderFlowX. All rights reserved.
        </div>
      </div>
    </footer>
  )
}