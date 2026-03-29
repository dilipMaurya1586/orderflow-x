import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../product/ProductCard'

export default function ProductCarousel({ title, products, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width < 640) setVisibleCount(1)
      else if (width < 768) setVisibleCount(2)
      else if (width < 1024) setVisibleCount(3)
      else setVisibleCount(4)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  if (!products || products.length === 0) return null

  const maxIndex = Math.max(0, products.length - visibleCount)

  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - 1, 0))

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <button onClick={prevSlide} disabled={currentIndex === 0} className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} disabled={currentIndex >= maxIndex} className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-50">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300 gap-4" style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}>
          {products.map(p => (
            <div key={p.id} className="flex-none" style={{ width: `calc(${100 / visibleCount}% - 1rem)` }}>
              <ProductCard product={p} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}