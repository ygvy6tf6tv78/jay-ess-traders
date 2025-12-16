'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const galleryImages = [
  { src: '/gallery/81947586-5d98-4cd1-83f8-621a036ede24.jpg', alt: 'Tiles display 1' },
  { src: '/gallery/67bdec89-1436-492e-b9b9-a4f7f4e6f01b.jpg', alt: 'Tiles display 2' },
  { src: '/gallery/9c2f479d-8027-4f20-9102-4a360cb91c5c.jpg', alt: 'Tiles display 3' },
  { src: '/gallery/7e768fdd-6abc-4bf7-9919-d8b6b432afba.jpg', alt: 'Tiles display 4' },
  { src: '/gallery/d2356eb6-ad0c-41d1-9057-ff587d296666.jpg', alt: 'Tiles display 5' },
  { src: '/gallery/c30c8f8d-e079-422a-a55c-be8c8f428521.jpg', alt: 'Tiles display 6' },
]

export default function Gallery() {
  const displayImages = galleryImages.slice(0, 4)

  return (
    <section id="gallery" className="w-full max-w-md mx-auto px-4 pt-8 pb-6">
      <div className="flex items-center justify-between mb-5 px-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Gallery
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* First 2 Images - Row 1 */}
        {displayImages.slice(0, 2).map((image, index) => (
          <Link key={index} href="/gallery">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className="rounded-2xl shadow-md aspect-square overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
              style={{ backgroundColor: '#FDFFFF', willChange: 'opacity' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </Link>
        ))}

        {/* Next 2 Images - Row 2 */}
        {displayImages.slice(2, 4).map((image, index) => (
          <Link key={index + 2} href="/gallery">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (index + 2) * 0.03, duration: 0.3 }}
              className="rounded-2xl shadow-md aspect-square overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
              style={{ backgroundColor: '#FDFFFF', willChange: 'opacity' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5"
      >
        <Link
          href="/gallery"
          className="block w-full bg-white text-slate-800 font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          View More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  )
}
