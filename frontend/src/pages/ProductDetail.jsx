// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { ShoppingCart, Heart, Star, Truck, RotateCcw, Shield, ChevronLeft } from 'lucide-react'
// import { formatPrice } from '../utils/helpers'
// import productService from '../services/product.service'
// import reviewService from '../services/review.service'
// import Button from '../components/common/Button'
// import Loader from '../components/common/Loader'
// import RatingStars from '../components/common/RatingStars'
// import { useCart } from '../hooks/useCart'
// import { useAuth } from '../hooks/useAuth'
// import { useWishlist } from '../context/WishlistContext'
// import { Link } from 'react-router-dom'

// export default function ProductDetail() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [quantity, setQuantity] = useState(1)
//   const [activeImage, setActiveImage] = useState(0)
//   const [reviews, setReviews] = useState([])
//   const [averageRating, setAverageRating] = useState(0)
//   const [userRating, setUserRating] = useState(0)
//   const [reviewComment, setReviewComment] = useState('')
//   const [submitting, setSubmitting] = useState(false)
//   const [toastMsg, setToastMsg] = useState('')
//   const { addToCart } = useCart()
//   const { user } = useAuth()
//   const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

//   useEffect(() => {
//     productService.getById(id).then(res => {
//       setProduct(res.data)
//       setLoading(false)
//       loadReviews(res.data.id)
//     }).catch(() => navigate('/products'))
//   }, [id, navigate])

//   const loadReviews = async (productId) => {
//     try {
//       const [reviewsRes, ratingRes] = await Promise.all([
//         reviewService.getReviews(productId),
//         reviewService.getAverageRating(productId)
//       ])
//       setReviews(reviewsRes.data || [])
//       setAverageRating(Number(ratingRes.data) || 0)
//     } catch (err) {
//       console.error('Failed to load reviews', err)
//     }
//   }

//   const showToast = (msg) => {
//     setToastMsg(msg)
//     setTimeout(() => setToastMsg(''), 2500)
//   }

//   const submitReview = async () => {
//     if (!user) return showToast('Please login to review')
//     if (userRating === 0) return showToast('Please select a rating')
//     setSubmitting(true)
//     try {
//       await reviewService.addReview({
//         productId: product.id,
//         rating: userRating,
//         comment: reviewComment
//       })
//       setUserRating(0)
//       setReviewComment('')
//       loadReviews(product.id)
//       showToast('Review added! ✅')
//     } catch (err) {
//       showToast('Failed to add review')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (loading) return <Loader />
//   if (!product) return null

//   const isWishlisted = isInWishlist(product.id)

//   const images = [
//     product.imageUrl?.startsWith('http')
//       ? product.imageUrl
//       : `https://picsum.photos/seed/${product.id}/600/600`,
//     `https://picsum.photos/seed/${product.id}a/600/600`,
//     `https://picsum.photos/seed/${product.id}b/600/600`,
//   ]

//   return (
//     <div className="max-w-6xl mx-auto">
//       {/* Toast */}
//       {toastMsg && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-xl z-50 text-sm">
//           {toastMsg}
//         </div>
//       )}

//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-500 hover:text-accent mb-6 transition"
//       >
//         <ChevronLeft size={18} /> Back
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Image Gallery */}
//         <div>
//           <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden h-96 shadow-md">
//             <img
//               src={images[activeImage]}
//               alt={product.productName}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="flex gap-3 mt-4">
//             {images.map((img, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveImage(idx)}
//                 className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
//                   activeImage === idx ? 'border-accent' : 'border-transparent opacity-60'
//                 }`}
//               >
//                 <img src={img} alt="" className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div>
//           <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
//             {product.category || 'Product'}
//           </p>
//           <h1 className="text-2xl font-bold text-dark dark:text-white">{product.productName}</h1>
//           <p className="text-gray-400 text-sm mt-1">Code: {product.productCode}</p>

//           {/* Average Rating */}
//           <div className="flex items-center gap-2 mt-3">
//             <RatingStars rating={averageRating} size={18} interactive={false} />
//             <span className="text-sm font-semibold dark:text-white">{averageRating.toFixed(1)}</span>
//             <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
//           </div>

//           {/* Price */}
//           <div className="mt-4">
//             <span className="text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="ml-3 text-lg text-gray-400 line-through">
//                   {formatPrice(product.originalPrice)}
//                 </span>
//                 <span className="ml-2 text-green-500 text-sm font-medium">
//                   {Math.round((1 - product.price / product.originalPrice) * 100)}% off
//                 </span>
//               </>
//             )}
//           </div>

