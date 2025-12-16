'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Download, Hand } from 'lucide-react'
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf'
import { siteConfig } from '../data/site'
import { Button } from '@/components/ui/button'

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
}

export default function Brochures() {
  const [flippedBrochures, setFlippedBrochures] = useState<Set<string>>(new Set())
  const [showAll, setShowAll] = useState(false)

  const displayBrochures = showAll ? siteConfig.brochures : siteConfig.brochures.slice(0, 4)

  const handleFlip = (brochureHref: string) => {
    setFlippedBrochures(prev => {
      const newSet = new Set(prev)
      if (newSet.has(brochureHref)) {
        newSet.delete(brochureHref)
      } else {
        newSet.add(brochureHref)
      }
      return newSet
    })
  }

  const handleDownload = (e: React.MouseEvent, href: string, title: string) => {
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = href
    link.download = title + '.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewPDF = (e: React.MouseEvent, href: string) => {
    e.stopPropagation()
    const pdfUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${href}` 
      : href
    window.open(pdfUrl, '_blank')
  }

  const getPdfUrl = (href: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${href}`
    }
    return href
  }

  return (
    <>
      <section className="w-full max-w-md mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-5 px-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Brochures
          </h2>
          {!showAll && siteConfig.brochures.length > 4 && (
            <button
              onClick={() => setShowAll(true)}
              className="text-sm font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
            >
              View All <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {displayBrochures.map((brochure, index) => {
            const isFlipped = flippedBrochures.has(brochure.href)
            
            return (
              <motion.div
                key={brochure.href}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="relative"
                style={{ perspective: '1000px', height: '100%' }}
              >
                <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.34, 1.56, 0.64, 1],
                    type: "spring",
                    stiffness: 80,
                    damping: 15
                  }}
                >
                  {/* FRONT SIDE */}
                  <div 
                    className="rounded-2xl p-3 cursor-pointer group hover:-translate-y-1 transition-all border border-emerald-300/30 h-full backdrop-blur-md"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.6) 0%, rgba(5, 150, 105, 0.6) 50%, rgba(4, 120, 87, 0.6) 100%)',
                      willChange: 'transform',
                      transform: 'rotateY(0deg)',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08)'
                    }}
                    onClick={() => handleFlip(brochure.href)}
                  >
                    <div className="flex flex-col h-full items-center text-center justify-between">
                      <div className="w-full h-40 rounded-xl flex items-center justify-center mb-3 group-hover:scale-[1.02] transition-all overflow-hidden relative border border-white/20 backdrop-blur-sm"
                        style={{ background: 'rgba(255, 255, 255, 0.15)' }}
                      >
                        <Document
                          file={getPdfUrl(brochure.href)}
                          loading={
                            <div className="w-full h-full bg-slate-200 animate-pulse rounded-xl flex items-center justify-center">
                              <span className="text-xs text-slate-400">Loading...</span>
                            </div>
                          }
                          error={
                            <div className="w-full h-full bg-slate-200 rounded-xl flex items-center justify-center">
                              <span className="text-xs text-slate-400">PDF</span>
                            </div>
                          }
                          className="w-full h-full"
                        >
                          <Page
                            pageNumber={1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={220}
                            scale={1}
                            className="[&>canvas]:max-w-full [&>canvas]:max-h-full [&>canvas]:object-contain"
                          />
                        </Document>
                      </div>
                      <h3 className="font-bold text-white text-sm leading-tight px-1 mb-2">
                        {brochure.title}
                      </h3>
                      <div className="mt-auto pt-2 w-full">
                        <span className="text-xs text-white/90 font-semibold inline-flex items-center gap-1">
                          Open
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div 
                    className="rounded-2xl p-4 cursor-pointer border border-emerald-300/30 h-full absolute inset-0 backdrop-blur-md"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.65) 0%, rgba(5, 150, 105, 0.65) 50%, rgba(4, 120, 87, 0.65) 100%)',
                      willChange: 'transform',
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.18), 0 4px 10px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div className="flex flex-col h-full items-center justify-center gap-3">
                      <h3 className="font-bold text-white text-sm leading-tight text-center mb-2">
                        {brochure.title}
                      </h3>
                      
                      <div className="w-full space-y-2.5">
                        <Button
                          onClick={(e) => handleViewPDF(e, brochure.href)}
                          className="w-full h-11 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 flex items-center justify-center gap-2 text-sm transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View PDF
                        </Button>

                        <Button
                          onClick={(e) => handleDownload(e, brochure.href, brochure.title)}
                          className="w-full h-11 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 flex items-center justify-center gap-2 text-sm transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download PDF
                        </Button>
                      </div>

                      {/* Return Button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFlip(brochure.href)
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 text-xs text-white font-semibold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm cursor-pointer transition-all flex items-center gap-1.5 border border-white/30"
                      >
                        <Hand className="w-3.5 h-3.5 text-white" />
                        Tap to Return
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
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
    </>
  )
}
