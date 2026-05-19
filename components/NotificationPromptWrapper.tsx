'use client'

import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function NotificationPromptWrapper() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [status, setStatus] = useState<NotificationPermission>('default')
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setStatus(Notification.permission)
      if (Notification.permission === 'default' && !localStorage.getItem('push_dismissed')) {
        setTimeout(() => setShowPrompt(true), 2000)
      }
    }
  }, [])

  const handleEnable = async () => {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setStatus('granted')
        setShowPrompt(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDismissed(true)
    localStorage.setItem('push_dismissed', 'true')
  }

  return (
    <AnimatePresence>
      {showPrompt && !dismissed && status === 'default' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="px-4 py-3 flex items-center justify-between md:justify-center gap-4 z-50 w-full"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ 
                backgroundColor: 'var(--color-primary-container)',
                color: 'var(--color-on-primary-container)'
              }}
            >
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold m-0">Enable Clinical Alerts</p>
              <p className="text-xs m-0 hidden md:block" style={{ opacity: 0.85 }}>
                Receive critical push notifications for abnormal FHT and urgent handoffs.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-auto md:ml-4">
            <button 
              onClick={handleEnable}
              className="px-4 py-1.5 rounded-lg text-sm font-bold transition-colors"
              style={{
                backgroundColor: 'var(--color-on-primary)',
                color: 'var(--color-primary)'
              }}
            >
              Allow
            </button>
            <button 
              onClick={handleDismiss}
              className="p-1.5 transition-opacity rounded-md hover:opacity-75"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}