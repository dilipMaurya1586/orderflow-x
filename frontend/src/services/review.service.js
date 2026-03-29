import API from './api'

const reviewService = {
  addReview: (data) => API.post('/reviews/add', data, {
    headers: {
      'X-User-Email': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '',
      'X-User-Name': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : ''
    }
  }),
  getReviews: (productId) => API.get(`/reviews/product/${productId}`),
  getAverageRating: (productId) => API.get(`/reviews/product/${productId}/rating`),
}

export default reviewService