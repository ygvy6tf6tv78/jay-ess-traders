'use client'

import { useEffect, ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Set dark mode permanently
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return <>{children}</>
}

