import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function Toast({ message, type, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    const config = {
        success: {
            icon: <CheckCircle size={20} />,
            bg: 'bg-gradient-to-r from-green-500 to-green-600',
            border: 'border-green-400'
        },
        error: {
            icon: <AlertCircle size={20} />,
            bg: 'bg-gradient-to-r from-red-500 to-red-600',
            border: 'border-red-400'
        },
        info: {
            icon: <Info size={20} />,
            bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
            border: 'border-blue-400'
        },
        warning: {
            icon: <AlertCircle size={20} />,
            bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
            border: 'border-orange-400'
        }
    }

    const { icon, bg, border } = config[type] || config.info

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white ${bg} border-l-4 ${border} animate-slide-up`}>
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-3 hover:opacity-80 transition">
                <X size={18} />
            </button>
        </div>
    )
}