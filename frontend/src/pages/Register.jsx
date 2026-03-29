import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'
import { validateRegister } from '../utils/validators'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { isValid, errors: validationErrors } = validateRegister(formData)
    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      navigate('/')
    } catch (err) {
      setErrors({ general: 'Registration failed. Email may already exist.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-dark text-center mb-6">Create Account</h2>

        {errors.general && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.name && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.email && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.password && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.confirmPassword}</p>}

          <Button type="submit" loading={loading} variant="primary" fullWidth>
            Register
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}