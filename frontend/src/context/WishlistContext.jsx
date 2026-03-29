import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useToast } from './ToastContext'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const { user } = useAuth()
  const { showToast } = useToast()

  // Load wishlist when user changes
  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`wishlist_${user.email}`)
      if (saved) {
        setWishlist(JSON.parse(saved))
      } else {
        setWishlist([])
      }
    } else {
      setWishlist([])
    }
  }, [user])

  const addToWishlist = (product) => {
    if (!user) {
      showToast('Please login to add to wishlist', 'error')
      return
    }
    
    // Check if already in wishlist
    const exists = wishlist.some(item => item.id === product.id)
    if (exists) {
      showToast('Item already in wishlist', 'info')
      return
    }
    
    const newWishlist = [...wishlist, product]
    setWishlist(newWishlist)
    localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(newWishlist))
    showToast('Added to wishlist ❤️', 'success')
  }

  const removeFromWishlist = (productId) => {
    const product = wishlist.find(item => item.id === productId)
    const newWishlist = wishlist.filter(item => item.id !== productId)
    setWishlist(newWishlist)
    if (user?.email) {
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(newWishlist))
    }
    showToast(`Removed ${product?.productName || 'item'} from wishlist`, 'success')
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)