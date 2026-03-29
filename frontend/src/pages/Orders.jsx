import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import orderService from '../services/order.service'
import OrderCard from '../components/order/OrderCard'
import Loader from '../components/common/Loader'

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
      console.log('Orders:', response.data)
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
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600">No orders yet</h2>
        <p className="text-gray-500 mt-2">Start shopping to see your orders here</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">My Orders ({orders.length})</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}