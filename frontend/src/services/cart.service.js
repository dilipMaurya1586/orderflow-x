import { getFromLocalStorage, saveToLocalStorage } from '../utils/helpers'

const CART_KEY = 'shopping_cart'

const cartService = {
  getCart: () => {
    return getFromLocalStorage(CART_KEY) || []
  },

  saveCart: (cart) => {
    saveToLocalStorage(CART_KEY, cart)
  },

  addItem: (item) => {
    const cart = cartService.getCart()
    const existing = cart.find(i => i.id === item.id)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }

    cartService.saveCart(cart)
    return cart
  },

  removeItem: (id) => {
    const cart = cartService.getCart()
    const filtered = cart.filter(item => item.id !== id)
    cartService.saveCart(filtered)
    return filtered
  },

  updateQuantity: (id, quantity) => {
    const cart = cartService.getCart()
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0)

    cartService.saveCart(updated)
    return updated
  },

  clearCart: () => {
    cartService.saveCart([])
    return []
  },

  getTotalItems: () => {
    const cart = cartService.getCart()
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  },

  getTotalPrice: () => {
    const cart = cartService.getCart()
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }
}

export default cartService