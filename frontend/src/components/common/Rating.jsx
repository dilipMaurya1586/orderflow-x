import { Star } from 'lucide-react'

export default function Rating({ rating, reviewCount, size = 16 }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star size={size} className="fill-yellow-400 text-yellow-400 half-star" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} size={size} className="text-gray-300" />
        ))}
      </div>
      {reviewCount > 0 && (
        <span className="text-xs text-gray-500">({reviewCount})</span>
      )}
    </div>
  )
}