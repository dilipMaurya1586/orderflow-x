import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeroCarousel from '../components/common/HeroCarousel'
import ProductCard from '../components/product/ProductCard'
import { ProductGridSkeleton } from '../components/common/Skeleton'
import productService from '../services/product.service'
import { useCart } from '../hooks/useCart'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    productService.getAll().then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }, [])

  const featuredProducts = products.slice(0, 8)
  const newArrivals = products.slice(0, 4)

  const categories = [
    { name: 'Fashion', icon: '👕', slug: 'fashion', bg: 'bg-pink-100' },
    { name: 'Electronics', icon: '💻', slug: 'electronics', bg: 'bg-blue-100' },
    { name: 'Mobiles', icon: '📱', slug: 'mobiles', bg: 'bg-green-100' },
    { name: 'Beauty', icon: '💄', slug: 'beauty', bg: 'bg-purple-100' },
    { name: 'Home', icon: '🏠', slug: 'home', bg: 'bg-orange-100' },
    { name: 'Sports', icon: '⚽', slug: 'sports', bg: 'bg-yellow-100' },
  ]

  if (loading) return <ProductGridSkeleton />

  return (
    <div>
      <HeroCarousel />

      {/* Category Strip */}
      <div className="mb-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`${cat.bg} rounded-lg p-4 text-center hover:scale-105 transition`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">New Arrivals</h2>
            <Link to="/products" className="text-accent hover:underline text-sm">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-accent hover:underline text-sm">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Offers Banner */}
      <div className="bg-gradient-to-r from-accent to-orange-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">Up to 70% Off</h3>
            <p className="mt-1">On selected items. Limited time offer!</p>
          </div>
          <Link to="/products" className="bg-white text-accent px-6 py-2 rounded-lg font-semibold">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}