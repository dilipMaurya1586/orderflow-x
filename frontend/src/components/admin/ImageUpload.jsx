import { useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function ImageUpload({ onImageUpload, currentImage }) {
  const [preview, setPreview] = useState(currentImage || '')
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setPreview(base64String)
      onImageUpload(base64String)  // ✅ Save Base64 to database
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setPreview('')
    onImageUpload('')
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Product Image</label>

      {preview ? (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent" />
            ) : (
              <Upload size={24} className="text-gray-400" />
            )}
            <p className="text-xs text-gray-500 mt-1">
              {uploading ? 'Uploading...' : 'Upload'}
            </p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}
    </div>
  )
}