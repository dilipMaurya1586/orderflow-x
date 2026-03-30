// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useCart } from '../hooks/useCart'
// import { useAuth } from '../hooks/useAuth'
// import { useToast } from '../context/ToastContext'
// import orderService from '../services/order.service'
// import axios from 'axios'
// import Button from '../components/common/Button'
// import { formatPrice } from '../utils/helpers'
// import { Shield, CreditCard, X, CheckCircle } from 'lucide-react'

// // Mock Razorpay Modal Component
// function MockRazorpayModal({ amount, onSuccess, onClose }) {
//   const [step, setStep] = useState('payment') // payment | processing | success
//   const [method, setMethod] = useState('card')
//   const [cardNumber, setCardNumber] = useState('')
//   const [expiry, setExpiry] = useState('')
//   const [cvv, setCvv] = useState('')
//   const [upiId, setUpiId] = useState('')

//   const handlePay = () => {
//     setStep('processing')
//     setTimeout(() => {
//       setStep('success')
//       setTimeout(() => {
//         onSuccess({
//           razorpay_payment_id: 'pay_mock_' + Math.random().toString(36).substr(2, 16),
//           razorpay_order_id: 'order_mock_' + Math.random().toString(36).substr(2, 16),
//           razorpay_signature: 'mock_signature_' + Math.random().toString(36).substr(2, 32)
//         })
//       }, 1500)
//     }, 2000)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-[#072654] px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-white rounded px-2 py-1">
//               <span className="text-[#072654] font-bold text-sm">razorpay</span>
//             </div>
//             <div>
//               <p className="text-white/70 text-xs">OrderFlowX</p>
//               <p className="text-white font-bold">{formatPrice(amount)}</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="text-white/70 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {step === 'payment' && (
//           <div className="p-6">
//             {/* Payment Methods */}
//             <div className="flex gap-2 mb-6">
//               {['card', 'upi', 'netbanking'].map(m => (
//                 <button
//                   key={m}
//                   onClick={() => setMethod(m)}
//                   className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
//                     method === m
//                       ? 'border-blue-600 bg-blue-50 text-blue-600'
//                       : 'border-gray-200 text-gray-500'
//                   }`}
//                 >
//                   {m === 'card' ? '💳 Card' : m === 'upi' ? '📱 UPI' : '🏦 NetBanking'}
//                 </button>
//               ))}
//             </div>

//             {method === 'card' && (
//               <div className="space-y-3">
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   maxLength={19}
//                   value={cardNumber}
//                   onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//                 />
//                 <div className="flex gap-3">
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     maxLength={5}
//                     value={expiry}
//                     onChange={e => setExpiry(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//                   />
//                   <input
//                     type="password"
//                     placeholder="CVV"
//                     maxLength={3}
//                     value={cvv}
//                     onChange={e => setCvv(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//                   />
//                 </div>
//               </div>
//             )}

//             {method === 'upi' && (
//               <input
//                 type="text"
//                 placeholder="Enter UPI ID (e.g. name@upi)"
//                 value={upiId}
//                 onChange={e => setUpiId(e.target.value)}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
//               />
//             )}

//             {method === 'netbanking' && (
//               <div className="grid grid-cols-3 gap-2">
//                 {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(bank => (
//                   <button key={bank} className="p-3 border rounded-lg text-sm hover:border-blue-500 hover:bg-blue-50 transition">
//                     {bank}
//                   </button>
//                 ))}
//               </div>
//             )}

//             <button
//               onClick={handlePay}
//               className="mt-6 w-full bg-[#072654] hover:bg-blue-900 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
//             >
//               <CreditCard size={18} />
//               Pay {formatPrice(amount)}
//             </button>

//             <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-400">
//               <Shield size={12} />
//               Secured by Razorpay
//             </div>
//           </div>
//         )}

//         {step === 'processing' && (
//           <div className="p-12 text-center">
//             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//             <p className="text-gray-600 font-medium">Processing payment...</p>
//             <p className="text-gray-400 text-sm mt-1">Please wait</p>
//           </div>
//         )}

