// import { useAuth } from '../hooks/useAuth'
// import { User, Mail, Phone, MapPin } from 'lucide-react'

// export default function Profile() {
//   const { user } = useAuth()

//   if (!user) {
//     return <div className="text-center py-20">Please login to view profile</div>
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">My Profile</h1>

//       <div className="bg-white rounded-xl shadow-md p-6">
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
//             {user.name?.charAt(0).toUpperCase()}
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold">{user.name}</h2>
//             <p className="text-gray-500">Member since {new Date().getFullYear()}</p>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <User size={18} className="text-gray-500" />
//             <span>{user.name}</span>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <Mail size={18} className="text-gray-500" />
//             <span>{user.email}</span>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <Phone size={18} className="text-gray-500" />
//             <span>Not provided</span>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//             <MapPin size={18} className="text-gray-500" />
//             <span>Not provided</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useAuth } from '../hooks/useAuth'
import { User, Mail, Phone, MapPin, Edit3, ShieldCheck } from 'lucide-react'

export default function Profile() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
          <User size={36} className="text-orange-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Not logged in</h2>
        <p className="text-gray-500 dark:text-gray-400">Please login to view your profile</p>
      </div>
    )
  }

  const infoItems = [
    { icon: <User size={16} />, label: 'Full Name', value: user.name, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: <Mail size={16} />, label: 'Email Address', value: user.email, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { icon: <Phone size={16} />, label: 'Phone Number', value: 'Not provided', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: <MapPin size={16} />, label: 'Address', value: 'Not provided', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">My Profile</h1>
        <button className="group inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 px-4 py-2 rounded-xl border border-orange-100 dark:border-orange-900/50 transition-all duration-200">
          <Edit3 size={14} className="group-hover:rotate-12 transition-transform duration-200" />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">

        {/* Cover Banner */}
        <div className="h-24 bg-gradient-to-r from-orange-400 via-orange-500 to-rose-500 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
        </div>

        {/* Avatar + Name */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-200 dark:shadow-orange-900/40 border-4 border-white dark:border-gray-900 flex-shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="pb-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Verified Member</span>
                <span className="text-gray-300 dark:text-gray-600 text-xs">·</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">Since {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Info Items */}
          <div className="space-y-3">
            {infoItems.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-900/50 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-200"
              >
                <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-0.5">{item.label}</p>
                  <p className={`text-sm font-semibold truncate ${item.value === 'Not provided' ? 'text-gray-400 dark:text-gray-500 italic' : 'text-gray-800 dark:text-white'}`}>
                    {item.value}
                  </p>
                </div>
                {item.value === 'Not provided' && (
                  <span className="text-xs text-orange-500 font-medium flex-shrink-0">Add →</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}