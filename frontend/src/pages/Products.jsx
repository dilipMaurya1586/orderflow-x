// import { useState, useEffect } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import ProductGrid from '../components/product/ProductGrid'
// import ProductFilters from '../components/product/ProductFilter'
// import ProductSort from '../components/product/ProductSort'
// import { ProductGridSkeleton } from '../components/common/Skeleton'
// import productService from '../services/product.service'
// import { useCart } from '../hooks/useCart'

// export default function Products() {
//   const [searchParams] = useSearchParams()
//   const [products, setProducts] = useState([])
//   const [filteredProducts, setFilteredProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showFilters, setShowFilters] = useState(true)
//   const { addToCart } = useCart()

//   useEffect(() => {
//     productService.getAll().then(res => {
//       setProducts(res.data)
//       setFilteredProducts(res.data)
//       setLoading(false)
//     })
//   }, [])

//   const handleFilterChange = (filters) => {
//     let filtered = [...products]

//     if (filters.priceRange) {
//       filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
//     }
//     if (filters.brands && filters.brands.length > 0) {
//       filtered = filtered.filter(p => filters.brands.includes(p.brand))
//     }
//     if (filters.ratings && filters.ratings.length > 0) {
//       filtered = filtered.filter(p => (p.rating || 0) >= Math.min(...filters.ratings))
//     }

//     setFilteredProducts(filtered)
//   }

//   const handleSortChange = (sort) => {
//     const sorted = [...filteredProducts]
//     switch (sort) {
//       case 'price_asc':
//         sorted.sort((a, b) => a.price - b.price)
//         break
//       case 'price_desc':
//         sorted.sort((a, b) => b.price - a.price)
//         break
//       case 'rating_desc':
//         sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
//         break
//       default:
//         break
//     }
//     setFilteredProducts(sorted)
//   }

//   if (loading) return <ProductGridSkeleton />

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-dark mb-6">Shop Now</h1>

//       <div className="flex gap-6">
//         {/* Filters Sidebar */}
//         {showFilters && (
//           <div className="w-64 hidden md:block">
//             <ProductFilters onFilterChange={handleFilterChange} />
//           </div>
//         )}

//         {/* Products Section */}
//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-4">
//             <p className="text-gray-500">{filteredProducts.length} products found</p>
//             <div className="flex gap-2">
//               <button onClick={() => setShowFilters(!showFilters)} className="md:hidden p-2 bg-gray-100 rounded">
//                 🔍 Filters
//               </button>
//               <ProductSort onSortChange={handleSortChange} />
//             </div>
//           </div>

//           <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilter'
import ProductSort from '../components/product/ProductSort'
import { ProductGridSkeleton } from '../components/common/Skeleton'
import productService from '../services/product.service'
import { useCart } from '../hooks/useCart'
import { SlidersHorizontal, X, ShoppingBag } from 'lucide-react'

export default function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
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
      case 'price_asc': sorted.sort((a, b) => a.price - b.price); break
      case 'price_desc': sorted.sort((a, b) => b.price - a.price); break
      case 'rating_desc': sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break
      default: break
    }
    setFilteredProducts(sorted)
  }

  if (loading) return <ProductGridSkeleton />

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <ShoppingBag size={26} className="text-orange-500" />
            All Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {filteredProducts.length} products found
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl hover:border-orange-300 hover:text-orange-500 transition-all duration-200 shadow-sm"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
          {/* Desktop filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl hover:border-orange-300 hover:text-orange-500 transition-all duration-200 shadow-sm"
          >
            <SlidersHorizontal size={15} />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <ProductSort onSortChange={handleSortChange} />
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4">
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}
        {showFilters && (
          <div className="w-64 hidden md:block flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden sticky top-6">
              <div className="px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-sm text-gray-800 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-orange-500" />
                  Filters
                </h3>
              </div>
              <div className="p-4">
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">No products found</h3>
              <p className="text-gray-400 dark:text-gray-600 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
          )}
        </div>
      </div>
    </div>
  )
}