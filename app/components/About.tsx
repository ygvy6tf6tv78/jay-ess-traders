'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '../data/site'

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 py-6"
    >
      {/* Premium outer shell — Dogra-style blue palette */}
      <div className="section-shell section-shell-blue">
        <div className="section-shell-inner p-7 sm:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#3B82F6]/22 blur-3xl" />
          <div className="absolute left-[-2rem] bottom-[-2rem] h-28 w-28 rounded-full bg-white/[0.08] blur-3xl" />

          <div className="relative">
            <div className="section-title-accent mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
                {siteConfig.about.title}
              </h2>
            </div>
            <p className="text-white/90 leading-[1.75] text-[15px]">
              {siteConfig.about.description}
            </p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-white/40 via-[#38BDF8]/65 to-transparent" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