//         {step === 'success' && (
//           <div className="p-12 text-center">
//             <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
//             <p className="text-gray-800 font-bold text-lg">Payment Successful!</p>
//             <p className="text-gray-500 text-sm mt-1">{formatPrice(amount)} paid</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default function Checkout() {
//   const { cart, totalPrice, clearCart } = useCart()
//   const { user } = useAuth()
//   const { showToast } = useToast()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)
//   const [showRazorpay, setShowRazorpay] = useState(false)
//   const [razorpayData, setRazorpayData] = useState(null)
//   const [address, setAddress] = useState({
//     fullName: user?.name || '',
//     phone: '',
//     street: '',
//     city: '',
//     pincode: ''
//   })

//   const deliveryCharge = totalPrice > 500 ? 0 : 40
//   const finalTotal = totalPrice + deliveryCharge

//   const handlePayment = async () => {
//     if (cart.length === 0) return showToast('Cart is empty', 'error')
//     if (!address.phone || !address.street || !address.city || !address.pincode)
//       return showToast('Please fill all address fields', 'error')

//     setLoading(true)
//     try {
//       const orderIds = []
//       for (const item of cart) {
//         const res = await orderService.createOrder({
//           productCode: item.productCode,
//           quantity: item.quantity,
//           userEmail: user?.email,
//           address: `${address.street}, ${address.city} - ${address.pincode}`,
//           phone: address.phone,
//           fullName: address.fullName
//         })
//         orderIds.push(res.data.id || res.data.orderId)
//       }

//       const { data } = await axios.post('/api/payments/create-order', {
//         orderId: orderIds[0].toString(),
//         userEmail: user?.email,
//         amount: finalTotal
//       })

//       setRazorpayData({ ...data, orderIds })
//       setShowRazorpay(true)
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Failed to initiate payment', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handlePaymentSuccess = async (response) => {
//     setShowRazorpay(false)
//     try {
//       await axios.post('/api/payments/verify', {
//         razorpayOrderId: response.razorpay_order_id,
//         razorpayPaymentId: response.razorpay_payment_id,
//         razorpaySignature: response.razorpay_signature,
//         orderId: razorpayData.orderIds[0].toString(),
//         userEmail: user?.email,
//         amount: finalTotal
//       })

//       // ✅ Order status CONFIRMED update karo
//       await axios.put(`/api/orders/${razorpayData.orderIds[0]}/status?status=CONFIRMED`)

//       clearCart()
//       showToast('Payment successful! 🎉', 'success')
//       setTimeout(() => navigate('/orders'), 1500)
//     } catch (err) {
//       showToast('Payment verification failed', 'error')
//     }
//   }


//   return (
//     <>
//       {showRazorpay && razorpayData && (
//         <MockRazorpayModal
//           amount={finalTotal}
//           onSuccess={handlePaymentSuccess}
//           onClose={() => setShowRazorpay(false)}
//         />
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Address Form */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4 dark:text-white">Delivery Address</h2>
//           <div className="space-y-3">
//             {[
//               { key: 'fullName', placeholder: 'Full Name *', type: 'text' },
//               { key: 'phone', placeholder: 'Phone Number *', type: 'tel' },
//               { key: 'street', placeholder: 'Street Address *', type: 'text' },
//               { key: 'city', placeholder: 'City *', type: 'text' },
//               { key: 'pincode', placeholder: 'Pincode *', type: 'text' },
//             ].map(field => (
//               <input
//                 key={field.key}
//                 type={field.type}
//                 placeholder={field.placeholder}
//                 value={address[field.key]}
//                 onChange={(e) => setAddress({ ...address, [field.key]: e.target.value })}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Summary</h2>
//           <div className="space-y-2 max-h-64 overflow-y-auto">
//             {cart.map(item => (
//               <div key={item.id} className="flex justify-between py-2 border-b dark:border-gray-700">
//                 <span className="dark:text-gray-300">{item.productName} x {item.quantity}</span>
//                 <span className="dark:text-white">{formatPrice(item.price * item.quantity)}</span>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 pt-4 border-t dark:border-gray-700">
//             <div className="flex justify-between dark:text-gray-300">
//               <span>Subtotal</span>
//               <span>{formatPrice(totalPrice)}</span>
//             </div>
//             <div className="flex justify-between mt-2 dark:text-gray-300">
//               <span>Delivery</span>
//               <span>{deliveryCharge === 0 ? '🎉 Free' : formatPrice(deliveryCharge)}</span>
//             </div>
//             <div className="flex justify-between mt-3 pt-3 border-t dark:border-gray-700 font-semibold text-lg">
//               <span className="dark:text-white">Total</span>
//               <span className="text-accent">{formatPrice(finalTotal)}</span>
//             </div>
//           </div>

