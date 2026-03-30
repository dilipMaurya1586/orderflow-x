// import { useNavigate } from 'react-router-dom'
// import CartItem from '../components/cart/CartItem'
// import CartSummary from '../components/cart/CartSummary'
// import { useCart } from '../hooks/useCart'
// import Button from '../components/common/Button'

// export default function Cart() {
//   const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
//   const navigate = useNavigate()

//   if (cart.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
//         <Button onClick={() => navigate('/products')} variant="primary" className="mt-4">
//           Continue Shopping
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-2">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Shopping Cart ({totalItems} items)</h2>
//             <button onClick={clearCart} className="text-red-500 text-sm hover:underline">
//               Clear Cart
//             </button>
//           </div>

//           {cart.map(item => (
//             <CartItem
//               key={item.id}
//               item={item}
//               onUpdateQuantity={updateQuantity}
//               onRemove={removeFromCart}
//             />
//           ))}
//         </div>
//       </div>

//       <div>
//         <CartSummary
//           totalItems={totalItems}
//           totalPrice={totalPrice}
//           onCheckout={() => navigate('/checkout')}
//         />
//       </div>
//     </div>
//   )
// }

import { useNavigate } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import { useCart } from '../hooks/useCart'
import Button from '../components/common/Button'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'

export default function Cart() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6 shadow-lg">
          <ShoppingBag size={40} className="text-orange-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
          Looks like you haven't added anything yet. Let's fix that!
        </p>
        <button
          onClick={() => navigate('/products')}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:shadow-orange-300 dark:hover:shadow-orange-800/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Card Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <ShoppingBag size={18} className="text-orange-500" />
                Cart Items
                <span className="ml-1 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </h2>
              <button
                onClick={clearCart}
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 dark:hover:text-red-400 px-3 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-200 dark:hover:border-red-800 transition-all duration-200"
              >
                <Trash2 size={13} className="group-hover:scale-110 transition-transform duration-200" />
                Clear All
              </button>
            </div>

            {/* Items List */}
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {cart.map((item, idx) => (
                <div
                  key={item.id}
                  className="hover:bg-orange-50/30 dark:hover:bg-orange-900/10 transition-colors duration-200"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <CartItem
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              onCheckout={() => navigate('/checkout')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}