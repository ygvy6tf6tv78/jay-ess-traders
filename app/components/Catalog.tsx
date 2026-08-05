'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, ChevronUp, LayoutGrid, Droplets, Zap, Brush } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { siteConfig } from '../data/site'
import { GALLERY_ITEMS } from '../data/galleryImages'
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
      className="w-full max-w-md mx-auto py-6 scroll-mt-24"
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

      {/* Photo-led product cards with clear brand identity. */}
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
              className="relative rounded-[24px] overflow-hidden cursor-default group transition-all duration-300 flex flex-col p-2"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(10, 143, 199, 0.26)',
                boxShadow:
                  '0 16px 32px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(7, 90, 156, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
              }}
            >
              <div className="relative h-[102px] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-[19px] bg-[#EAF5FE]">
                  <Image
                    src={GALLERY_ITEMS[index % GALLERY_ITEMS.length].src}
                    alt={`${item.title} showroom selection`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 448px) 50vw, 210px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10" />
                </div>

                <div
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/50 bg-white/90 shadow-md backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 text-[#075A9C]" strokeWidth={2.4} />
                </div>

                <div className="absolute -bottom-0 left-2.5 flex h-14 w-14 translate-y-5 items-center justify-center overflow-hidden rounded-2xl border border-sky-100 bg-white p-1.5 shadow-[0_8px_18px_rgba(15,23,42,0.16)]">
                  {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.title}
                    fill
                    className="object-contain p-1.5"
                    sizes="56px"
                  />
                ) : (
                  <span className="text-2xl font-black text-slate-700">
                    {item.title[0]}
                  </span>
                )}
                </div>
              </div>

              <div className="flex flex-1 flex-col px-2 pb-2 pt-7 text-left">
                <h3 className="text-[14px] font-black leading-tight text-slate-950 sm:text-[15px]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[11.5px] font-medium leading-[1.45] text-slate-600 sm:text-[12px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {siteConfig.catalog.length > 4 && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky-300 hover:text-white transition-colors"
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
          className="flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl px-5 font-bold transition-all hover:-translate-y-0.5 active:scale-[0.99]"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(10, 143, 199, 0.24)',
            boxShadow:
              '0 12px 24px rgba(0, 0, 0, 0.14), 0 3px 8px rgba(7, 90, 156, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
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
