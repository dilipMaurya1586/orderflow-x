import { useState, useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import { ProductGridSkeleton } from '../components/common/Skeleton'
import productService from '../services/product.service'
import { useCart } from '../hooks/useCart'
import { useParams, Link } from 'react-router-dom'


const categoryNames = {
  fashion: { name: 'Fashion', icon: '👕', description: 'Trendy fashion for men, women & kids' },
  mobiles: { name: 'Mobiles', icon: '📱', description: 'Latest smartphones & accessories' },
  beauty: { name: 'Beauty', icon: '💄', description: 'Makeup, skincare & grooming' },
  electronics: { name: 'Electronics', icon: '💻', description: 'Laptops, audio, cameras & gaming' },
  home: { name: 'Home & Living', icon: '🏠', description: 'Furniture, decor & kitchen' },
  appliances: { name: 'Appliances', icon: '🔌', description: 'Kitchen & home appliances' },
  sports: { name: 'Sports & Fitness', icon: '⚽', description: 'Equipment, apparel & fitness' },
  books: { name: 'Books', icon: '📚', description: 'Fiction, non-fiction & academic' },
  furniture: { name: 'Furniture', icon: '🪑', description: 'Living room, bedroom & office' },
  bikes: { name: 'Bikes', icon: '🚲', description: 'Mountain, road & electric bikes' },
  toys: { name: 'Toys', icon: '🧸', description: 'Educational & fun toys for kids' }
}

export default function CategoryPage() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const config = categoryNames[category] || { name: category, icon: '📦', description: '' }

  useEffect(() => {
    productService.getAll().then(res => {
      const filtered = res.data.filter(p =>
        p.category?.toLowerCase() === category?.toLowerCase()
      )
      setProducts(filtered)
      setFilteredProducts(filtered)
      setLoading(false)
    })
  }, [category])

  if (loading) return <ProductGridSkeleton />

  return (
    <div>
      {/* Category Header */}
      <div className="bg-gradient-to-r from-primary to-dark rounded-xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">{config.icon} {config.name}</h1>
        <p className="text-gray-200">{config.description}</p>
        <p className="text-sm mt-2 text-gray-300">{filteredProducts.length} products available</p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in {config.name}</p>
          <Link to="/products" className="text-accent hover:underline mt-2 inline-block">
            Browse all products →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  )
}