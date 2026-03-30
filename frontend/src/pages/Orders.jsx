// import { useState, useEffect } from 'react'
// import { useAuth } from '../hooks/useAuth'
// import orderService from '../services/order.service'
// import OrderCard from '../components/order/OrderCard'
// import Loader from '../components/common/Loader'

// export default function Orders() {
//   const { user } = useAuth()
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (user?.email) {
//       loadOrders()
//     }
//   }, [user])

//   const loadOrders = async () => {
//     try {
//       const response = await orderService.getUserOrders(user.email)
//       console.log('Orders:', response.data)
//       setOrders(response.data)
//     } catch (error) {
//       console.error('Failed to load orders', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) return <Loader />

//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h2 className="text-2xl font-semibold text-gray-600">No orders yet</h2>
//         <p className="text-gray-500 mt-2">Start shopping to see your orders here</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-dark mb-6">My Orders ({orders.length})</h1>
//       <div className="space-y-4">
//         {orders.map((order) => (
//           <OrderCard key={order.id} order={order} />
//         ))}
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import orderService from '../services/order.service'
import OrderCard from '../components/order/OrderCard'
import Loader from '../components/common/Loader'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.email) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    try {
      const response = await orderService.getUserOrders(user.email)
      setOrders(response.data)
    } catch (error) {
      console.error('Failed to load orders', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6 shadow-lg">
          <ShoppingBag size={40} className="text-orange-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">No orders yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
          Start shopping to see your orders here
        </p>
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-2xl font-semibold shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          Browse Products
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">My Orders</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
          </p>
        </div>
        <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-sm font-bold px-4 py-1.5 rounded-full">
          {orders.length} Total
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((order, idx) => (
          <div
            key={order.id}
            className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    </div>
  )
}