import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'
import productService from '../services/product.service'
import Button from '../components/common/Button'
import { Edit, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react'

export default function AdminProducts() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    productCode: '',
    productName: '',
    quantity: '',
    price: '',
    category: '',
    imageUrl: '',
    description: '',
    brand: '',
    originalPrice: ''
  })

  const categories = [
    { value: 'fashion', label: 'Fashion', icon: '👕' },
    { value: 'mobiles', label: 'Mobiles', icon: '📱' },
    { value: 'beauty', label: 'Beauty', icon: '💄' },
    { value: 'electronics', label: 'Electronics', icon: '💻' },
    { value: 'home', label: 'Home & Living', icon: '🏠' },
    { value: 'appliances', label: 'Appliances', icon: '🔌' },
    { value: 'sports', label: 'Sports & Fitness', icon: '⚽' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'furniture', label: 'Furniture', icon: '🪑' },
    { value: 'bikes', label: 'Bikes', icon: '🚲' },
    { value: 'toys', label: 'Toys', icon: '🧸' }
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const res = await productService.getAll()
      setProducts(res.data)
    } catch (err) {
      console.error('Failed to load products', err)
      showToast('Failed to load products', 'error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const productData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null
      }

      if (editingProduct) {
        await productService.update(editingProduct.id, productData)
        showToast('Product updated successfully!', 'success')
      } else {
        await productService.addProduct(productData)
        showToast('Product added successfully!', 'success')
      }

      setShowModal(false)
      setEditingProduct(null)
      setFormData({
        productCode: '',
        productName: '',
        quantity: '',
        price: '',
        category: '',
        imageUrl: '',
        description: '',
        brand: '',
        originalPrice: ''
      })
      loadProducts()
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save product', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.delete(id)
        showToast('Product deleted successfully!', 'success')
        loadProducts()
      } catch (err) {
        showToast('Failed to delete product', 'error')
      }
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      productCode: product.productCode,
      productName: product.productName,
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      category: product.category || '',
      imageUrl: product.imageUrl || '',
      description: product.description || '',
      brand: product.brand || '',
      originalPrice: product.originalPrice?.toString() || ''
    })
    setShowModal(true)
  }

  const getCategoryLabel = (value) => {
    const cat = categories.find(c => c.value === value)
    return cat ? `${cat.icon} ${cat.label}` : value
  }

  if (user?.email !== 'admin@orderflowx.com') {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-xl mb-2">Access Denied</div>
        <p className="text-gray-500">Admin access only</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin - Manage Products</h1>
          <p className="text-gray-500 text-sm mt-1">Total Products: {products.length}</p>
        </div>
        <Button onClick={() => setShowModal(true)} variant="primary">
          <Plus size={16} className="mr-2" /> Add New Product
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.productName}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <ImageIcon size={16} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-mono text-sm">{p.productCode}</td>
                  <td className="p-3 font-medium">{p.productName}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {getCategoryLabel(p.category)}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={p.quantity < 10 ? 'text-orange-500 font-medium' : 'text-gray-600'}>
                      {p.quantity}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-accent">₹{p.price}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-1 text-blue-500 hover:bg-blue-50 rounded transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products yet. Click "Add New Product" to get started.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingProduct(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Code *</label>
                  <input
                    type="text"
                    value={formData.productCode}
                    onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g., Apple, Nike, Samsung"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="For discount display"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    placeholder="Product description..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Image URL Input */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-123456789.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste image URL from Google, Unsplash, or any website.
                    Leave empty for random default image.
                  </p>
                </div>

              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" loading={loading} variant="primary" className="flex-1">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingProduct(null)
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}