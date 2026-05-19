'use client'

import React from 'react'
import Link from 'next/link'
import { Patient } from '@/types'
import { Tag } from '@/components/ui/Tag'
import { Clock, Activity, ArrowRight, User } from 'lucide-react'
import { formatTimeAgo } from '@/lib/utils'

export function PatientCard({ patient }: { patient: Patient }) {
  const isCritical = patient.alert_level === 'Critical'
  const isModerate = patient.alert_level === 'Moderate'
  
  const getStatusColor = () => {
    if (isCritical) return 'var(--color-error)'
    if (isModerate) return 'var(--color-outline)'
    return 'var(--color-tertiary)'
  }

  return (
    <div 
      className="relative rounded-2xl hover:shadow-lg transition-all duration-200 flex flex-col h-full overflow-hidden shadow-elevation-sm"
      style={{
        backgroundColor: '#ffffff'
      }}
    >
      
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: getStatusColor() }}
      />

      {/* Header */}
      <div 
        className="p-4 border-b flex items-start justify-between pt-5"
        style={{
          backgroundColor: '#ffffff'
        }}
      >
        <div className="flex gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: '#f4f4f2',
              color: 'var(--color-on-surface-variant)'
            }}
          >
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 
              className="text-base font-bold m-0 leading-tight"
              style={{ color: 'var(--color-on-surface)' }}
            >
              {patient.name}
            </h3>
            <p 
              className="text-xs font-medium m-0 mt-0.5"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {patient.age}y · {patient.gravida_para}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span 
            className="text-[10px] font-bold tracking-wider uppercase"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Time
          </span>
          <span 
            className="text-xs font-mono font-medium"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {new Date(patient.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>

      {/* Body */}
      <div 
        className="p-4 flex-1 space-y-3"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Clinical Flags */}
        {patient.clinical_flags && patient.clinical_flags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {patient.mode_of_delivery && (
              <span 
                className="px-2 py-0.5 text-[10px] font-bold rounded-md"
                style={{
                  backgroundColor: '#f4f4f2',
                  color: 'var(--color-on-surface-variant)'
                }}
              >
                {patient.mode_of_delivery}
              </span>
            )}
            {patient.clinical_flags.map(flag => (
              <Tag key={flag} flagName={flag} size="sm" />
            ))}
          </div>
        )}
        
        {/* Chief Complaint Quote */}
        {patient.chief_complaint && (
          <div 
            className="rounded-lg p-3 relative"
            style={{
              backgroundColor: '#f4f4f2'
            }}
          >
            <span 
              className="absolute -top-2 left-2 px-1 text-[10px] uppercase font-bold tracking-wider"
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--color-on-surface-variant)'
              }}
            >
              Complaint
            </span>
            <p 
              className="text-sm italic m-0 pt-1"
              style={{ color: 'var(--color-on-surface)' }}
            >
              "{patient.chief_complaint}"
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div 
        className="p-3 border-t flex items-center justify-between mt-auto"
        style={{
          backgroundColor: '#ffffff'
        }}
      >
        <div className="flex items-center gap-1.5">
          <Clock 
            className="w-3.5 h-3.5"
            style={{ color: 'var(--color-on-surface-variant)' }}
          />
          <span 
            className="text-xs font-medium"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {patient.updated_at ? formatTimeAgo(patient.updated_at) : 'No assessments'}
          </span>
        </div>
        
        <Link 
          href={`/patients/${patient.id}`} 
          className="inline-flex items-center gap-1 text-sm font-semibold"
          style={{ color: 'var(--color-primary)' }}
        >
          View Profile <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  )
}