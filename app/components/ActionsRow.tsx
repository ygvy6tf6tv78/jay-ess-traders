'use client'

import { useState, useRef, useEffect } from 'react'
import { Phone, Download, Share2, Navigation, CreditCard, MapPin, Star, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../data/site'
import { getTelLink, getWhatsAppLink, formatPhone } from '../lib/phone'
import { generateVCard, downloadVCard } from '../lib/vcard'
import { useLanguage } from '../contexts/LanguageContext'

interface ActionsRowProps {
  onOpenPayments?: () => void
}

export default function ActionsRow({ onOpenPayments }: ActionsRowProps) {
  const { t } = useLanguage()
  const [callDialogOpen, setCallDialogOpen] = useState(false)
  const callButtonRef = useRef<HTMLButtonElement>(null)
  const [dialogPosition, setDialogPosition] = useState({ top: '10%', left: '50%' })

  const handleCall = (phone: string) => {
    window.location.href = getTelLink(phone)
    setCallDialogOpen(false)
  }

  useEffect(() => {
    if (callDialogOpen) {
      // Position dialog above the Hero card - at top of viewport
      setDialogPosition({
        top: '10%',
        left: '50%'
      })
    }
  }, [callDialogOpen])

  const handleWhatsApp = () => {
    const link = getWhatsAppLink(
      siteConfig.whatsapp.defaultPhone,
      siteConfig.whatsapp.defaultMessage
    )
    window.open(link, '_blank')
  }

  const handleDirections = () => {
    window.open('https://maps.app.goo.gl/NfaKbcaukTmfBAdJ8?g_st=ipc', '_blank')
  }

  const handleSaveContact = () => {
    const vcard = generateVCard({
      name: siteConfig.name,
      organization: siteConfig.name,
      title: siteConfig.tagline,
      phones: siteConfig.contact.phones,
      email: siteConfig.contact.email,
      address: siteConfig.contact.address,
      website: siteConfig.url,
    })
    downloadVCard(vcard, 'jay-ess-traders.vcf')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: siteConfig.name,
          text: `Check out ${siteConfig.name} - ${siteConfig.tagline}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleReviews = () => {
    // Open Google Maps for reviews
    if (siteConfig.google?.mapsUrl) {
      window.open(siteConfig.google.mapsUrl, '_blank')
    }
  }

  return (
    <>
      <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
        {/* Call & Payment buttons */}
        <div className="flex gap-2">
          <Button
            ref={callButtonRef}
            onClick={(e) => {
              e.stopPropagation()
              setCallDialogOpen(true)
            }}
            className="flex-1 h-11 text-white font-bold rounded-full border border-white/30 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
              boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(16, 185, 129, 0.5), 0 4px 8px 0 rgba(0, 0, 0, 0.15), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(16, 185, 129, 0.39), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div className="relative z-10 flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              {t('callNow')}
            </div>
          </Button>
          {onOpenPayments && (
            <div className="flex-1 relative">
              {/* NEW Badge - Red color, centered on top edge */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md border border-red-600/50 whitespace-nowrap">
                  NEW
                </span>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenPayments()
                }}
                className="w-full h-11 text-white font-bold rounded-full border border-white/30 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
                  boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.39), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(14, 165, 233, 0.5), 0 4px 8px 0 rgba(0, 0, 0, 0.15), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(14, 165, 233, 0.39), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 -2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="relative z-10 flex items-center justify-center pointer-events-none">
                  <Image
                    src="/logos/icons8-bhim-48.png"
                    alt="BHIM"
                    width={16}
                    height={16}
                    className="w-4 h-4 mr-2 object-contain pointer-events-none"
                  />
                  <span className="pointer-events-none">{t('openPayment')}</span>
                </div>
              </Button>
            </div>
          )}
        </div>

      {/* Menu/Order & Location buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={handleWhatsApp}
          className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
          style={{ 
            color: '#0F172A',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <div className="w-4 h-4 relative">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-green-600">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>WhatsApp</span>
        </Button>

        <Button
          onClick={handleDirections}
          className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
          style={{ 
            color: '#0F172A',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <MapPin className="w-4 h-4" style={{ color: '#EF4444', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Location</span>
        </Button>
      </div>

      {/* Reviews and Share */}
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/reviews"
          onClick={(e) => e.stopPropagation()}
          className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
          style={{ 
            color: '#0F172A',
            boxShadow: '0 8px 16px rgba(234, 179, 8, 0.25), 0 4px 8px rgba(234, 179, 8, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(234, 179, 8, 0.3), 0 6px 12px rgba(234, 179, 8, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(234, 179, 8, 0.25), 0 4px 8px rgba(234, 179, 8, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <Star className="w-4 h-4" style={{ color: '#EAB308' }} fill="#EAB308" />
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Reviews</span>
        </Link>

        <Button
          onClick={handleShare}
          className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
          style={{ 
            color: '#0F172A',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <Share2 className="w-4 h-4" style={{ color: '#3B82F6' }} />
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Share</span>
        </Button>
      </div>

      {/* Save Contact & View Gallery buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={handleSaveContact}
          className="h-11 bg-white/80 hover:bg-white/90 backdrop-blur-md text-slate-700 font-medium rounded-2xl shadow-lg border-2 border-emerald-500/70 hover:border-emerald-600/90 relative overflow-hidden transition-all"
          style={{
            boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 0 rgba(16, 185, 129, 0.4), 0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Animated border highlight glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
          <div className="relative z-10 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            {t('saveContact')}
          </div>
        </Button>
        <Link 
          href="/gallery" 
          className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
          style={{
            color: '#0F172A',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>View Gallery</span>
          <div className="flex items-center gap-0.5">
            <Image
              src="/gallery/81947586-5d98-4cd1-83f8-621a036ede24.jpg"
              alt="Gallery"
              width={14}
              height={14}
              className="rounded-sm object-cover border border-slate-200"
            />
            <Image
              src="/gallery/67bdec89-1436-492e-b9b9-a4f7f4e6f01b.jpg"
              alt="Gallery"
              width={14}
              height={14}
              className="rounded-sm object-cover border border-slate-200"
            />
          </div>
        </Link>
      </div>
      </div>

      {/* Call Selector - Bottom Pop-out with Animation */}
      <AnimatePresence>
        {callDialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCallDialogOpen(false)}
              className="fixed inset-0 bg-black/20 z-[9998] backdrop-blur-sm"
            />
            
            {/* Popup */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
              style={{ 
                paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                maxHeight: '80vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-base font-bold text-slate-800">Select Number</div>
                <button
                  onClick={() => setCallDialogOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="space-y-3">
                {siteConfig.contact.phones.map((phone, index) => (
                  <motion.button
                    key={phone}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleCall(phone)}
                    className="w-full text-white font-semibold py-3 px-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    {formatPhone(phone)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
