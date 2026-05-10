'use client'

import { Award, BadgeCheck, Truck, Sparkles, Palette, Zap, Hand } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '../data/site'

const getBadgeIcon = (badge: string): LucideIcon => {
  const b = badge.toLowerCase()
  if (b.includes('authoris') || b.includes('dealer') || b.includes('exclusive')) return Award
  if (b.includes('curat') || b.includes('premium') || b.includes('quality')) return BadgeCheck
  if (b.includes('deliver') || b.includes('quick') || b.includes('fast')) return Truck
  if (b.includes('shine') || b.includes('finish')) return Sparkles
  if (b.includes('paint') || b.includes('shade') || b.includes('colour') || b.includes('color')) return Palette
  if (b.includes('switch') || b.includes('electric')) return Zap
  return Hand
}

export default function BrandBadges() {
  const badges = (siteConfig as { keywordBadges?: string[] }).keywordBadges ?? []

  if (badges.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {badges.map((badge) => {
        const Icon = getBadgeIcon(badge)
        return (
          <span
            key={badge}
            className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              background:
                'linear-gradient(135deg, rgba(219, 234, 254, 0.95) 0%, rgba(239, 246, 255, 0.95) 100%)',
              color: '#1D4ED8',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              boxShadow: '0 2px 6px rgba(59, 130, 246, 0.12)',
            }}
          >
            <Icon
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: '#1D4ED8' }}
              strokeWidth={2.2}
            />
            <span className="leading-none">{badge}</span>
          </span>
        )
      })}
    </div>
  )
}
