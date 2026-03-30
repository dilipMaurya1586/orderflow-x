// import { Link } from 'react-router-dom'
// import { ShoppingCart, Trash2 } from 'lucide-react'
// import { useWishlist } from '../context/WishlistContext'
// import { useCart } from '../hooks/useCart'
// import { formatPrice } from '../utils/helpers'

// export default function Wishlist() {
//   const { wishlist, removeFromWishlist } = useWishlist()
//   const { addToCart } = useCart()

//   if (!wishlist.length) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-semibold text-gray-600">Your wishlist is empty</h2>
//         <Link to="/products" className="text-accent hover:underline mt-2 inline-block">
//           Start Shopping →
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {wishlist.map(product => (
//           <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
//             <img 
//               src={product.imageUrl || `https://picsum.photos/300/300?random=${product.id}`} 
//               alt={product.productName}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold">{product.productName}</h3>
//               <p className="text-accent font-bold mt-1">{formatPrice(product.price)}</p>
//               <div className="flex gap-2 mt-3">
//                 <button 
//                   onClick={() => addToCart(product)}
//                   className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-1"
//                 >
//                   <ShoppingCart size={16} /> Add to Cart
//                 </button>
//                 <button 
//                   onClick={() => removeFromWishlist(product.id)}
//                   className="p-2 border rounded-lg hover:bg-red-50 transition"
//                 >
//                   <Trash2 size={16} className="text-red-500" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, Heart, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/helpers'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (!wishlist.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-rose-200 flex items-center justify-center mb-6 shadow-lg">
          <Heart size={40} className="text-rose-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
          Save items you love and come back to them anytime
        </p>
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          Start Shopping
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Heart size={26} className="text-rose-500 fill-rose-500" />
            My Wishlist
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <span className="bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-sm font-bold px-4 py-1.5 rounded-full">
          {wishlist.length} Saved
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wishlist.map((product, idx) => (
          <div
            key={product.id}
            className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-52 bg-gray-50 dark:bg-gray-800">
              <img
                src={product.imageUrl || `https://picsum.photos/300/300?random=${product.id}`}
                alt={product.productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 border border-gray-100 dark:border-gray-700"
                title="Remove from wishlist"
              >
                <Heart size={14} className="text-rose-500 fill-rose-500" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 mb-1">
                  {product.productName}
                </h3>
              </Link>
              {product.brand && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{product.brand}</p>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-orange-500">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="group/btn flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-md hover:shadow-orange-200 dark:hover:shadow-orange-900/40 transition-all duration-200"
                >
                  <ShoppingCart size={14} className="group-hover/btn:scale-110 transition-transform duration-200" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-900 transition-all duration-200"
                  title="Remove"
                >
                  <Trash2 size={14} className="text-gray-400 hover:text-red-500 transition-colors duration-200" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}