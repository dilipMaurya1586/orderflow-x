// import { useState, useEffect } from 'react'
// import ProductCard from '../components/product/ProductCard'
// import { ProductGridSkeleton } from '../components/common/Skeleton'
// import productService from '../services/product.service'
// import { useCart } from '../hooks/useCart'
// import { useParams, Link } from 'react-router-dom'


// const categoryNames = {
//   fashion: { name: 'Fashion', icon: '👕', description: 'Trendy fashion for men, women & kids' },
//   mobiles: { name: 'Mobiles', icon: '📱', description: 'Latest smartphones & accessories' },
//   beauty: { name: 'Beauty', icon: '💄', description: 'Makeup, skincare & grooming' },
//   electronics: { name: 'Electronics', icon: '💻', description: 'Laptops, audio, cameras & gaming' },
//   home: { name: 'Home & Living', icon: '🏠', description: 'Furniture, decor & kitchen' },
//   appliances: { name: 'Appliances', icon: '🔌', description: 'Kitchen & home appliances' },
//   sports: { name: 'Sports & Fitness', icon: '⚽', description: 'Equipment, apparel & fitness' },
//   books: { name: 'Books', icon: '📚', description: 'Fiction, non-fiction & academic' },
//   furniture: { name: 'Furniture', icon: '🪑', description: 'Living room, bedroom & office' },
//   bikes: { name: 'Bikes', icon: '🚲', description: 'Mountain, road & electric bikes' },
//   toys: { name: 'Toys', icon: '🧸', description: 'Educational & fun toys for kids' }
// }

// export default function CategoryPage() {
//   const { category } = useParams()
//   const [products, setProducts] = useState([])
//   const [filteredProducts, setFilteredProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { addToCart } = useCart()
//   const config = categoryNames[category] || { name: category, icon: '📦', description: '' }

//   useEffect(() => {
//     productService.getAll().then(res => {
//       const filtered = res.data.filter(p =>
//         p.category?.toLowerCase() === category?.toLowerCase()
//       )
//       setProducts(filtered)
//       setFilteredProducts(filtered)
//       setLoading(false)
//     })
//   }, [category])

//   if (loading) return <ProductGridSkeleton />

//   return (
//     <div>
//       {/* Category Header */}
//       <div className="bg-gradient-to-r from-primary to-dark rounded-xl p-8 mb-8 text-white">
//         <h1 className="text-3xl font-bold mb-2">{config.icon} {config.name}</h1>
//         <p className="text-gray-200">{config.description}</p>
//         <p className="text-sm mt-2 text-gray-300">{filteredProducts.length} products available</p>
//       </div>

//       {/* Products Grid */}
//       {filteredProducts.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No products found in {config.name}</p>
//           <Link to="/products" className="text-accent hover:underline mt-2 inline-block">
//             Browse all products →
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredProducts.map(product => (
//             <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import { ProductGridSkeleton } from '../components/common/Skeleton'
import productService from '../services/product.service'
import { useCart } from '../hooks/useCart'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Package } from 'lucide-react'

const categoryNames = {
  fashion: { name: 'Fashion', icon: '👕', description: 'Trendy fashion for men, women & kids', from: 'from-pink-500', to: 'to-rose-400' },
  mobiles: { name: 'Mobiles', icon: '📱', description: 'Latest smartphones & accessories', from: 'from-blue-500', to: 'to-cyan-400' },
  beauty: { name: 'Beauty', icon: '💄', description: 'Makeup, skincare & grooming', from: 'from-purple-500', to: 'to-fuchsia-400' },
  electronics: { name: 'Electronics', icon: '💻', description: 'Laptops, audio, cameras & gaming', from: 'from-indigo-500', to: 'to-blue-400' },
  home: { name: 'Home & Living', icon: '🏠', description: 'Furniture, decor & kitchen', from: 'from-orange-500', to: 'to-amber-400' },
  appliances: { name: 'Appliances', icon: '🔌', description: 'Kitchen & home appliances', from: 'from-teal-500', to: 'to-emerald-400' },
  sports: { name: 'Sports & Fitness', icon: '⚽', description: 'Equipment, apparel & fitness', from: 'from-yellow-500', to: 'to-lime-400' },
  books: { name: 'Books', icon: '📚', description: 'Fiction, non-fiction & academic', from: 'from-amber-500', to: 'to-yellow-400' },
  furniture: { name: 'Furniture', icon: '🪑', description: 'Living room, bedroom & office', from: 'from-stone-500', to: 'to-amber-400' },
  bikes: { name: 'Bikes', icon: '🚲', description: 'Mountain, road & electric bikes', from: 'from-green-500', to: 'to-teal-400' },
  toys: { name: 'Toys', icon: '🧸', description: 'Educational & fun toys for kids', from: 'from-red-400', to: 'to-pink-400' },
}

export default function CategoryPage() {
  const { category } = useParams()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const config = categoryNames[category] || { name: category, icon: '📦', description: '', from: 'from-gray-500', to: 'to-gray-400' }

  useEffect(() => {
    productService.getAll().then(res => {
      const filtered = res.data.filter(p =>
        p.category?.toLowerCase() === category?.toLowerCase()
      )
      setFilteredProducts(filtered)
      setLoading(false)
    })
  }, [category])

  if (loading) return <ProductGridSkeleton />

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={15} />
        All Products
      </Link>

      {/* Category Header Banner */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${config.from} ${config.to} rounded-3xl p-8 mb-8 text-white shadow-xl`}>
        {/* Decorative */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
            {config.icon}
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">{config.name}</h1>
            <p className="text-white/80 text-sm mt-1">{config.description}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Package size={13} className="text-white/70" />
              <span className="text-white/70 text-xs font-medium">{filteredProducts.length} products available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">{config.icon}</div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">No products in {config.name} yet</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse all products →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  )
}