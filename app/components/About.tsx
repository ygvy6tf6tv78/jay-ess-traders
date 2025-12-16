'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '../data/site'

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto px-4 py-6"
    >
      <div className="rounded-3xl p-7 shadow-lg border border-blue-300/30 overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.8) 50%, rgba(37, 99, 235, 0.8) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}>
        <div className="relative">
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
            {siteConfig.about.title}
          </h2>
          <div className="w-16 h-1 bg-white/80 rounded-full mb-4"></div>
          <p className="text-white/95 leading-[1.7] text-[15px] font-medium">
            {siteConfig.about.description}
          </p>
        </div>
      </div>
    </motion.section>
  )
}
