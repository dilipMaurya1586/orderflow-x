// import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { ArrowRight, Zap, Shield, Truck } from 'lucide-react'
// import HeroCarousel from '../components/common/HeroCarousel'
// import ProductCard from '../components/product/ProductCard'
// import { ProductGridSkeleton } from '../components/common/Skeleton'
// import productService from '../services/product.service'
// import { useCart } from '../hooks/useCart'

// export default function Home() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { addToCart } = useCart()

//   useEffect(() => {
//     productService.getAll().then(res => {
//       setProducts(res.data)
//       setLoading(false)
//     }).catch(() => setLoading(false))
//   }, [])

//   const featuredProducts = products.slice(0, 8)
//   const newArrivals = products.slice(0, 4)

//   const categories = [
//     { name: 'Fashion', icon: '👕', slug: 'fashion', bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300' },
//     { name: 'Electronics', icon: '💻', slug: 'electronics', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
//     { name: 'Mobiles', icon: '📱', slug: 'mobiles', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
//     { name: 'Beauty', icon: '💄', slug: 'beauty', bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
//     { name: 'Home', icon: '🏠', slug: 'home', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300' },
//     { name: 'Sports', icon: '⚽', slug: 'sports', bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300' },
//   ]

//   const perks = [
//     { icon: <Truck size={22} />, title: 'Free Delivery', desc: 'On orders above ₹499' },
//     { icon: <Shield size={22} />, title: 'Secure Payment', desc: '100% safe & encrypted' },
//     { icon: <Zap size={22} />, title: 'Fast Processing', desc: 'Orders dispatched in 24hrs' },
//   ]

//   if (loading) return <ProductGridSkeleton />

//   return (
//     <div>
//       <HeroCarousel />

//       {/* Perks Bar */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         {perks.map((perk, i) => (
//           <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
//             <div className="text-accent">{perk.icon}</div>
//             <div>
//               <p className="font-semibold text-dark dark:text-white text-sm">{perk.title}</p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">{perk.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Category Strip */}
//       <div className="mb-8">
//         <h2 className="text-xl font-bold mb-4 text-dark dark:text-white">Shop by Category</h2>
//         <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
//           {categories.map(cat => (
//             <Link
//               key={cat.slug}
//               to={`/category/${cat.slug}`}
//               className={`${cat.bg} rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200 shadow-sm`}
//             >
//               <div className="text-3xl mb-2">{cat.icon}</div>
//               <span className={`text-sm font-semibold ${cat.text}`}>{cat.name}</span>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* New Arrivals */}
//       {newArrivals.length > 0 && (
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-dark dark:text-white">🆕 New Arrivals</h2>
//             <Link to="/products" className="flex items-center gap-1 text-accent hover:underline text-sm font-medium">
//               View All <ArrowRight size={14} />
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {newArrivals.map(product => (
//               <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Featured Products */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-dark dark:text-white">⭐ Featured Products</h2>
//           <Link to="/products" className="flex items-center gap-1 text-accent hover:underline text-sm font-medium">
//             View All <ArrowRight size={14} />
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {featuredProducts.map(product => (
//             <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
//           ))}
//         </div>
//       </div>

//       {/* Offers Banner */}
//       <div className="bg-gradient-to-r from-accent to-orange-600 rounded-2xl p-8 text-white shadow-xl">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//           <div>
//             <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">Limited Time</p>
//             <h3 className="text-3xl font-bold">Up to 70% Off 🔥</h3>
//             <p className="mt-1 text-white/80">On selected items. Don't miss out!</p>
//           </div>
//           <Link to="/products" className="bg-white text-accent px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
//             Shop Now →
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowRight, Zap, Shield, Truck, Sparkles } from 'lucide-react'
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
    }).catch(() => setLoading(false))
  }, [])

  const featuredProducts = products.slice(0, 8)
  const newArrivals = products.slice(0, 4)

  const categories = [
    { name: 'Fashion', icon: '👕', slug: 'fashion', from: 'from-pink-500', to: 'to-rose-400', light: 'bg-pink-50 dark:bg-pink-950/40', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-100 dark:border-pink-900/50' },
    { name: 'Electronics', icon: '💻', slug: 'electronics', from: 'from-blue-500', to: 'to-cyan-400', light: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-100 dark:border-blue-900/50' },
    { name: 'Mobiles', icon: '📱', slug: 'mobiles', from: 'from-emerald-500', to: 'to-teal-400', light: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-100 dark:border-emerald-900/50' },
    { name: 'Beauty', icon: '💄', slug: 'beauty', from: 'from-purple-500', to: 'to-fuchsia-400', light: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-100 dark:border-purple-900/50' },
    { name: 'Home', icon: '🏠', slug: 'home', from: 'from-orange-500', to: 'to-amber-400', light: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-100 dark:border-orange-900/50' },
    { name: 'Sports', icon: '⚽', slug: 'sports', from: 'from-yellow-500', to: 'to-lime-400', light: 'bg-yellow-50 dark:bg-yellow-950/40', text: 'text-yellow-700 dark:text-yellow-300', border: 'border-yellow-100 dark:border-yellow-900/50' },
  ]

  const perks = [
    {
      icon: <Truck size={22} />,
      title: 'Free Delivery',
      desc: 'On orders above ₹499',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: <Shield size={22} />,
      title: 'Secure Payment',
      desc: '100% safe & encrypted',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      icon: <Zap size={22} />,
      title: 'Fast Processing',
      desc: 'Orders dispatched in 24hrs',
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ]

  if (loading) return <ProductGridSkeleton />

  return (
    <div className="space-y-10">
      <HeroCarousel />

      {/* Perks Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {perks.map((perk, i) => (
          <div
            key={i}
            className="group flex items-center gap-4 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-11 h-11 rounded-xl ${perk.bg} flex items-center justify-center ${perk.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
              {perk.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white text-sm">{perk.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{perk.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category Strip */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Shop by Category</h2>
          <Link to="/products" className="text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors">
            All Categories <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`group ${cat.light} border ${cat.border} rounded-2xl p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">
                {cat.icon}
              </div>
              <span className={`text-xs font-semibold ${cat.text} block`}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-blue-500">
                <Sparkles size={20} />
              </span>
              New Arrivals
            </h2>
            <Link
              to="/products"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              View All
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>⭐</span> Featured Products
          </h2>
          <Link
            to="/products"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            View All
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      {/* Offers Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-500 to-rose-500 rounded-3xl p-8 text-white shadow-xl shadow-orange-200 dark:shadow-orange-900/30">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Limited Time Offer</p>
            <h3 className="text-4xl font-black tracking-tight">Up to 70% Off 🔥</h3>
            <p className="mt-2 text-white/80 text-sm">On selected items. Don't miss out!</p>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3.5 rounded-2xl font-bold hover:bg-orange-50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            Shop Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  )
}