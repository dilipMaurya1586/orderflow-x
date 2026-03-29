import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'
import orderService from '../services/order.service'
import Button from '../components/common/Button'
import { formatPrice } from '../utils/helpers'

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  })

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showToast('Cart is empty', 'error')
      return
    }

    if (!address.phone || !address.street || !address.city || !address.pincode) {
      showToast('Please fill all address fields', 'error')
      return
    }

    setLoading(true)

    try {
      // Create order for each cart item
      for (const item of cart) {
        const orderData = {
          productCode: item.productCode,
          quantity: item.quantity,
          userEmail: user?.email,
          address: `${address.street}, ${address.city} - ${address.pincode}`,
          phone: address.phone,
          fullName: address.fullName
        }
        
        const response = await orderService.createOrder(orderData)
        console.log('Order created:', response.data)
      }
      
      clearCart()
      showToast('Order placed successfully! 🎉', 'success')
      setTimeout(() => navigate('/orders'), 1500)
    } catch (err) {
      console.error('Order failed:', err)
      const errorMsg = err.response?.data?.message || err.message || 'Failed to place order'
      showToast(errorMsg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const deliveryCharge = totalPrice > 500 ? 0 : 40
  const finalTotal = totalPrice + deliveryCharge

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name *"
            value={address.fullName}
            onChange={(e) => setAddress({...address, fullName: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            value={address.phone}
            onChange={(e) => setAddress({...address, phone: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="Street Address *"
            value={address.street}
            onChange={(e) => setAddress({...address, street: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="City *"
            value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder="Pincode *"
            value={address.pincode}
            onChange={(e) => setAddress({...address, pincode: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.productName} x {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)}</span>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t font-semibold text-lg">
            <span>Total</span>
            <span className="text-accent">{formatPrice(finalTotal)}</span>
          </div>
        </div>
        
        <Button
          onClick={handlePlaceOrder}
          loading={loading}
          variant="primary"
          fullWidth
          className="mt-6"
        >
          {loading ? 'Placing Order...' : `Place Order • ${formatPrice(finalTotal)}`}
        </Button>
      </div>
    </div>
  )
}