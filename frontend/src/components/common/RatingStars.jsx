import React, { useState } from 'react'
import { Star } from 'lucide-react'

export default function RatingStars({
  rating = 0,
  size = 16,
  interactive = false,
  onRating,
  totalReviews
}) {

  // ✅ FIX: ensure number
  const safeRating = Number(rating) || 0

  // ================= INTERACTIVE =================
  if (interactive) {
    const [hoverRating, setHoverRating] = useState(0)

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onRating && onRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="hover:scale-110 transition"
          >
            <Star
              size={size}
              className={
                (hoverRating ? star <= hoverRating : star <= safeRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }
            />
          </button>
        ))}
      </div>
    )
  }

  // ================= DISPLAY =================
  const fullStars = Math.floor(safeRating)
  const hasHalfStar = safeRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`f-${i}`} size={size} className="fill-yellow-400 text-yellow-400" />
      ))}

      {hasHalfStar && (
        <Star size={size} className="fill-yellow-400 text-yellow-400 opacity-60" />
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`e-${i}`} size={size} className="text-gray-300" />
      ))}

      {totalReviews !== undefined && (
        <span className="text-xs text-gray-500 ml-1">({totalReviews})</span>
      )}
    </div>
  )
}