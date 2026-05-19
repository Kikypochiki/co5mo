'use client'

import React, { useState, useEffect } from 'react'
import { Clock, ShieldCheck } from 'lucide-react'

export function Stamp() {
  const [time, setTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div 
      className="inline-flex items-center gap-3 rounded-lg px-4 py-2.5"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 2px rgba(176, 26, 77, 0.08)'
      }}
    >
      <ShieldCheck className="w-4 h-4" style={{ color: 'var(--color-tertiary)' }} />
      <div className="flex flex-col">
        <span 
          className="text-xs font-semibold uppercase tracking-wider leading-none mb-1"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          AUTO-CAPTURED TIME
        </span>
        <span 
          className="text-sm font-mono font-semibold leading-none"
          style={{ color: 'var(--color-on-surface)' }}
        >
          {time.toLocaleTimeString('en-US', { hour12: true })}
        </span>
      </div>
      <div 
        className="w-1.5 h-1.5 rounded-full animate-pulse ml-1" 
        style={{ backgroundColor: 'var(--color-tertiary)' }}
      />
    </div>
  )
}