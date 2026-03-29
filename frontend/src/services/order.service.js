import API from './api'

const orderService = {
  createOrder: (data) => API.post('/orders/create', data, { timeout: 30000 }),
  getOrderById: (orderId) => API.get(`/orders/${orderId}`),
  getUserOrders: (email) => API.get(`/orders/user?email=${email}`),
}

export default orderService