//           <Button
//             onClick={handlePayment}
//             loading={loading}
//             variant="primary"
//             fullWidth
//             className="mt-6"
//           >
//             {loading ? 'Processing...' : `Pay with Razorpay • ${formatPrice(finalTotal)}`}
//           </Button>

//           <p className="text-xs text-center text-gray-400 mt-3">
//             🔒 Secured by Razorpay
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'
import orderService from '../services/order.service'
import axios from 'axios'
import { formatPrice } from '../utils/helpers'
import { Shield, CreditCard, X, CheckCircle, MapPin, Truck, Tag } from 'lucide-react'

function MockRazorpayModal({ amount, onSuccess, onClose }) {
  const [step, setStep] = useState('payment')
  const [method, setMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [upiId, setUpiId] = useState('')

  const handlePay = () => {
    setStep('processing')
    setTimeout(() => {
      setStep('success')
      setTimeout(() => {
        onSuccess({
          razorpay_payment_id: 'pay_mock_' + Math.random().toString(36).substr(2, 16),
          razorpay_order_id: 'order_mock_' + Math.random().toString(36).substr(2, 16),
          razorpay_signature: 'mock_signature_' + Math.random().toString(36).substr(2, 32)
        })
      }, 1500)
    }, 2000)
  }

  const methods = [
    { id: 'card', label: 'Card', icon: '💳' },
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100">
        {/* Razorpay Header */}
        <div className="bg-[#072654] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg px-2.5 py-1.5">
              <span className="text-[#072654] font-black text-sm tracking-tight">razorpay</span>
            </div>
            <div>
              <p className="text-white/60 text-xs">OrderFlowX</p>
              <p className="text-white font-bold text-lg">{formatPrice(amount)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-150"
          >
            <X size={18} />
          </button>
        </div>

        {step === 'payment' && (
          <div className="p-6">
            {/* Payment Method Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-50 p-1 rounded-2xl">
              {methods.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    method === m.id
                      ? 'bg-white text-blue-700 shadow-sm border border-blue-100'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {method === 'card' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength={19}
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="flex gap-3">
                  <input
                    type="text" placeholder="MM/YY" maxLength={5}
                    value={expiry} onChange={e => setExpiry(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="password" placeholder="CVV" maxLength={3}
                    value={cvv} onChange={e => setCvv(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {method === 'upi' && (
              <input
                type="text" placeholder="Enter UPI ID (e.g. name@upi)"
                value={upiId} onChange={e => setUpiId(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            )}

            {method === 'netbanking' && (
              <div className="grid grid-cols-3 gap-2">
                {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(bank => (
                  <button
                    key={bank}
                    className="py-3 px-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-150"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handlePay}
              className="mt-6 w-full bg-[#072654] hover:bg-blue-900 text-white py-3.5 rounded-2xl font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <CreditCard size={16} />
              Pay {formatPrice(amount)}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
              <Shield size={11} />
              Secured by Razorpay
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-16 text-center">
            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-5" />
            <p className="text-gray-800 font-bold text-lg">Processing payment...</p>
            <p className="text-gray-400 text-sm mt-1">Please wait, don't close this window</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={36} className="text-emerald-500" />
            </div>
            <p className="text-gray-900 font-black text-xl">Payment Successful!</p>
            <p className="text-gray-400 text-sm mt-2">{formatPrice(amount)} paid successfully</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showRazorpay, setShowRazorpay] = useState(false)
  const [razorpayData, setRazorpayData] = useState(null)
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  })

  const deliveryCharge = totalPrice > 500 ? 0 : 40
  const finalTotal = totalPrice + deliveryCharge

  const handlePayment = async () => {
    if (cart.length === 0) return showToast('Cart is empty', 'error')
    if (!address.phone || !address.street || !address.city || !address.pincode)
      return showToast('Please fill all address fields', 'error')
    setLoading(true)
    try {
      const orderIds = []
      for (const item of cart) {
        const res = await orderService.createOrder({
          productCode: item.productCode,
          quantity: item.quantity,
          userEmail: user?.email,
          address: `${address.street}, ${address.city} - ${address.pincode}`,
          phone: address.phone,
          fullName: address.fullName
        })
        orderIds.push(res.data.id || res.data.orderId)
      }
      const { data } = await axios.post('/api/payments/create-order', {
        orderId: orderIds[0].toString(),
        userEmail: user?.email,
        amount: finalTotal
      })
      setRazorpayData({ ...data, orderIds })
      setShowRazorpay(true)
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to initiate payment', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = async (response) => {
    setShowRazorpay(false)
    try {
      await axios.post('/api/payments/verify', {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
        orderId: razorpayData.orderIds[0].toString(),
        userEmail: user?.email,
        amount: finalTotal
      })
      await axios.put(`/api/orders/${razorpayData.orderIds[0]}/status?status=CONFIRMED`)
      clearCart()
      showToast('Payment successful! 🎉', 'success')
      setTimeout(() => navigate('/orders'), 1500)
    } catch {
      showToast('Payment verification failed', 'error')
    }
  }

  const fields = [
    { key: 'fullName', placeholder: 'Full Name', type: 'text', icon: <Tag size={14} /> },
    { key: 'phone', placeholder: 'Phone Number', type: 'tel', icon: <Tag size={14} /> },
    { key: 'street', placeholder: 'Street Address', type: 'text', icon: <MapPin size={14} /> },
    { key: 'city', placeholder: 'City', type: 'text', icon: <MapPin size={14} /> },
    { key: 'pincode', placeholder: 'Pincode', type: 'text', icon: <MapPin size={14} /> },
  ]

  return (
    <>
      {showRazorpay && razorpayData && (
        <MockRazorpayModal
          amount={finalTotal}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowRazorpay(false)}
        />
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Checkout</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Complete your order below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Address Form */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                Delivery Address
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {fields.map(field => (
                <div key={field.key}>
                  <input
                    type={field.type}
                    placeholder={field.placeholder + (field.key !== 'fullName' ? ' *' : '')}
                    value={address[field.key]}
                    onChange={e => setAddress({ ...address, [field.key]: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-150"
                  />
                </div>
              ))}

              {deliveryCharge === 0 ? (
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-4 py-3">
                  <Truck size={15} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">🎉 Free delivery on this order!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-xl px-4 py-3">
                  <Truck size={15} className="text-blue-500 flex-shrink-0" />
                  <span className="text-xs text-blue-700 dark:text-blue-400">Add ₹{500 - totalPrice} more for free delivery</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <CreditCard size={16} className="text-orange-500" />
                Order Summary
              </h2>
            </div>
            <div className="p-6">
              {/* Items */}
              <div className="space-y-2 max-h-52 overflow-y-auto mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2.5 border-b border-gray-50 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1 max-w-[180px]">{item.productName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white flex-shrink-0 ml-3">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Delivery</span>
                  <span className={`font-medium ${deliveryCharge === 0 ? 'text-emerald-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {deliveryCharge === 0 ? 'FREE 🎉' : formatPrice(deliveryCharge)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-1 border-t border-gray-100 dark:border-gray-800">
                  <span className="font-bold text-gray-900 dark:text-white text-base">Total</span>
                  <span className="font-black text-xl text-orange-500">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    Pay with Razorpay · {formatPrice(finalTotal)}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-3 flex items-center justify-center gap-1">
                <Shield size={11} />
                100% Secured by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}