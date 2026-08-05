'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '../data/site'
import { formatPhone, getTelLink } from '../lib/phone'

/** Premium contact surfaces matched to the New Vision implementation. */
const CARD_BG = '#FFFFFF'
const CARD_BORDER = '1px solid rgba(226, 232, 240, 0.95)'
const CARD_SHADOW =
  '0 10px 26px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)'

const ICON_PILL_STYLE: React.CSSProperties = {
  background:
    '#EEF7FF',
  border: '1px solid rgba(10, 143, 199, 0.5)',
  boxShadow: '0 2px 8px rgba(7, 90, 156, 0.24)',
}

const CTA_CLASSES =
  'w-full h-10 text-white font-semibold rounded-xl border-0 shadow-md hover:opacity-95 transition-opacity'
const CTA_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)',
}

export default function ContactCard() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const openMap = () => {
    window.open('https://maps.app.goo.gl/NfaKbcaukTmfBAdJ8?g_st=ipc', '_blank')
  }

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto py-5"
    >
      <div
        className="rounded-[30px] border p-3.5 shadow-[0_18px_40px_rgba(7,90,156,0.18)]"
        style={{
          background: 'linear-gradient(145deg, #075A9C 0%, #0A8FC7 58%, #044893 100%)',
          borderColor: 'rgba(255,255,255,0.14)',
        }}
      >
        <div
          className="relative overflow-hidden rounded-[26px] p-3.5"
          style={{ background: 'linear-gradient(145deg, #075A9C 0%, #0A8FC7 58%, #044893 100%)' }}
        >
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#0A8FC7]/22 blur-3xl" />
          <div className="absolute left-[-2rem] bottom-[-2rem] h-20 w-20 rounded-full bg-white/[0.08] blur-3xl" />

          <div className="section-title-accent mb-6">
            <h2 className="text-[30px] sm:text-[34px] font-black tracking-tight leading-tight text-white text-left">
              Get in Touch
            </h2>
          </div>

          <div className="space-y-4">
            {/* Phone — multi-number list with Call buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
              className="rounded-[24px] p-4 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-[24px] pointer-events-none opacity-60"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
              />
              <div className="flex items-start gap-3 mb-1 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#075A9C' }} fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 mb-2 text-base">Phone</h3>
                  <div className="space-y-2">
                    {siteConfig.contact.phones.map((phoneItem) => {
                      const phone = typeof phoneItem === 'string' ? phoneItem : phoneItem.number
                      const label = typeof phoneItem === 'string' ? undefined : phoneItem.label
                      return (
                        <div key={phone} className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            {label && (
                              <div className="text-sm font-semibold text-slate-900">{label}</div>
                            )}
                            <div className="text-xs text-slate-600">{formatPhone(phone)}</div>
                          </div>
                          <Button
                            onClick={() => (window.location.href = getTelLink(phone))}
                            className="h-8 px-3 text-white text-xs font-semibold rounded-full border-0 shadow-md hover:opacity-95"
                            style={CTA_STYLE}
                          >
                            Call
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email Us */}
            {siteConfig.contact?.email && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
              className="rounded-[24px] p-4 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1/2 rounded-t-[24px] pointer-events-none opacity-60"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
                />
                <div className="flex items-start gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#075A9C' }} fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1.5 text-base">Email Us</h3>
                    <p className="text-sm text-slate-600 break-all">{siteConfig.contact.email}</p>
                  </div>
                </div>
                <Button asChild className={CTA_CLASSES} style={CTA_STYLE}>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                      'Enquiry - Jay Ess Traders',
                    )}&body=${encodeURIComponent(
                      'Hello,\n\nI would like to enquire about your products.\n\nPlease reply at your convenience.\n\nThank you.',
                    )}`}
                  >
                    <Mail className="w-4 h-4 mr-2 text-white" />
                    Email Us
                  </a>
                </Button>
              </motion.div>
            )}

            {/* Address with Map */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
              className="rounded-[24px] overflow-hidden hover:shadow-xl transition-all duration-300 relative"
              style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
            >
              <div
                className="absolute inset-x-0 top-0 h-20 rounded-t-[24px] pointer-events-none opacity-60 z-10"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
              />
              <div className="p-4 relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#075A9C' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1.5 text-base">Location</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {siteConfig.contact.address}
                    </p>
                  </div>
                </div>
                <Button onClick={openMap} className={CTA_CLASSES} style={CTA_STYLE}>
                  <MapPin className="w-4 h-4 mr-2 text-white" />
                  Open in Maps
                </Button>
              </div>

              {/* Embedded Map */}
              <div className="h-48 bg-slate-800/50 backdrop-blur-sm">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Store Hours */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2, duration: 0.3, ease: 'easeOut' }}
              className="rounded-[24px] p-4 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              style={{ willChange: 'opacity', background: CARD_BG, border: CARD_BORDER, boxShadow: CARD_SHADOW }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-[24px] pointer-events-none opacity-60"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)' }}
              />
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={ICON_PILL_STYLE}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: '#075A9C' }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 mb-1.5 text-base">Store Hours</h3>
                  <p className="text-sm text-slate-600">
                    {siteConfig.contact.storeHours}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
