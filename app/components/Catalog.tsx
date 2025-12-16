'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { siteConfig } from '../data/site'

export default function Catalog() {
  const [showAll, setShowAll] = useState(false)

  const displayItems = showAll ? siteConfig.catalog : siteConfig.catalog.slice(0, 2)

  return (
    <section className="w-full max-w-md mx-auto px-4 pt-8 pb-6">
      <div className="flex items-center justify-between mb-5 px-2">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Our Products
        </h2>
        {!showAll && siteConfig.catalog.length > 2 && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            View All <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="rounded-2xl shadow-md p-4 hover:shadow-xl transition-all hover:scale-[1.01] border border-emerald-100/30"
            style={{ backgroundColor: '#FDFFFF', willChange: 'opacity' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-emerald-200/50">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-emerald-700 font-bold text-lg">{item.title[0]}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-base mb-0.5">{item.title}</h3>
                <p className="text-[13px] text-slate-600 leading-tight font-medium">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showAll && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(false)}
            className="text-sm font-semibold text-slate-500 hover:text-slate-700"
          >
            Show Less
          </button>
        </div>
      )}
    </section>
  )
}
