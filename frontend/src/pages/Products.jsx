import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilter'
import ProductSort from '../components/product/ProductSort'
import { ProductGridSkeleton } from '../components/common/Skeleton'
import productService from '../services/product.service'
import { useCart } from '../hooks/useCart'

export default function Products() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    productService.getAll().then(res => {
      setProducts(res.data)
      setFilteredProducts(res.data)
      setLoading(false)
    })
  }, [])

  const handleFilterChange = (filters) => {
    let filtered = [...products]

    if (filters.priceRange) {
      filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
    }
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand))
    }
    if (filters.ratings && filters.ratings.length > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= Math.min(...filters.ratings))
    }

    setFilteredProducts(filtered)
  }

  const handleSortChange = (sort) => {
    const sorted = [...filteredProducts]
    switch (sort) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating_desc':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        break
    }
    setFilteredProducts(sorted)
  }

  if (loading) return <ProductGridSkeleton />

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Shop Now</h1>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-64 hidden md:block">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
        )}

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">{filteredProducts.length} products found</p>
            <div className="flex gap-2">
              <button onClick={() => setShowFilters(!showFilters)} className="md:hidden p-2 bg-gray-100 rounded">
                🔍 Filters
              </button>
              <ProductSort onSortChange={handleSortChange} />
            </div>
          </div>

          <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
        </div>
      </div>
    </div>
  )
}