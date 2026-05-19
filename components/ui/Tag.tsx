import React from 'react'
import { AlertCircle, Clock, AlertTriangle, ShieldCheck, CheckCircle2, Activity, Info } from 'lucide-react'

interface TagProps {
  flagName: string
  className?: string
  size?: 'sm' | 'md'
  onRemove?: () => void
}

const FLAG_STYLES: Record<string, { bgColor: string, textColor: string, borderColor: string, icon: any, type: string }> = {
  // Critical - Deep red
  'Pre-eclampsia': { bgColor: 'var(--color-error-container)', textColor: 'var(--color-on-error-container)', borderColor: 'var(--color-error)', icon: AlertCircle, type: 'critical' },
  'Eclampsia': { bgColor: 'var(--color-error-container)', textColor: 'var(--color-on-error-container)', borderColor: 'var(--color-error)', icon: AlertCircle, type: 'critical' },
  'Cord prolapse': { bgColor: 'var(--color-error-container)', textColor: 'var(--color-on-error-container)', borderColor: 'var(--color-error)', icon: AlertCircle, type: 'critical' },
  'Fetal distress': { bgColor: 'var(--color-error-container)', textColor: 'var(--color-on-error-container)', borderColor: 'var(--color-error)', icon: AlertCircle, type: 'critical' },
  'PPH': { bgColor: 'var(--color-error-container)', textColor: 'var(--color-on-error-container)', borderColor: 'var(--color-error)', icon: AlertCircle, type: 'critical' },
  
  // Moderate - Warm amber/brown
  'GDM': { bgColor: 'var(--color-outline-variant)', textColor: 'var(--color-outline)', borderColor: 'var(--color-outline)', icon: AlertTriangle, type: 'moderate' },
  'PROM': { bgColor: 'var(--color-outline-variant)', textColor: 'var(--color-outline)', borderColor: 'var(--color-outline)', icon: AlertTriangle, type: 'moderate' },
  'Meconium': { bgColor: 'var(--color-outline-variant)', textColor: 'var(--color-outline)', borderColor: 'var(--color-outline)', icon: AlertTriangle, type: 'moderate' },
  'Prolonged Labor': { bgColor: 'var(--color-outline-variant)', textColor: 'var(--color-outline)', borderColor: 'var(--color-outline)', icon: Clock, type: 'moderate' },
  
  // Stable - Medical green
  'Term': { bgColor: 'var(--color-tertiary-container)', textColor: 'var(--color-on-tertiary-container)', borderColor: 'var(--color-tertiary)', icon: CheckCircle2, type: 'stable' },
  'Preterm': { bgColor: 'var(--color-primary-fixed)', textColor: 'var(--color-on-primary-fixed)', borderColor: 'var(--color-primary-fixed-dim)', icon: Info, type: 'info' }
}

export function Tag({ flagName, className = '', size = 'md', onRemove }: TagProps) {
  const style = FLAG_STYLES[flagName] || { 
    bgColor: 'var(--color-surface-container)',
    textColor: 'var(--color-on-surface-variant)',
    borderColor: 'var(--color-outline-variant)',
    icon: Activity,
    type: 'default'
  }
  const Icon = style.icon

  const sizeClasses = {
    sm: "px-2 py-1 text-xs gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5"
  }

  return (
    <span 
      className={`inline-flex items-center rounded-full font-semibold ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: style.bgColor,
        color: style.textColor
      }}
    >
      <Icon className={size === 'sm' ? "w-3 h-3" : "w-4 h-4"} />
      {flagName}
      {onRemove && (
        <button type="button" onClick={onRemove} className={`hover:bg-black/10 rounded-full p-0.5 ml-1 transition-colors`}>
          <span className="sr-only">Remove</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}