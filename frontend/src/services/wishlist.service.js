import API from './api'

const wishlistService = {
  getWishlist: () => API.get('/wishlist'),
  addToWishlist: (productId) => API.post('/wishlist/add', { productId }),
  removeFromWishlist: (productId) => API.delete(`/wishlist/${productId}`),
}

export default wishlistService