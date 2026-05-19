import React, { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
}

export function Button({ 
  className = '', 
  variant = 'secondary', 
  size = 'md', 
  loading = false, 
  children, 
  disabled, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
          boxShadow: '0 1px 2px rgba(176, 26, 77, 0.08)'
        }
      case 'secondary':
        return {
          backgroundColor: '#ffffff',
          color: 'var(--color-on-surface)',
          boxShadow: '0 1px 2px rgba(176, 26, 77, 0.06)'
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-on-surface-variant)',
          border: 'none'
        }
      case 'danger':
        return {
          backgroundColor: 'var(--color-error-container)',
          color: 'var(--color-on-error-container)',
          boxShadow: '0 1px 2px rgba(176, 26, 77, 0.06)'
        }
      default:
        return {}
    }
  }

  const sizeClasses = {
    sm: "h-8 px-3 text-xs rounded-md",
    md: "h-10 px-4 text-sm rounded-md",
    lg: "h-12 px-6 text-base rounded-lg",
    icon: "aspect-square w-10 h-10 rounded-md p-0"
  }

  return (
    <button 
      className={`${baseStyles} ${sizeClasses[size]} ${className}`}
      style={{
        ...getVariantStyles(),
        ...props.style
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </button>
  )
}