//           {/* Stock */}
//           <div className="mt-2">
//             {product.quantity > 10 ? (
//               <span className="text-green-500 text-sm font-medium">✓ In Stock</span>
//             ) : product.quantity > 0 ? (
//               <span className="text-orange-500 text-sm">Only {product.quantity} left!</span>
//             ) : (
//               <span className="text-red-500 text-sm">Out of Stock</span>
//             )}
//           </div>

//           {/* Quantity */}
//           <div className="mt-5 flex items-center gap-4">
//             <span className="text-gray-500 dark:text-gray-400 text-sm">Qty:</span>
//             <div className="flex items-center border dark:border-gray-600 rounded-xl overflow-hidden">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg font-bold dark:text-white"
//               >-</button>
//               <span className="px-4 py-2 border-x dark:border-gray-600 dark:text-white">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
//                 className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg font-bold dark:text-white"
//               >+</button>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="mt-5 flex gap-3">
//             <button
//               onClick={() => { addToCart({ ...product, quantity }); showToast('Added to cart! 🛒') }}
//               disabled={product.quantity === 0}
//               className="flex-1 bg-primary hover:bg-opacity-90 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
//             >
//               <ShoppingCart size={18} /> Add to Cart
//             </button>
//             <button
//               onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
//               className={`px-5 py-3 rounded-xl border-2 transition ${
//                 isWishlisted
//                   ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20'
//                   : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//             >
//               <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : 'dark:text-white'} />
//             </button>
//           </div>

//           {/* Perks */}
//           <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3 border dark:border-gray-700">
//             {[
//               { icon: <Truck size={16} />, text: 'Free delivery on orders above ₹500' },
//               { icon: <RotateCcw size={16} />, text: '30 days easy returns' },
//               { icon: <Shield size={16} />, text: '1 year warranty included' },
//             ].map((item, i) => (
//               <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
//                 <span className="text-accent">{item.icon}</span>
//                 {item.text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="mt-14">
//         <h3 className="text-2xl font-bold mb-6 dark:text-white">Customer Reviews</h3>

