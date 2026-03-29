import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function CategorySidebar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [showPrice, setShowPrice] = useState(true)
  const [showBrands, setShowBrands] = useState(true)

  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Boat', 'Noise']

  const clearFilters = () => {
    setPriceRange([0, 100000])
    setSelectedBrands([])
    onFilterChange?.({ priceRange: [0, 100000], brands: [] })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>

      <div className="mb-4">
        <button onClick={() => setShowPrice(!showPrice)} className="flex justify-between w-full py-2">
          <span className="font-medium">Price</span>
          {showPrice ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showPrice && (
          <div className="mt-2 space-y-2">
            <div className="flex gap-2">
              <input type="number" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} className="w-1/2 p-2 border rounded-lg" />
              <input type="number" placeholder="Max" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="w-1/2 p-2 border rounded-lg" />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <button onClick={() => setShowBrands(!showBrands)} className="flex justify-between w-full py-2">
          <span className="font-medium">Brands</span>
          {showBrands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showBrands && (
          <div className="mt-2 space-y-2">
            {brands.map(b => (
              <label key={b} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => {
                  const updated = selectedBrands.includes(b) ? selectedBrands.filter(x => x !== b) : [...selectedBrands, b]
                  setSelectedBrands(updated)
                  onFilterChange?.({ priceRange, brands: updated })
                }} />
                {b}
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