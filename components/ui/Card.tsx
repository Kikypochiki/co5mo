import React, { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'elevated'
  hoverable?: boolean
}

export function Card({ className = '', variant = 'default', hoverable = false, ...props }: CardProps) {
  const base = "overflow-hidden transition-all duration-200"
  
  const getVariantStyles = () => {
    switch(variant) {
      case 'elevated':
        return {
          backgroundColor: '#ffffff',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 15px -3px rgba(176, 26, 77, 0.10), 0 4px 6px -2px rgba(176, 26, 77, 0.08)'
        }
      case 'flat':
        return {
          backgroundColor: '#ffffff',
          borderRadius: '0.75rem'
        }
      case 'default':
      default:
        return {
          backgroundColor: '#ffffff',
          borderRadius: '1.5rem',
          boxShadow: '0 1px 2px rgba(176, 26, 77, 0.08)'
        }
    }
  }

  const hoverStyles = hoverable ? {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(176, 26, 77, 0.10), 0 4px 6px -2px rgba(176, 26, 77, 0.08)',
    cursor: 'pointer'
  } : {}

  return (
    <div 
      className={`${base} ${className}`}
      style={{
        ...getVariantStyles(),
        ...(hoverable && {
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
        }),
        ...props.style
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          Object.assign(e.currentTarget.style, hoverStyles)
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          const styles = getVariantStyles()
          Object.assign(e.currentTarget.style, styles)
        }
      }}
      {...props}
    />
  )
}

export function CardHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={`px-6 py-4 border-b flex items-center justify-between ${className}`}
      style={{
        backgroundColor: '#ffffff',
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardBody({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props} />
  )
}