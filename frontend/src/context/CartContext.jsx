import { createContext, useState, useEffect } from 'react'
import cartService from '../services/cart.service'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    loadCart()
  }, [])

  useEffect(() => {
    setTotalItems(cartService.getTotalItems())
    setTotalPrice(cartService.getTotalPrice())
  }, [cart])

  const loadCart = () => {
    setCart(cartService.getCart())
  }

  const addToCart = (item) => {
    const updated = cartService.addItem(item)
    setCart(updated)
  }

  const removeFromCart = (id) => {
    const updated = cartService.removeItem(id)
    setCart(updated)
  }

  const updateQuantity = (id, quantity) => {
    const updated = cartService.updateQuantity(id, quantity)
    setCart(updated)
  }

  const clearCart = () => {
    const updated = cartService.clearCart()
    setCart(updated)
  }

  return (
    <CartContext.Provider value={{
      cart,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  )
}