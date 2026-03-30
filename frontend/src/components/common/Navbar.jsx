import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import { ShoppingCart, User, Menu, X, Search, Heart, Moon, Sun, LogOut} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { darkMode, setDarkMode } = useTheme()

  const categories = [
    { name: 'Fashion', slug: 'fashion' },
    { name: 'Mobiles', slug: 'mobiles' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Home', slug: 'home' },
    { name: 'Appliances', slug: 'appliances' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Books', slug: 'books' },
    { name: 'Furniture', slug: 'furniture' },
    { name: 'Bikes', slug: 'bikes' },
    { name: 'Toys', slug: 'toys' }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="container-custom py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight shrink-0">
            <span className="text-accent">Order</span>FlowX
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search size={20} className="text-gray-400" />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* ✅ Wishlist Icon */}
            {user && (
              <Link to="/wishlist" className="hover:text-accent transition">
                <Heart size={22} />
              </Link>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hover:text-accent transition p-1"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/cart" className="relative hover:text-accent transition">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 hover:text-accent transition"
                >
                  <User size={22} />
                  <span className="hidden md:inline">{user.name}</span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-dark hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-dark hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-dark hover:bg-gray-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      My Wishlist
                    </Link>
                    {user.email === 'admin@orderflowx.com' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-dark hover:bg-gray-100"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 hover:text-accent transition">
                <User size={18} /> Login
              </Link>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 whitespace-nowrap">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="text-sm hover:text-accent transition py-1"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary px-4 py-3">
          {categories.map(cat => (
            <Link key={cat.slug} to={`/category/${cat.slug}`} className="block py-2 hover:text-accent">
              {cat.name}
            </Link>
          ))}
          {user && (
            <>
              <Link to="/wishlist" className="block py-2 hover:text-accent">
                Wishlist
              </Link>
              <Link to="/profile" className="block py-2 hover:text-accent">
                Profile
              </Link>
              <Link to="/orders" className="block py-2 hover:text-accent">
                Orders
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}