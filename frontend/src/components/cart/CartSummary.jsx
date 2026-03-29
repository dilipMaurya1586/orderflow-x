import { formatPrice } from '../../utils/helpers'
import Button from '../common/Button'

export default function CartSummary({ totalItems, totalPrice, onCheckout }) {
  const deliveryCharge = totalPrice > 500 ? 0 : 40
  const finalTotal = totalPrice + deliveryCharge

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charge</span>
          <span>{deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold text-dark">
            <span>Total</span>
            <span className="text-accent text-xl">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        variant="primary"
        fullWidth
        className="mt-6"
        disabled={totalItems === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  )
}