export default function Button({
  children,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-accent hover:bg-opacity-90 text-white',
    secondary: 'bg-primary hover:bg-opacity-90 text-white',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white'
  }

  const baseClasses = `px-6 py-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`

  return (
    <button className={baseClasses} disabled={loading} {...props}>
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : children}
    </button>
  )
}