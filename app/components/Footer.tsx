'use client'

import { siteConfig } from '../data/site'

export default function Footer() {
  return (
    <footer className="w-full max-w-md mx-auto px-4 py-8">
      <div className="text-center space-y-3">
        <p className="text-sm text-white font-medium">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="space-y-2">
          <p className="text-base text-white font-semibold">
            OneLink — your business, one link away.
          </p>
          <p className="text-xs text-slate-300">
            Powered by RepixelX Studio
          </p>
        </div>
      </div>
    </footer>
  )
}