//         {/* Average Rating Summary */}
//         <div className="flex items-center gap-4 mb-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border dark:border-gray-700">
//           <div className="text-center">
//             <p className="text-5xl font-bold text-accent">{averageRating.toFixed(1)}</p>
//             <RatingStars rating={averageRating} size={16} />
//             <p className="text-xs text-gray-400 mt-1">{reviews.length} ratings</p>
//           </div>
//           <div className="w-px h-16 bg-gray-200 dark:bg-gray-600 mx-4" />
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             {reviews.length === 0
//               ? 'No reviews yet — be the first!'
//               : `Based on ${reviews.length} customer review${reviews.length > 1 ? 's' : ''}`}
//           </p>
//         </div>

//         {/* Write Review */}
//         {user && (
//           <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-6 rounded-2xl mb-8 shadow-sm">
//             <h4 className="font-bold mb-4 dark:text-white">Write a Review</h4>
//             <div className="mb-3">
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your Rating:</p>
//               <RatingStars
//                 rating={userRating}
//                 size={28}
//                 interactive={true}
//                 onRating={(r) => setUserRating(r)}
//               />
//             </div>
//             <textarea
//               value={reviewComment}
//               onChange={(e) => setReviewComment(e.target.value)}
//               placeholder="Share your experience..."
//               className="w-full p-3 border dark:border-gray-600 rounded-xl mt-2 focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:text-white text-sm"
//               rows="3"
//             />
//             <button
//               onClick={submitReview}
//               disabled={submitting}
//               className="mt-3 bg-accent hover:bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold disabled:opacity-50 transition"
//             >
//               {submitting ? 'Submitting...' : 'Submit Review'}
//             </button>
//           </div>
//         )}

//         {/* Reviews List */}
//         <div className="space-y-4">
//           {reviews.length === 0 ? (
//             <p className="text-center text-gray-400 py-10">No reviews yet 🙁</p>
//           ) : (
//             reviews.map(review => (
//               <div key={review.id} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-5 shadow-sm">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
//                       {(review.userName || review.userEmail || 'U')[0].toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-sm dark:text-white">{review.userName || review.userEmail}</p>
//                       <RatingStars rating={review.rating} size={12} />
//                     </div>
//                   </div>
//                   <span className="text-xs text-gray-400">
//                     {new Date(review.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{review.comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Truck, RotateCcw, Shield, ChevronLeft, Star, Package } from 'lucide-react'
import { formatPrice } from '../utils/helpers'
import productService from '../services/product.service'
import reviewService from '../services/review.service'
import Loader from '../components/common/Loader'
import RatingStars from '../components/common/RatingStars'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

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
      setAverageRating(Number(ratingRes.data) || 0)
    } catch { }
  }

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2500)
  }

  const submitReview = async () => {
    if (!user) return showToast('Please login to review')
    if (userRating === 0) return showToast('Please select a rating')
    setSubmitting(true)
    try {
      await reviewService.addReview({ productId: product.id, rating: userRating, comment: reviewComment })
      setUserRating(0)
      setReviewComment('')
      loadReviews(product.id)
      showToast('Review added! ✅')
    } catch {
      showToast('Failed to add review')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader />
  if (!product) return null

  const isWishlisted = isInWishlist(product.id)

  const images = [
    product.imageUrl?.startsWith('http') ? product.imageUrl : `https://picsum.photos/seed/${product.id}/600/600`,
    `https://picsum.photos/seed/${product.id}a/600/600`,
    `https://picsum.photos/seed/${product.id}b/600/600`,
  ]

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const perks = [
    { icon: <Truck size={14} />, text: 'Free delivery on orders above ₹500' },
    { icon: <RotateCcw size={14} />, text: '30 days easy returns' },
    { icon: <Shield size={14} />, text: '1 year warranty included' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 text-sm font-medium border border-gray-700 backdrop-blur-sm">
          {toastMsg}
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium mb-6 transition-colors duration-200"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden aspect-square shadow-sm border border-gray-100 dark:border-gray-800">
            <img
              src={images[activeImage]}
              alt={product.productName}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {discount && (
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                -{discount}% OFF
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  activeImage === idx
                    ? 'border-orange-500 shadow-md shadow-orange-100 dark:shadow-orange-900/30 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          {/* Category & Title */}
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/40 mb-3">
              <Package size={10} />
              {product.category || 'Product'}
            </span>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
              {product.productName}
            </h1>
            {product.brand && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-medium">by {product.brand}</p>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-1 font-mono">Code: {product.productCode}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40 px-3 py-1.5 rounded-full">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-400 dark:text-gray-500">({reviews.length} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-orange-500">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through mb-0.5">{formatPrice(product.originalPrice)}</span>
                <span className="text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full mb-0.5">
                  {discount}% off
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div>
            {product.quantity > 10 ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                In Stock
              </span>
            ) : product.quantity > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-900/40">
                ⚡ Only {product.quantity} left!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full border border-red-100 dark:border-red-900/40">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Quantity:</span>
            <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 font-bold text-lg transition-colors duration-150"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-gray-800 dark:text-white text-sm border-x border-gray-200 dark:border-gray-700 h-10 flex items-center justify-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 font-bold text-lg transition-colors duration-150"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => { addToCart({ ...product, quantity }); showToast('Added to cart! 🛒') }}
              disabled={product.quantity === 0}
              className="group flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200"
            >
              <ShoppingCart size={17} className="group-hover:scale-110 transition-transform duration-200" />
              Add to Cart
            </button>
            <button
              onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                isWishlisted
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500'
                  : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-200 hover:text-red-400 dark:hover:border-red-800'
              }`}
            >
              <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
            </button>
          </div>

          {/* Perks */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-3 border border-gray-100 dark:border-gray-700">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-orange-500 flex-shrink-0">{perk.icon}</span>
                {perk.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-4">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Customer Reviews</h3>

        {/* Rating Summary */}
        <div className="flex items-center gap-6 mb-8 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="text-center flex-shrink-0">
            <p className="text-5xl font-black text-orange-500">{averageRating.toFixed(1)}</p>
            <RatingStars rating={averageRating} size={16} />
            <p className="text-xs text-gray-400 mt-1">{reviews.length} ratings</p>
          </div>
          <div className="w-px h-16 bg-gray-100 dark:bg-gray-800" />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {reviews.length === 0
              ? 'No reviews yet — be the first to share your experience!'
              : `Based on ${reviews.length} customer review${reviews.length > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Write Review */}
        {user && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl mb-6 shadow-sm">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Write a Review</h4>
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Your Rating</p>
              <RatingStars rating={userRating} size={28} interactive={true} onRating={r => setUserRating(r)} />
            </div>
            <textarea
              value={reviewComment}
              onChange={e => setReviewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-150 resize-none"
              rows="3"
            />
            <button
              onClick={submitReview}
              disabled={submitting}
              className="mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-orange-200 dark:shadow-orange-900/30"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-600">
              <Star size={36} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No reviews yet</p>
              <p className="text-sm mt-1">Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md shadow-orange-200 dark:shadow-orange-900/30">
                      {(review.userName || review.userEmail || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800 dark:text-white">{review.userName || review.userEmail}</p>
                      <RatingStars rating={review.rating} size={12} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-600 flex-shrink-0">
                    {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}