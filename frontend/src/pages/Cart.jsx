import { useNavigate } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import { useCart } from '../hooks/useCart'
import Button from '../components/common/Button'

export default function Cart() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
        <Button onClick={() => navigate('/products')} variant="primary" className="mt-4">
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shopping Cart ({totalItems} items)</h2>
            <button onClick={clearCart} className="text-red-500 text-sm hover:underline">
              Clear Cart
            </button>
          </div>

          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>
      </div>

      <div>
        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          onCheckout={() => navigate('/checkout')}
        />
      </div>
    </div>
  )
}