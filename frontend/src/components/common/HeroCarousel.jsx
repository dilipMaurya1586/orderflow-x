import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop',
    title: 'Up to 58% higher FPS',
    subtitle: 'Intel-powered gaming laptops',
    cta: 'Shop now',
    bgColor: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=300&fit=crop',
    title: 'Fresh look, Sharp fit',
    subtitle: 'Min. 70% Off',
    cta: 'Grab now',
    bgColor: 'from-pink-600 to-orange-600'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=300&fit=crop',
    title: 'Premium Headphones',
    subtitle: 'Up to 40% Off',
    cta: 'Shop now',
    bgColor: 'from-green-600 to-teal-600'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=300&fit=crop',
    title: 'Smart Watches',
    subtitle: 'Track your fitness',
    cta: 'Explore',
    bgColor: 'from-gray-800 to-gray-600'
  }
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className="relative rounded-xl overflow-hidden mb-8 group">
      <div className="relative h-64 md:h-80 lg:h-96">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgColor} bg-opacity-70 flex items-center`}>
          <div className="container-custom">
            <div className="max-w-md text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentSlide.title}</h2>
              <p className="text-lg mb-4">{currentSlide.subtitle}</p>
              <button className="bg-white text-dark px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                {currentSlide.cta}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition ${
              idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}