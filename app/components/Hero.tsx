'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Clock, Store, Hand, CreditCard } from 'lucide-react'
import { siteConfig } from '../data/site'
import BrandBadges from './BrandBadges'
import ActionsRow from './ActionsRow'
import Card3D, { Face } from './Card3D'
import PaymentFace from './PaymentFace'
import { useLanguage } from '../contexts/LanguageContext'

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
      className="w-full max-w-md mx-auto px-4 pt-8 pb-6"
    >
      <Card3D
        currentFace={currentFace}
        isFlipping={isFlipping}
        faceFront={
          <div 
            className="rounded-[28px] shadow-2xl overflow-hidden border border-slate-100 relative cursor-pointer"
            style={{ backgroundColor: '#FDFFFF' }}
            onClick={(e) => {
              // Flip on click anywhere except buttons/links
              const target = e.target as HTMLElement
              // Only prevent flip if clicking directly on a button, link, or inside ActionsRow buttons area
              const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')
              const isInActionsRow = target.closest('[data-actions-row]')
              
              // Allow flip on header image, logo, text, badges - everything except buttons
              if (!isButton && !isInActionsRow) {
                handleFlip(e)
              }
            }}
          >
            {/* Flip Button - Top Right */}
            {currentFace === 'front' && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  handleFlip(e, true) // Force flip when clicking the flip button
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-10 text-xs text-slate-900 font-semibold bg-white/95 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg cursor-pointer hover:shadow-xl transition-all flex items-center gap-1.5"
              >
                <Hand className="w-3.5 h-3.5 text-slate-900" />
                {t('tapToFlip')}
              </motion.button>
            )}

            {/* Header with actual store image - horizontal */}
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
            <div className="relative px-6 pb-7 pt-3" style={{ backgroundColor: 'rgba(253, 255, 255, 0.5)' }}>
              {/* Logo Circle */}
              <motion.div 
                className="absolute -top-14 left-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl border-[5px] border-white overflow-hidden">
                  <Image
                    src="/logos/jay-ess-logo.jpg"
                    alt="JES Logo"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover scale-110"
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

              {/* Brand info */}
              <motion.div 
                className="pt-16 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-[28px] font-black text-slate-900 mb-1 leading-tight tracking-tight">
                  {siteConfig.name}
                </h1>
                <p className="text-emerald-700 font-bold text-[15px]">
                  {siteConfig.tagline}
                </p>
              </motion.div>

              {/* Badges */}
              <motion.div 
                className="mb-6"
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
            className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-[28px] shadow-2xl overflow-hidden border border-emerald-300/50 cursor-pointer relative h-full"
            onClick={handleFlip}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center h-full px-6 py-8 text-center text-white">
              <motion.div
                initial={{ opacity: 0 }}
                animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
              >
              {/* Title */}
              <h2 className="text-2xl font-black mb-6 tracking-tight drop-shadow-lg">
                Business Snapshot
              </h2>

              {/* Address */}
              <div className="flex items-start gap-3 mb-3 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md" />
                <p className="text-sm font-semibold leading-relaxed text-left drop-shadow-md">
                  Kashmir Complex, Sohal Road, Akhnoor
                </p>
              </div>

              {/* Deals */}
              <div className="flex items-start gap-3 mb-3 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <Store className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md" />
                <p className="text-sm leading-relaxed text-left drop-shadow-md">
                  <span className="font-semibold">Deals in:</span> Simpolo Tiles, Jaquar Bathware, Legrand Switches, Nerolac Paints
                </p>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3 mb-6 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <Clock className="w-5 h-5 flex-shrink-0 drop-shadow-md" />
                <p className="text-sm font-medium text-left drop-shadow-md">
                  Open: 10 AM – 7 PM
                </p>
              </div>

              {/* Google Maps Preview */}
              <div 
                className="w-full max-w-sm h-40 rounded-2xl overflow-hidden shadow-2xl mb-4 border-2 border-white/30"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Open in Maps Button */}
              <motion.a
                href="https://maps.app.goo.gl/NfaKbcaukTmfBAdJ8?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-teal-900 px-6 py-3 rounded-full shadow-2xl hover:shadow-xl transition-all font-bold border-2 border-white/50"
                onClick={(e) => e.stopPropagation()}
              >
                <MapPin className="w-5 h-5" />
                Open in Maps
              </motion.a>
            </motion.div>

            {/* Tap to Return Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFlip}
              className="absolute top-4 right-4 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5"
              aria-label={t('tapToReturn')}
            >
              <Hand className="w-3.5 h-3.5 text-white" />
              {t('tapToReturn')}
            </motion.button>
          </div>
        </div>
        }
        facePayment={
          <PaymentFace
            upiId="JKBMERC00008045@jkb"
            upiName="Jay Ess Traders"
            bank={{
              bankName: "J&K BANK CANAL ROAD",
              accountNumberMasked: "0023020100000461",
              ifsc: "JAKA0CAMPUS",
              accountHolder: "JAY ESS TRADER"
            }}
            onBack={handleBackFromPayment}
          />
        }
      />
    </motion.section>
  )
}
