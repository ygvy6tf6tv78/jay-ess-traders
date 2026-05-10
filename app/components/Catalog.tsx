'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, ChevronUp, LayoutGrid, Droplets, Zap, Brush } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '../data/site'
import { getWhatsAppLink } from '../lib/phone'

/** Pick a category icon based on the product title so visuals match the actual category. */
function getCategoryIcon(title: string): LucideIcon {
  const t = title.toLowerCase()
  if (t.includes('tile')) return LayoutGrid
  if (t.includes('bath') || t.includes('faucet') || t.includes('shower')) return Droplets
  if (t.includes('switch') || t.includes('electric')) return Zap
  if (t.includes('paint') || t.includes('colour') || t.includes('color')) return Brush
  return LayoutGrid
}

export default function Catalog() {
  const [showAll, setShowAll] = useState(false)

  const displayItems = useMemo(
    () => (showAll ? siteConfig.catalog : siteConfig.catalog.slice(0, 4)),
    [showAll],
  )

  return (
    <motion.section
      id="products"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 py-6 scroll-mt-24"
    >
      <div className="mb-6">
        <div className="section-title-accent mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Our Products
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300/90 font-normal text-left">
          Tiles, bathware, switches & paints — curated for your project
        </p>
      </div>

      {/* Clean white tiles — brand logo + category icon, no irrelevant photo backgrounds */}
      <div className="grid grid-cols-2 gap-3.5 mb-2">
        {displayItems.map((item, index) => {
          const Icon = getCategoryIcon(item.title)
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
              className="relative rounded-[24px] overflow-hidden cursor-default group transition-all duration-300 flex flex-col items-center text-center px-3.5 pt-4 pb-4"
              style={{
                background:
                  'linear-gradient(160deg, #ffffff 0%, #F0F9FF 55%, #DBEAFE 140%)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                boxShadow:
                  '0 14px 28px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(59, 130, 246, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.92)',
              }}
            >
              <div
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, #BFDBFE 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.42)',
                  boxShadow: '0 2px 6px rgba(59, 130, 246, 0.22)',
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: '#1D4ED8' }} strokeWidth={2.2} />
              </div>

              <div className="relative w-20 h-20 sm:w-[88px] sm:h-[88px] flex items-center justify-center mb-2.5 mt-1">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.title}
                    fill
                    className="object-contain p-1"
                    sizes="96px"
                  />
                ) : (
                  <span className="text-slate-700 font-bold text-3xl">
                    {item.title[0]}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-[14px] sm:text-[15px] leading-tight text-slate-900">
                {item.title}
              </h3>
              <p className="text-[12px] sm:text-[12.5px] text-slate-600 mt-1.5 leading-snug">
                {item.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {siteConfig.catalog.length > 4 && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-amber-200 hover:text-amber-100 transition-colors"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View All ({siteConfig.catalog.length}) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Enquire on WhatsApp — Mango "View Full Menu" recipe (solid pill CTA) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mt-5"
      >
        <a
          href={getWhatsAppLink(
            siteConfig.whatsapp.defaultPhone,
            "Hi Jay Ess Traders, I'd like to enquire about your products. Please share more details.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full font-bold py-3.5 px-5 rounded-[22px] transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:scale-[0.99]"
          style={{
            background:
              'linear-gradient(160deg, #ffffff 0%, #F0F9FF 55%, #DBEAFE 140%)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            boxShadow:
              '0 12px 24px rgba(15, 23, 42, 0.08), 0 3px 8px rgba(59, 130, 246, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.92)',
            color: '#0F172A',
          }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Enquire on WhatsApp
        </a>
      </motion.div>
    </motion.section>
  )
}
