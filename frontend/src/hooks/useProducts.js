import { useState, useEffect } from 'react'
import productService from '../services/product.service'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getAll()
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getProductById = (id) => {
    return products.find(p => p.id === id)
  }

  const checkStock = async (code, quantity) => {
    try {
      const response = await productService.checkStock(code, quantity)
      return response.data
    } catch (err) {
      return false
    }
  }

  return { products, loading, error, fetchProducts, getProductById, checkStock }
}