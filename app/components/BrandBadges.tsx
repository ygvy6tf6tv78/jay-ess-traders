'use client'

import Image from 'next/image'
import { siteConfig } from '../data/site'

export default function BrandBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {siteConfig.brands.map((brand) => (
        <div
          key={brand.name}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200/70 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-0.5 overflow-hidden shadow-sm">
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={brand.name}
                width={20}
                height={20}
                className="w-full h-full object-contain rounded-full"
              />
            ) : (
              <span className="text-xs font-bold text-emerald-600">{brand.name[0]}</span>
            )}
          </div>
          <span className="text-xs font-bold text-emerald-800">{brand.name}</span>
        </div>
      ))}
    </div>
  )
}
