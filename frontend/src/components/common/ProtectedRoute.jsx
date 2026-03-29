import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}