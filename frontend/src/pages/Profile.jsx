import { useAuth } from '../hooks/useAuth'
import { User, Mail, Phone, MapPin } from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()

  if (!user) {
    return <div className="text-center py-20">Please login to view profile</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <User size={18} className="text-gray-500" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail size={18} className="text-gray-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone size={18} className="text-gray-500" />
            <span>Not provided</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin size={18} className="text-gray-500" />
            <span>Not provided</span>
          </div>
        </div>
      </div>
    </div>
  )
}