import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Star, Truck, RotateCcw, Shield } from 'lucide-react'
import { formatPrice } from '../utils/helpers'
import productService from '../services/product.service'
import reviewService from '../services/review.service'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'
import RatingStars from '../components/common/RatingStars'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    productService.getById(id).then(res => {
      setProduct(res.data)
      setLoading(false)
      loadReviews(res.data.id)
    }).catch(() => navigate('/products'))
  }, [id, navigate])

  const loadReviews = async (productId) => {
    try {
      const [reviewsRes, ratingRes] = await Promise.all([
        reviewService.getReviews(productId),
        reviewService.getAverageRating(productId)
      ])
      setReviews(reviewsRes.data || [])
      setAverageRating(ratingRes.data || 0)
    } catch (err) {
      console.error('Failed to load reviews', err)
    }
  }

  const submitReview = async () => {
    if (!user) {
      alert('Please login to review')
      return
    }
    if (userRating === 0) {
      alert('Please select a rating')
      return
    }
    setSubmitting(true)
    try {
      await reviewService.addReview({
        productId: product.id,
        rating: userRating,
        comment: reviewComment
      })
      setUserRating(0)
      setReviewComment('')
      loadReviews(product.id)
      alert('Review added successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to add review')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader />
  if (!product) return null

  const images = [
    product.imageUrl || `https://picsum.photos/500/500?random=${product.id}`,
    `https://picsum.photos/500/500?random=${product.id + 1}`,
    `https://picsum.photos/500/500?random=${product.id + 2}`,
  ]

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: quantity })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-100 rounded-xl overflow-hidden h-96">
            <img
              src={images[activeImage]}
              alt={product.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${activeImage === idx ? 'border-accent' : 'border-transparent'
                  }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-dark">{product.productName}</h1>
          <p className="text-gray-500 text-sm mt-1">Product Code: {product.productCode}</p>

          {/* Rating */}
          {/* <div className="flex items-center gap-2 mt-2">

            <RatingStars
              rating={userRating}
              size={28}
              interactive={true}   // ✅ IMPORTANT: true for writing reviews
              onRating={(rating) => {
                console.log("Rating selected:", rating)
                setUserRating(rating)
              }}
            />

            <span className="text-sm font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
          </div> */}

          {/* Rating */}
          <div className="flex items-center gap-3 mt-2">

            {/* Average Rating (display only) */}
            <RatingStars
              // rating={averageRating}
              rating={Number(averageRating) || 0}
              size={22}
              interactive={false}
            />

            <span className="text-sm font-semibold">
              {averageRating?.toFixed(1) || 0}
            </span>
            <span className="text-sm text-gray-500">
              ({reviews.length} reviews)
            </span>
          </div>

          {/* User Rating (separate - for giving review) */}
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Your Rating:</p>
            <RatingStars
              rating={userRating}
              size={28}
              interactive={true}
              onRating={(rating) => setUserRating(rating)}
            />
          </div>


          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="ml-2 text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="ml-2 text-green-600 text-sm">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-2">
            {product.quantity > 10 ? (
              <span className="text-green-600">In Stock</span>
            ) : product.quantity > 0 ? (
              <span className="text-orange-500">Only {product.quantity} left</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-gray-600">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              variant="primary"
              className="flex-1"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`px-6 py-2 rounded-lg border transition ${isWishlisted
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'hover:bg-gray-50'
                }`}
            >
              <Heart size={18} className={isWishlisted ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-gray-500" />
              <span className="text-sm">Free delivery on orders above ₹500</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={18} className="text-gray-500" />
              <span className="text-sm">30 days easy returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-gray-500" />
              <span className="text-sm">1 year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>

        {/* Average Rating */}
        <div className="flex items-center gap-3 mb-6">
          <RatingStars rating={averageRating} size={24} />
          <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-500">out of 5</span>
          <span className="text-gray-500 ml-2">({reviews.length} ratings)</span>
        </div>

        {/* Add Review Form */}
        {user && (
          <div className="bg-gray-50 p-5 rounded-xl mb-6">
            <h4 className="font-semibold mb-3">Write a Review</h4>
            <RatingStars
              rating={userRating}
              size={28}
              interactive={true}
              onRating={(rating) => {
                console.log("Rating selected:", rating)
                setUserRating(rating)
              }}
            />
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full p-3 border rounded-lg mt-3 focus:ring-2 focus:ring-accent"
              rows="3"
            />
            <button
              onClick={submitReview}
              disabled={submitting}
              className="mt-3 bg-primary text-white px-5 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={review.rating} size={14} />
                    <span className="font-semibold">{review.userName || review.userEmail}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}