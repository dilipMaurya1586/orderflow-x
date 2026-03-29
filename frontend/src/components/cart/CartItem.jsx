import { Trash2, Plus, Minus } from 'lucide-react'
import { formatPrice } from '../../utils/helpers'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-3xl">📦</span>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-dark">{item.productName}</h3>
        <p className="text-sm text-gray-500">Code: {item.productCode}</p>
        <p className="text-accent font-semibold mt-1">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}