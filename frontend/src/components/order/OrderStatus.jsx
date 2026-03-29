import { CheckCircle, XCircle, Clock, Truck, Package } from 'lucide-react'

export default function OrderStatus({ status }) {
  const statusConfig = {
    PENDING: {
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      label: 'Order Pending',
      description: 'Your order is being processed'
    },
    CONFIRMED: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      label: 'Order Confirmed',
      description: 'Your order has been confirmed'
    },
    PROCESSING: {
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      label: 'Processing',
      description: 'Your order is being prepared'
    },
    SHIPPED: {
      icon: Truck,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      label: 'Shipped',
      description: 'Your order is on the way'
    },
    DELIVERED: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-300',
      label: 'Delivered',
      description: 'Your order has been delivered'
    },
    FAILED: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      label: 'Order Failed',
      description: 'Something went wrong. Please try again.'
    }
  }

  const config = statusConfig[status] || statusConfig.PENDING
  const Icon = config.icon

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <div className={`${config.color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className={`font-semibold ${config.color}`}>{config.label}</p>
        <p className="text-sm text-gray-500">{config.description}</p>
      </div>
    </div>
  )
}