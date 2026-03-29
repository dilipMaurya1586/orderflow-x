import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/helpers'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (!wishlist.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">Your wishlist is empty</h2>
        <Link to="/products" className="text-accent hover:underline mt-2 inline-block">
          Start Shopping →
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src={product.imageUrl || `https://picsum.photos/300/300?random=${product.id}`} 
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{product.productName}</h3>
              <p className="text-accent font-bold mt-1">{formatPrice(product.price)}</p>
              <div className="flex gap-2 mt-3">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 border rounded-lg hover:bg-red-50 transition"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}