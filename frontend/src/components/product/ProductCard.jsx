import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { formatPrice } from '../../utils/helpers'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import RatingStars from '../common/RatingStars'
import { useState, useEffect } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { showToast } = useToast()
  const [imageLoaded, setImageLoaded] = useState(false)
  const isWishlisted = isInWishlist(product.id)
  const [rating, setRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)

  const imageUrl = product.imageUrl?.startsWith('http')
    ? product.imageUrl
    : `https://picsum.photos/seed/${product.id}/300/300`

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  useEffect(() => {
    fetch(`/api/reviews/product/${product.id}/rating`)
      .then(res => res.json())
      .then(data => setRating(Number(data) || 0))
      .catch(() => setRating(0))

    fetch(`/api/reviews/product/${product.id}`)
      .then(res => res.json())
      .then(data => setReviewCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setReviewCount(0))
  }, [product.id])

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:shadow-lg transition"
      >
        <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={imageUrl}
            alt={product.productName}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${product.id}/300/300`
              setImageLoaded(true)
            }}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-dark dark:text-white hover:text-accent transition line-clamp-2 min-h-[48px]">
            {product.productName}
          </h3>
        </Link>

        <div className="mt-1">
          <RatingStars rating={rating} totalReviews={reviewCount} size={14} />
        </div>

        <div className="mt-2">
          <span className="text-xl font-bold text-accent">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-1">
          {product.quantity > 10 ? (
            <span className="text-xs text-green-600">In Stock</span>
          ) : product.quantity > 0 ? (
            <span className="text-xs text-orange-500">Only {product.quantity} left</span>
          ) : (
            <span className="text-xs text-red-500">Out of Stock</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.quantity === 0}
          className="mt-3 w-full bg-primary hover:bg-opacity-90 disabled:bg-gray-300 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}