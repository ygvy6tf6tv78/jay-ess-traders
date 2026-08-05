'use client'

import { Award, BadgeCheck, Sparkles, Palette, Zap, Hand } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '../data/site'

const getBadgeIcon = (badge: string): LucideIcon => {
  const b = badge.toLowerCase()
  if (b.includes('authoris') || b.includes('dealer') || b.includes('exclusive')) return Award
  if (b.includes('curat') || b.includes('premium') || b.includes('quality')) return BadgeCheck
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
            className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] font-bold whitespace-nowrap"
            style={{
              background:
                'linear-gradient(135deg, rgba(239, 246, 255, 0.98) 0%, rgba(234, 246, 255, 0.98) 100%)',
              color: '#075A9C',
              border: '1px solid rgba(10, 143, 199, 0.32)',
              boxShadow: '0 3px 8px rgba(7, 90, 156, 0.14)',
            }}
          >
            <Icon
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: '#075A9C' }}
              strokeWidth={2.2}
            />
            <span className="leading-none">{badge}</span>
          </span>
        )
      })}
    </div>
  )
}
