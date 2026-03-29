export default function ProductSort({ onSortChange }) {
  const options = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Top Rated' },
    { value: 'popular', label: 'Most Popular' },
  ]

  return (
    <select
      onChange={(e) => onSortChange(e.target.value)}
      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}