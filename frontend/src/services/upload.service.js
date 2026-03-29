//import axios from 'axios'
//
//const CLOUD_NAME = 'dyduiaosi'
//const UPLOAD_PRESET = 'ecommerce_products'
//
//export const uploadImage = async (file) => {
//  const formData = new FormData()
//  formData.append('file', file)
//  formData.append('upload_preset', UPLOAD_PRESET)
//
//  try {
//    const response = await axios.post(
//      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//      formData,
//      {
//        headers: {
//          'Content-Type': 'multipart/form-data'
//        }
//      }
//    )
//    return response.data.secure_url
//  } catch (error) {
//    console.error('Upload failed:', error.response?.data || error.message)
//    throw new Error('Image upload failed')
//  }
//}