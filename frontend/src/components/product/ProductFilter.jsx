import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ProductFilters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [showPrice, setShowPrice] = useState(true)
  const [showBrands, setShowBrands] = useState(true)
  const [showRatings, setShowRatings] = useState(true)

  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Dell', 'HP']

  const ratings = [4, 3, 2, 1]

  const handlePriceChange = (e) => {
    const newRange = [...priceRange]
    newRange[e.target.name === 'min' ? 0 : 1] = parseInt(e.target.value) || 0
    setPriceRange(newRange)
    onFilterChange({ priceRange: newRange, brands: selectedBrands, ratings: selectedRatings })
  }

  const handleBrandToggle = (brand) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand]
    setSelectedBrands(updated)
    onFilterChange({ priceRange, brands: updated, ratings: selectedRatings })
  }

  const handleRatingToggle = (rating) => {
    const updated = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating]
    setSelectedRatings(updated)
    onFilterChange({ priceRange, brands: selectedBrands, ratings: updated })
  }

  const clearFilters = () => {
    setPriceRange([0, 100000])
    setSelectedBrands([])
    setSelectedRatings([])
    onFilterChange({ priceRange: [0, 100000], brands: [], ratings: [] })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-4">
        <button onClick={() => setShowPrice(!showPrice)} className="flex justify-between w-full py-2">
          <span className="font-medium">Price</span>
          {showPrice ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showPrice && (
          <div className="mt-2 space-y-2">
            <div className="flex gap-2">
              <input type="number" name="min" placeholder="Min" value={priceRange[0]} onChange={handlePriceChange} className="w-1/2 p-2 border rounded-lg text-sm" />
              <input type="number" name="max" placeholder="Max" value={priceRange[1]} onChange={handlePriceChange} className="w-1/2 p-2 border rounded-lg text-sm" />
            </div>
            <input type="range" min="0" max="100000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full" />
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="mb-4">
        <button onClick={() => setShowBrands(!showBrands)} className="flex justify-between w-full py-2">
          <span className="font-medium">Brands</span>
          {showBrands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showBrands && (
          <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandToggle(brand)} className="rounded" />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="mb-4">
        <button onClick={() => setShowRatings(!showRatings)} className="flex justify-between w-full py-2">
          <span className="font-medium">Customer Ratings</span>
          {showRatings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showRatings && (
          <div className="mt-2 space-y-2">
            {ratings.map(rating => (
              <label key={rating} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={selectedRatings.includes(rating)} onChange={() => handleRatingToggle(rating)} className="rounded" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                  ))}
                  <span className="ml-1">& up</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <button onClick={clearFilters} className="w-full text-accent text-sm py-2 border border-accent rounded-lg hover:bg-accent hover:text-white transition">
        Clear All Filters
      </button>
    </div>
  )
}