// import { useState, useEffect } from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { useToast } from '../context/ToastContext'
// import productService from '../services/product.service'
// import Button from '../components/common/Button'
// import { Edit, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react'

// export default function AdminProducts() {
//   const { user } = useAuth()
//   const { showToast } = useToast()
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [showModal, setShowModal] = useState(false)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [formData, setFormData] = useState({
//     productCode: '',
//     productName: '',
//     quantity: '',
//     price: '',
//     category: '',
//     imageUrl: '',
//     description: '',
//     brand: '',
//     originalPrice: ''
//   })

//   const categories = [
//     { value: 'fashion', label: 'Fashion', icon: '👕' },
//     { value: 'mobiles', label: 'Mobiles', icon: '📱' },
//     { value: 'beauty', label: 'Beauty', icon: '💄' },
//     { value: 'electronics', label: 'Electronics', icon: '💻' },
//     { value: 'home', label: 'Home & Living', icon: '🏠' },
//     { value: 'appliances', label: 'Appliances', icon: '🔌' },
//     { value: 'sports', label: 'Sports & Fitness', icon: '⚽' },
//     { value: 'books', label: 'Books', icon: '📚' },
//     { value: 'furniture', label: 'Furniture', icon: '🪑' },
//     { value: 'bikes', label: 'Bikes', icon: '🚲' },
//     { value: 'toys', label: 'Toys', icon: '🧸' }
//   ]

//   useEffect(() => {
//     loadProducts()
//   }, [])

//   const loadProducts = async () => {
//     try {
//       const res = await productService.getAll()
//       setProducts(res.data)
//     } catch (err) {
//       console.error('Failed to load products', err)
//       showToast('Failed to load products', 'error')
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const productData = {
//         ...formData,
//         quantity: parseInt(formData.quantity),
//         price: parseFloat(formData.price),
//         originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null
//       }

//       if (editingProduct) {
//         await productService.update(editingProduct.id, productData)
//         showToast('Product updated successfully!', 'success')
//       } else {
//         await productService.addProduct(productData)
//         showToast('Product added successfully!', 'success')
//       }

//       setShowModal(false)
//       setEditingProduct(null)
//       setFormData({
//         productCode: '',
//         productName: '',
//         quantity: '',
//         price: '',
//         category: '',
//         imageUrl: '',
//         description: '',
//         brand: '',
//         originalPrice: ''
//       })
//       loadProducts()
//     } catch (err) {
//       showToast(err.response?.data?.message || 'Failed to save product', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this product?')) {
//       try {
//         await productService.delete(id)
//         showToast('Product deleted successfully!', 'success')
//         loadProducts()
//       } catch (err) {
//         showToast('Failed to delete product', 'error')
//       }
//     }
//   }

//   const handleEdit = (product) => {
//     setEditingProduct(product)
//     setFormData({
//       productCode: product.productCode,
//       productName: product.productName,
//       quantity: product.quantity.toString(),
//       price: product.price.toString(),
//       category: product.category || '',
//       imageUrl: product.imageUrl || '',
//       description: product.description || '',
//       brand: product.brand || '',
//       originalPrice: product.originalPrice?.toString() || ''
//     })
//     setShowModal(true)
//   }

//   const getCategoryLabel = (value) => {
//     const cat = categories.find(c => c.value === value)
//     return cat ? `${cat.icon} ${cat.label}` : value
//   }

//   if (user?.email !== 'admin@orderflowx.com') {
//     return (
//       <div className="text-center py-20">
//         <div className="text-red-500 text-xl mb-2">Access Denied</div>
//         <p className="text-gray-500">Admin access only</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Admin - Manage Products</h1>
//           <p className="text-gray-500 text-sm mt-1">Total Products: {products.length}</p>
//         </div>
//         <Button onClick={() => setShowModal(true)} variant="primary">
//           <Plus size={16} className="mr-2" /> Add New Product
//         </Button>
//       </div>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="p-3 text-left">Image</th>
//                 <th className="p-3 text-left">Code</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-left">Quantity</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(p => (
//                 <tr key={p.id} className="border-t hover:bg-gray-50">
//                   <td className="p-3">
//                     {p.imageUrl ? (
//                       <img
//                         src={p.imageUrl}
//                         alt={p.productName}
//                         className="w-10 h-10 rounded object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
//                         <ImageIcon size={16} className="text-gray-400" />
//                       </div>
//                     )}
//                   </td>
//                   <td className="p-3 font-mono text-sm">{p.productCode}</td>
//                   <td className="p-3 font-medium">{p.productName}</td>
//                   <td className="p-3">
//                     <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
//                       {getCategoryLabel(p.category)}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                     <span className={p.quantity < 10 ? 'text-orange-500 font-medium' : 'text-gray-600'}>
//                       {p.quantity}
//                     </span>
//                   </td>
//                   <td className="p-3 font-semibold text-accent">₹{p.price}</td>
//                   <td className="p-3">
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(p)}
//                         className="p-1 text-blue-500 hover:bg-blue-50 rounded transition"
//                         title="Edit"
//                       >
//                         <Edit size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(p.id)}
//                         className="p-1 text-red-500 hover:bg-red-50 rounded transition"
//                         title="Delete"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {products.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             No products yet. Click "Add New Product" to get started.
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">
//                 {editingProduct ? 'Edit Product' : 'Add New Product'}
//               </h2>
//               <button
//                 onClick={() => {
//                   setShowModal(false)
//                   setEditingProduct(null)
//                 }}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Code *</label>
//                   <input
//                     type="text"
//                     value={formData.productCode}
//                     onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
//                   <input
//                     type="text"
//                     value={formData.productName}
//                     onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                     required
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map(cat => (
//                       <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
//                   <input
//                     type="text"
//                     value={formData.brand}
//                     onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
//                     placeholder="e.g., Apple, Nike, Samsung"
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
//                   <input
//                     type="number"
//                     value={formData.quantity}
//                     onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                     required
//                     min="0"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
//                   <input
//                     type="number"
//                     value={formData.price}
//                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                     required
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
//                   <input
//                     type="number"
//                     value={formData.originalPrice}
//                     onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
//                     placeholder="For discount display"
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     rows="3"
//                     placeholder="Product description..."
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                   />
//                 </div>

//                 {/* Image URL Input */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//                   <input
//                     type="text"
//                     placeholder="https://images.unsplash.com/photo-123456789.jpg"
//                     value={formData.imageUrl}
//                     onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Paste image URL from Google, Unsplash, or any website.
//                     Leave empty for random default image.
//                   </p>
//                 </div>

//               </div>

//               <div className="flex gap-3 pt-4">
//                 <Button type="submit" loading={loading} variant="primary" className="flex-1">
//                   {editingProduct ? 'Update Product' : 'Add Product'}
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false)
//                     setEditingProduct(null)
//                   }}
//                   variant="outline"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'
import productService from '../services/product.service'
import Button from '../components/common/Button'
import { Edit, Trash2, Plus, X, Image as ImageIcon, Package, ShieldOff } from 'lucide-react'

export default function AdminProducts() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    productCode: '', productName: '', quantity: '', price: '',
    category: '', imageUrl: '', description: '', brand: '', originalPrice: ''
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
    { value: 'toys', label: 'Toys', icon: '🧸' },
  ]

  useEffect(() => { loadProducts() }, [])

  const loadProducts = async () => {
    try {
      const res = await productService.getAll()
      setProducts(res.data)
    } catch (err) {
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
      closeModal()
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
      } catch {
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

  const closeModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({ productCode: '', productName: '', quantity: '', price: '', category: '', imageUrl: '', description: '', brand: '', originalPrice: '' })
  }

  const getCategoryLabel = (value) => {
    const cat = categories.find(c => c.value === value)
    return cat ? `${cat.icon} ${cat.label}` : value
  }

  if (user?.email !== 'admin@orderflowx.com') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
          <ShieldOff size={36} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Denied</h2>
        <p className="text-gray-500 dark:text-gray-400">This page is restricted to administrators only.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Manage Products</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm flex items-center gap-1.5">
            <Package size={14} />
            {products.length} products in inventory
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          Add New Product
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-100 dark:border-gray-800">
                {['Image', 'Code', 'Name', 'Category', 'Stock', 'Price', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {products.map(p => (
                <tr key={p.id} className="group hover:bg-orange-50/40 dark:hover:bg-orange-900/10 transition-colors duration-150">
                  <td className="px-4 py-3">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.productName} className="w-11 h-11 rounded-xl object-cover border border-gray-100 dark:border-gray-800 shadow-sm" />
                    ) : (
                      <div className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        <ImageIcon size={16} className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg">
                      {p.productCode}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-sm text-gray-800 dark:text-white line-clamp-1 max-w-[180px]">{p.productName}</p>
                    {p.brand && <p className="text-xs text-gray-400 mt-0.5">{p.brand}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
                      {getCategoryLabel(p.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${
                      p.quantity === 0
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : p.quantity < 10
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                        : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {p.quantity === 0 ? 'Out of Stock' : `${p.quantity} units`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-orange-500">₹{p.price}</p>
                    {p.originalPrice && (
                      <p className="text-xs text-gray-400 line-through">₹{p.originalPrice}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <button
                        onClick={() => handleEdit(p)}
                        className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-150"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-150"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <Package size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No products yet</p>
            <p className="text-sm mt-1">Click "Add New Product" to get started</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-800">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {editingProduct ? 'Update product information' : 'Fill in the details below'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Input helper component via inline styling */}
                {[
                  { key: 'productCode', label: 'Product Code', required: true, placeholder: 'e.g. PROD-001' },
                  { key: 'productName', label: 'Product Name', required: true, placeholder: 'e.g. Premium T-Shirt' },
                  { key: 'brand', label: 'Brand', placeholder: 'e.g. Nike, Apple' },
                  { key: 'quantity', label: 'Quantity', required: true, type: 'number', min: 0 },
                  { key: 'price', label: 'Price (₹)', required: true, type: 'number', min: 0, step: '0.01' },
                  { key: 'originalPrice', label: 'Original Price (₹)', type: 'number', min: 0, step: '0.01', placeholder: 'For discount display' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                      {field.label} {field.required && <span className="text-orange-500">*</span>}
                    </label>
                    <input
                      type={field.type || 'text'}
                      value={formData[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-150"
                      required={field.required}
                      min={field.min}
                      step={field.step}
                    />
                  </div>
                ))}

                {/* Category */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                    Category <span className="text-orange-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-150"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    placeholder="Product description..."
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-150 resize-none"
                  />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-150"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 flex items-center gap-1">
                    <ImageIcon size={11} />
                    Paste image URL from Unsplash, Google, etc. Leave empty for default.
                  </p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-orange-200 dark:shadow-orange-900/30 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving...
                    </span>
                  ) : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}