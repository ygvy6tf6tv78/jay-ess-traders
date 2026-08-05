'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, FileText, Download, ArrowUpRight } from 'lucide-react'
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf'
import { siteConfig } from '../data/site'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
}

export default function Brochures() {
  const [showAll, setShowAll] = useState(false)
  const displayBrochures = showAll
    ? siteConfig.brochures
    : siteConfig.brochures.slice(0, 4)

  const handleView = (href: string) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}${href}` : href
    window.open(url, '_blank')
  }

  const handleDownload = (e: React.MouseEvent, href: string, title: string) => {
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = href
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getPdfUrl = (href: string) =>
    typeof window !== 'undefined' ? `${window.location.origin}${href}` : href

  return (
    <section
      id="brochures"
      className="w-full max-w-md mx-auto pt-8 pb-6 scroll-mt-24"
    >
      <div className="mb-6">
        <div className="section-title-accent mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-left">
            Brochures
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300/90 font-normal text-left">
          Browse the latest Simpolo collection catalogues
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {displayBrochures.map((brochure, index) => (
          <motion.button
            key={brochure.href}
            type="button"
            onClick={() => handleView(brochure.href)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
            className="group relative rounded-[24px] overflow-hidden flex flex-col text-left transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(10, 143, 199, 0.26)',
              boxShadow:
                '0 16px 30px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(7, 90, 156, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
            }}
          >
            {/* Compact PDF preview cover — shorter than square */}
            <div className="relative w-full aspect-[5/4] bg-white overflow-hidden flex items-center justify-center border-b border-blue-100/70">
              <Document
                file={getPdfUrl(brochure.href)}
                loading={
                  <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
                    <FileText className="w-6 h-6 text-slate-300" />
                  </div>
                }
                error={
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center gap-1">
                    <FileText className="w-6 h-6 text-slate-400" />
                    <span className="text-[10px] text-slate-500 font-semibold">PDF</span>
                  </div>
                }
                className="w-full h-full flex items-center justify-center"
              >
                <Page
                  pageNumber={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={140}
                  className="[&>canvas]:max-w-full [&>canvas]:max-h-full [&>canvas]:object-contain"
                />
              </Document>

              <span
                className="absolute top-2 left-2 inline-flex items-center gap-1 text-[9.5px] font-bold tracking-wide px-2 py-0.5 rounded-full"
                style={{
                  background:
                    '#EEF7FF',
                  color: '#075A9C',
                  border: '1px solid rgba(10, 143, 199, 0.35)',
                  boxShadow: '0 2px 6px rgba(7, 90, 156, 0.15)',
                }}
              >
                PDF
              </span>

              <span
                role="button"
                tabIndex={0}
                onClick={(e) => handleDownload(e, brochure.href, brochure.title)}
                className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full transition-all hover:bg-blue-50"
                style={{
                  background:
                    '#FFFFFF',
                  border: '1px solid rgba(10, 143, 199, 0.35)',
                  boxShadow: '0 2px 6px rgba(7, 90, 156, 0.16)',
                }}
                aria-label={`Download ${brochure.title}`}
              >
                <Download className="w-3.5 h-3.5" style={{ color: '#075A9C' }} strokeWidth={2.4} />
              </span>
            </div>

            <div className="flex min-h-[72px] w-full flex-col justify-between bg-white px-3 py-3">
              <h3 className="text-slate-950 font-black text-[13px] leading-tight line-clamp-1">
                {brochure.title}
              </h3>
              <span className="mt-2 inline-flex items-center justify-between rounded-xl bg-[#F4F8FC] px-2.5 py-1.5 text-[10px] font-black text-[#075A9C] ring-1 ring-sky-100">
                View Brochure <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {siteConfig.brochures.length > 4 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#075A9C] px-5 text-sm font-black text-white shadow-[0_12px_24px_rgba(7,90,156,0.3)] transition-all hover:bg-[#086fab] active:scale-[0.98]"
          >
            {showAll ? (
              <>
                Show Fewer Brochures <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View All Brochures ({siteConfig.brochures.length}){' '}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  )
}
