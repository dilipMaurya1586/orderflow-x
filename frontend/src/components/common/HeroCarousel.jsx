import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop',
    title: 'Up to 58% Higher FPS',
    subtitle: 'Intel-powered gaming laptops — built to dominate',
    cta: 'Shop Now',
    link: '/category/electronics',
    bgColor: 'from-blue-900/80 to-purple-900/60'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=500&fit=crop',
    title: 'Fresh Look, Sharp Fit',
    subtitle: 'Minimum 70% Off on top fashion brands',
    cta: 'Grab Now',
    link: '/category/fashion',
    bgColor: 'from-pink-900/80 to-orange-900/60'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&h=500&fit=crop',
    title: 'Premium Headphones',
    subtitle: 'Immersive sound — Up to 40% Off',
    cta: 'Shop Now',
    link: '/category/electronics',
    bgColor: 'from-green-900/80 to-teal-900/60'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&h=500&fit=crop',
    title: 'Smart Watches',
    subtitle: 'Track your fitness & style',
    cta: 'Explore',
    link: '/category/mobiles',
    bgColor: 'from-gray-900/80 to-slate-800/60'
  }
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => goToNext(), 4000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (idx) => {
    if (animating) return
    setAnimating(true)
    setCurrentIndex(idx)
    setTimeout(() => setAnimating(false), 500)
  }

  const goToPrevious = () => goTo((currentIndex - 1 + slides.length) % slides.length)
  const goToNext = () => goTo((currentIndex + 1) % slides.length)

  const slide = slides[currentIndex]

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 group shadow-xl">
      <div className="relative h-64 md:h-80 lg:h-[420px]">
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${animating ? 'opacity-70' : 'opacity-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} flex items-center`}>
          <div className="px-8 md:px-16">
            <div className="max-w-lg text-white">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-2">
                Limited Offer
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
                {slide.title}
              </h2>
              <p className="text-white/80 text-lg mb-6">{slide.subtitle}</p>
              <Link
                to={slide.link}
                className="inline-block bg-accent hover:bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
              >
                {slide.cta} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-accent w-6' : 'bg-white/50 w-2'}`}
          />
        ))}
      </div>
    </div>
  )
}