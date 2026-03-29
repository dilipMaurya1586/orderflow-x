export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const getStockStatus = (quantity) => {
  if (quantity > 10) return { text: 'In Stock', color: 'text-green-600' }
  if (quantity > 0) return { text: 'Low Stock', color: 'text-orange-500' }
  return { text: 'Out of Stock', color: 'text-red-500' }
}

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}