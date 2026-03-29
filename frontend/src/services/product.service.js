import API from './api'

const productService = {
  getAll: () => API.get('/inventory/all'),
  getById: (id) => API.get(`/inventory/${id}`),
  getByCategory: (category) => API.get(`/inventory/category/${category}`),
  checkStock: (productCode, quantity) =>
    API.get(`/inventory/check?productCode=${productCode}&quantity=${quantity}`),
  addProduct: (data) => API.post('/inventory/add', data),
  update: (id, data) => API.put(`/inventory/${id}`, data),
  delete: (id) => API.delete(`/inventory/${id}`),
}

export default productService