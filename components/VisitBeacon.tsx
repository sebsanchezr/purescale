'use client'

import { useEffect } from 'react'

/**
 * Fires once per landing to confirm a cold-email visit was a person. Link
 * scanners fetch the redirect but never execute this. Renders nothing.
 */
export function VisitBeacon() {
  useEffect(() => {
    if (!document.cookie.includes('ps_visit=')) return
    fetch('/api/visit-confirm', { method: 'POST', keepalive: true }).catch(() => {})
  }, [])
  return null
}
