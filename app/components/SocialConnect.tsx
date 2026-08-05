'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { siteConfig } from '../data/site'

export default function SocialConnect() {
  const handleInstagramClick = () => {
    if (siteConfig.social.instagram) {
      window.open(siteConfig.social.instagram, '_blank')
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto py-6"
    >
      <div className="rounded-[30px] bg-[#075A9C] p-6 text-center border border-white/15 shadow-[0_20px_40px_rgba(7,90,156,0.28)]">
        {/* Logo and Instagram Icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border-2 border-white/50 overflow-hidden">
            <Image
              src="/logos/541185191_17855456889513750_6148655236123844473_n.jpg"
              alt="Jay Ess Traders"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white">
            <Image
              src="/logos/ins.jpg"
              alt="Instagram"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Follow Us on Instagram
        </h2>
        
        <p className="text-white/75 mb-6 text-sm font-medium">
          Latest updates & design inspiration
        </p>
        
        <Button
          onClick={handleInstagramClick}
          className="bg-white hover:bg-sky-50 text-[#075A9C] font-bold rounded-2xl h-12 px-8 shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current mr-2">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow @jayesstraders
        </Button>
      </div>
    </motion.section>
  )
}
