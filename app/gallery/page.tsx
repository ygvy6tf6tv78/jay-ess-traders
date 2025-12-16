'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const galleryImages = [
  { src: '/gallery/81947586-5d98-4cd1-83f8-621a036ede24.jpg', alt: 'Tiles display 1' },
  { src: '/gallery/67bdec89-1436-492e-b9b9-a4f7f4e6f01b.jpg', alt: 'Tiles display 2' },
  { src: '/gallery/9c2f479d-8027-4f20-9102-4a360cb91c5c.jpg', alt: 'Tiles display 3' },
  { src: '/gallery/7e768fdd-6abc-4bf7-9919-d8b6b432afba.jpg', alt: 'Tiles display 4' },
  { src: '/gallery/d2356eb6-ad0c-41d1-9057-ff587d296666.jpg', alt: 'Tiles display 5' },
  { src: '/gallery/c30c8f8d-e079-422a-a55c-be8c8f428521.jpg', alt: 'Tiles display 6' },
]

const galleryVideos = [
  { src: '/gallery/IMG_3806.mov', alt: 'Video 1' },
  { src: '/gallery/IMG_3491.mp4', alt: 'Video 2' },
  { src: '/gallery/IMG_3498.mov', alt: 'Video 3' },
]

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <main className="min-h-screen pb-12 relative z-10 bg-[#1a1a1a]">
        {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/#gallery"
            className="p-3 hover:bg-slate-800 rounded-full transition-colors"
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('fromGallery', 'true')
              }
            }}
          >
            <ArrowLeft className="w-7 h-7 text-slate-200" />
          </Link>
          <h1 className="text-xl font-bold text-white">Gallery</h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Images Section */}
        {galleryImages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3 px-2">Photos</h2>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="rounded-2xl shadow-md aspect-square overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all relative"
                  onClick={() => {
                    setPhotoIndex(index)
                    setLightboxOpen(true)
                  }}
                  style={{ backgroundColor: '#FDFFFF', willChange: 'opacity' }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {index === 0 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/70 transition-colors">
                      <span className="text-white font-semibold text-lg">Click to View</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {galleryVideos.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-3 px-2">Videos</h2>
            <div className="grid grid-cols-2 gap-3">
              {galleryVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (galleryImages.length + index) * 0.03, duration: 0.3 }}
                  className="rounded-2xl shadow-md aspect-square overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all relative"
                  onClick={() => setSelectedVideo(video.src)}
                  style={{ backgroundColor: '#FDFFFF', willChange: 'opacity' }}
                >
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for Images */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={galleryImages}
      />

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 text-sm"
            >
              Close
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </main>
  )
}

