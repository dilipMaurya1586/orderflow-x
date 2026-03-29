import OrderStatus from './OrderStatus'
import { formatPrice, formatDate } from '../../utils/helpers'

export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
      {/* Order Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 border-b pb-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono font-semibold text-dark">{order.orderId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="text-dark">{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="font-bold text-accent text-lg">{formatPrice(order.totalPrice)}</p>
        </div>
      </div>

      {/* Order Status */}
      <div className="mt-4">
        <OrderStatus status={order.status} />
      </div>

      {/* Order Items */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-500 mb-2">Items</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-dark">Product Code: {order.productCode}</p>
            <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
          </div>
          <p className="font-semibold text-dark">{formatPrice(order.totalPrice)}</p>
        </div>
      </div>
    </div>
  )
}