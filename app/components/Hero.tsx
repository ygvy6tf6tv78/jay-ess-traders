'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Clock, Store, Hand } from 'lucide-react'
import { siteConfig } from '../data/site'
import BrandBadges from './BrandBadges'
import ActionsRow from './ActionsRow'
import Card3D, { Face } from './Card3D'
import PaymentFace from './PaymentFace'
import { useLanguage } from '../contexts/LanguageContext'
import { HERO_FRONT_STYLE } from '../lib/brandStyles'

export default function Hero() {
  const { t } = useLanguage()
  const [currentFace, setCurrentFace] = useState<Face>('front')
  const [isFlipping, setIsFlipping] = useState(false)

  const handleFlip = (e?: React.MouseEvent, forceFlip = false) => {
    // Prevent flip if clicking on buttons or during animation (unless forced by flip button)
    if (isFlipping) return
    if (!forceFlip && e && (e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return
    }
    
    setIsFlipping(true)
    if (currentFace === 'front') {
      setCurrentFace('info')
    } else if (currentFace === 'info') {
      setCurrentFace('front')
    } else {
      setCurrentFace('info')
    }
    
    // Reset flipping state after animation completes
    setTimeout(() => {
      setIsFlipping(false)
    }, 650) // Slightly longer than animation duration
  }

  const handleOpenPayments = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setCurrentFace('payment')
    setTimeout(() => {
      setIsFlipping(false)
    }, 650)
  }

  const handleBackFromPayment = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => {
      setIsFlipping(false)
    }, 650)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto pt-4 pb-6 min-w-0"
      style={{ width: '100%', maxWidth: 'min(100%, 28rem)' }}
    >
      <Card3D
        currentFace={currentFace}
        isFlipping={isFlipping}
        faceFront={
          <div 
            className="rounded-[24px] relative cursor-pointer overflow-hidden"
            style={HERO_FRONT_STYLE}
            onClick={(e) => {
              const target = e.target as HTMLElement
              const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')
              const isInActionsRow = target.closest('[data-actions-row]')
              if (!isButton && !isInActionsRow) {
                handleFlip(e)
              }
            }}
          >
            {/* Inner hairline + slow edge shine (Mango-style polish) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[24px] z-[1]"
              style={{
                boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.65), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-24 rounded-t-[24px] pointer-events-none z-0 opacity-70"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
              }}
            />

            {/* Tap-to-flip pill — New Vision blue detailing */}
            {currentFace === 'front' && (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleFlip(e, true)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-10 text-xs font-semibold px-3 py-2 rounded-full cursor-pointer transition-all flex items-center gap-1.5 shadow-lg"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  color: '#1f2937',
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(10, 143, 199, 0.34)',
                  boxShadow:
                    '0 8px 18px rgba(7, 90, 156, 0.16), 0 2px 6px rgba(15, 23, 42, 0.08)',
                }}
              >
                <Hand className="w-3.5 h-3.5" style={{ color: '#475569' }} />
                <span style={{ fontSize: '12px' }}>{t('tapToFlip')}</span>
              </motion.button>
            )}

            {/* Header with actual store image */}
            <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
              <Image
                src="/logos/header.png"
                alt="Jay Ess Traders Store"
                fill
                className="object-cover object-center -rotate-2 opacity-100"
                priority
              />
              {/* Black gradient from bottom fading upward */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Content */}
            <div
              className="relative z-[5] px-4 sm:px-5 pb-6 pt-3 max-w-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.95) 36%, rgba(255,255,255,0.98) 100%)',
              }}
            >
              {/* Soft white halo behind brand info — Mango blur lift */}
              <div className="absolute inset-x-6 top-2 h-10 rounded-full bg-white/70 blur-2xl pointer-events-none" />

              {/* Floating Logo Circle — Mango infinite Y-bounce */}
              <motion.div
                className="absolute -top-14 left-6"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -4, 0],
                }}
                transition={{
                  scale: { duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
                  opacity: { duration: 0.4, delay: 0.1 },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' },
                }}
              >
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center overflow-hidden bg-white p-1.5"
                  style={{
                    border: '2px solid rgba(10, 143, 199, 0.42)',
                    boxShadow:
                      '0 14px 30px rgba(7, 90, 156, 0.2), 0 4px 10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
                  }}
                >
                  <Image
                    src="/logos/541185191_17855456889513750_6148655236123844473_n.jpg"
                    alt="Jay Ess Traders Logo"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </motion.div>

              {/* Social Icons - Same horizontal line as logo, right side */}
              <motion.div 
                className="absolute -top-[1.25rem] right-6 flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onTouchStart={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                {/* Instagram Icon */}
                {siteConfig.social.instagram && (
                  <motion.a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      window.open(siteConfig.social.instagram, '_blank', 'noopener,noreferrer')
                    }}
                    className="h-12 w-12 p-0.5 rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-all cursor-pointer touch-manipulation"
                    style={{ 
                      background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)',
                      WebkitTapHighlightColor: 'transparent',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                    title="Instagram"
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <Image
                        src="/logos/ins.jpg"
                        alt="Instagram"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.a>
                )}
              </motion.div>

              {/* Brand info — Mango sizing & rhythm */}
              <motion.div
                className="pt-[76px] mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-[26px] font-black text-slate-950 mb-1 leading-[1.08] tracking-[-0.025em]">
                  {siteConfig.name}
                </h1>
                <p
                  className="font-semibold text-[15.5px] mb-1 leading-snug"
                  style={{ color: '#075A9C' }}
                >
                  {siteConfig.tagline}
                </p>
                {(siteConfig as { serviceTagline?: string }).serviceTagline && (
                  <p className="text-[12.5px] font-semibold tracking-[0.02em] leading-snug text-slate-600">
                    {(siteConfig as { serviceTagline: string }).serviceTagline}
                  </p>
                )}
              </motion.div>

              {/* Badges — Mango spacing */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <BrandBadges />
              </motion.div>

              {/* Actions */}
              <motion.div
                data-actions-row
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <ActionsRow onOpenPayments={handleOpenPayments} />
              </motion.div>
            </div>
          </div>
        }
        faceInfo={
          <div
            className="rounded-[24px] shadow-2xl overflow-hidden cursor-pointer relative h-full flex flex-col touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%)',
              minHeight: 'min(580px, 85dvh)',
              boxSizing: 'border-box',
              WebkitTapHighlightColor: 'transparent',
              border: '2px solid rgba(59, 130, 246, 0.5)',
            }}
            onClick={(e) => {
              const target = e.target as HTMLElement
              if (target.closest('[data-no-info-flip]')) return
              handleFlip(e, true)
            }}
          >
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                handleFlip(e, true)
              }}
              className="absolute top-4 right-4 z-20 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={t('tapToReturn')}
            >
              <Hand className="w-3.5 h-3.5 text-white" />
              <span style={{ fontSize: '12px' }}>{t('tapToReturn')}</span>
            </motion.button>

            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.10) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
              }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div
              className="relative flex-1 flex flex-col items-center min-h-0 text-white overflow-y-auto overflow-x-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch] touch-pan-y"
              style={{
                paddingLeft: 'max(1rem, env(safe-area-inset-left) + 4px)',
                paddingRight: 'max(1rem, env(safe-area-inset-right) + 4px)',
                paddingTop: '4rem',
                paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom) + 1rem)',
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="w-full flex flex-col items-center max-w-[calc(100%-0.25rem)] flex-shrink-0 gap-0"
              >
                <h2 className="text-xl sm:text-2xl font-black mb-5 pt-1 pb-1 tracking-wide text-white text-center w-full [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]">
                  Business Snapshot
                </h2>

                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(239,246,255,0.94) 100%)',
                    borderColor: 'rgba(59, 130, 246, 0.35)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(7,90,156,0.28)]"
                    style={{ background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)' }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-slate-900">Location</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {siteConfig.contact.address}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(239,246,255,0.94) 100%)',
                    borderColor: 'rgba(59, 130, 246, 0.35)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(7,90,156,0.28)]"
                    style={{ background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)' }}
                  >
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-slate-900">Deals in</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {siteConfig.brands.map((b) => b.name).join(' • ')}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 w-full mb-3 rounded-[22px] p-3.5 sm:p-4 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(239,246,255,0.94) 100%)',
                    borderColor: 'rgba(59, 130, 246, 0.35)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_rgba(7,90,156,0.28)]"
                    style={{ background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)' }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-bold leading-snug text-slate-900">Timings</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {siteConfig.contact.storeHours}
                    </p>
                  </div>
                </div>

                <div
                  className="w-full h-28 sm:h-32 rounded-[22px] overflow-hidden mb-4 pointer-events-none flex-shrink-0 border shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                  style={{
                    background: 'rgba(255,255,255,0.94)',
                    borderColor: 'rgba(59, 130, 246, 0.32)',
                  }}
                >
                  <iframe
                    title="Map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div
                  className="w-full flex flex-col items-center mt-2 pt-2"
                  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                >
                  <motion.a
                    data-no-info-flip
                    href={siteConfig.google?.mapsUrl || `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 bg-white/22 hover:bg-white/30 active:bg-white/34 text-white font-semibold px-6 py-3.5 rounded-full border border-white/32 backdrop-blur-sm touch-manipulation pointer-events-auto shadow-[0_12px_28px_rgba(0,0,0,0.28)] min-h-[48px] min-w-[180px]"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    style={{
                      fontSize: 'clamp(13px, 3.5vw, 15px)',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    Open in Maps
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        }
        facePayment={
          <PaymentFace
            upiId="JKBMERC00008045@jkb"
            upiName="Jay Ess Traders"
            bank={{
              bankName: 'HDFC Bank Akhnoor',
              accountNumberMasked: '50200117924949',
              ifsc: 'HDFC0002215',
              accountHolder: 'Jay Ess Traders',
            }}
            onBack={handleBackFromPayment}
          />
        }
      />
    </motion.section>
  )
}
