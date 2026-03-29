export const validateRegister = (data) => {
  const errors = {}

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required'
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateLogin = (data) => {
  const errors = {}

  if (!data.email) errors.email = 'Email is required'
  if (!data.password) errors.password = 'Password is required'

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateOrder = (cart) => {
  if (!cart || cart.length === 0) {
    return { isValid: false, error: 'Cart is empty' }
  }

  const invalidItems = cart.filter(item => !item.productCode || item.quantity <= 0)
  if (invalidItems.length > 0) {
    return { isValid: false, error: 'Invalid items in cart' }
  }

  return { isValid: true, error: null }
}