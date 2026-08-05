'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { GALLERY_ITEMS } from '../data/galleryImages'

const visibleItems = GALLERY_ITEMS.slice(0, 4)

export default function Gallery() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      visibleItems.forEach(({ src }) => {
        const img = document.createElement('img')
        img.src = src
      })
    }
  }, [])

  const handleImageClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fromGallery', 'true')
    }
    router.push('/gallery')
  }

  return (
    <section id="gallery" className="w-full max-w-md mx-auto pt-8 pb-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6"
      >
        <div className="section-title-accent mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
            Gallery
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300/90 font-normal text-left">
          Moments at Jay Ess Traders
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3.5">
        {visibleItems.map(({ src, alt }, index) => (
          <motion.div
            key={`gallery-${index}-${src}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            className="relative aspect-square rounded-[24px] overflow-hidden shadow-[0_18px_36px_rgba(0,0,0,0.24)] cursor-pointer group border border-white/10"
            onClick={handleImageClick}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 448px) 50vw, 224px"
              priority={index < 2}
            />
            <div className="absolute inset-[1px] rounded-[23px] border border-white/10 z-[1]" />
            <div className="absolute inset-x-6 top-4 h-10 rounded-full bg-white/12 blur-2xl z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent group-hover:from-black/60 transition-colors" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5"
      >
        <Link
          href="/gallery"
          onClick={() => {
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('fromGallery', 'true')
            }
          }}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#075A9C] px-5 text-sm font-black text-white shadow-[0_12px_24px_rgba(7,90,156,0.3)] transition-all hover:bg-[#086fab] active:scale-[0.98]"
        >
          <span className="flex -space-x-2" aria-hidden>
            {visibleItems.slice(0, 2).map(({ src, alt }) => (
              <Image
                key={src}
                src={src}
                alt={alt}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full border-2 border-white object-cover shadow"
              />
            ))}
          </span>
          View Gallery
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  )
}
