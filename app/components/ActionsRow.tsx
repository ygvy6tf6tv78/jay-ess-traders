'use client'

import { useState, useRef, useEffect } from 'react'
import { Phone, Download, Share2, MapPin, Star, X, PackageCheck, FileText, BookOpen, Headphones } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig } from '../data/site'
import { GALLERY_ITEMS } from '../data/galleryImages'
import { getTelLink, getWhatsAppLink, formatPhone } from '../lib/phone'
import { generateVCard, downloadVCard } from '../lib/vcard'
import { useLanguage } from '../contexts/LanguageContext'
import {
  PAYMENT_BUTTON_STYLE,
  PAYMENT_BUTTON_HOVER_STYLE,
  CALL_BUTTON_STYLE,
  CALL_BUTTON_HOVER_STYLE,
} from '../lib/brandStyles'

interface ActionsRowProps {
  onOpenPayments?: () => void
}

export default function ActionsRow({ onOpenPayments }: ActionsRowProps) {
  const { t } = useLanguage()
  const [callDialogOpen, setCallDialogOpen] = useState(false)
  const [whatsappDialogOpen, setWhatsappDialogOpen] = useState(false)
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
    setWhatsappDialogOpen(true)
  }

  const handleWhatsAppClick = (phone: string) => {
    const link = getWhatsAppLink(
      phone,
      siteConfig.whatsapp.defaultMessage
    )
    window.open(link, '_blank')
    setWhatsappDialogOpen(false)
  }

  const handleDirections = () => {
    window.open('https://maps.app.goo.gl/NfaKbcaukTmfBAdJ8?g_st=ipc', '_blank')
  }

  const handleSaveContact = () => {
    const phones = siteConfig.contact.phones.map(p => typeof p === 'string' ? p : p.number)
    const vcard = generateVCard({
      name: siteConfig.name,
      organization: siteConfig.name,
      title: siteConfig.tagline,
      phones: phones,
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
    if (siteConfig.google?.mapsUrl) {
      window.open(siteConfig.google.mapsUrl, '_blank')
    }
  }

  const scrollToSection = (id: string) => {
    if (typeof window === 'undefined') return
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <div className="grid w-full min-w-0 max-w-full grid-cols-2 gap-2.5" onClick={(e) => e.stopPropagation()}>
        {/* Row 1: Call Now + Payment — Mango gradient + sizing */}
        <div className="contents">
          <Button
            ref={callButtonRef}
            data-call-button
            onClick={(e) => {
              e.stopPropagation()
              setCallDialogOpen(true)
            }}
            className="order-1 w-full min-w-0 h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden group"
            style={{
              ...CALL_BUTTON_STYLE,
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)',
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, CALL_BUTTON_HOVER_STYLE)
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, CALL_BUTTON_STYLE)
              e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
            }}
          >
            <Phone
              className="w-4 h-4 relative z-10"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }}
            />
            <span
              className="text-sm font-bold relative z-10 truncate"
              style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
            >
              {t('callNow')}
            </span>
          </Button>

          {onOpenPayments && (
            <div className="order-2 min-w-0 relative">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenPayments()
                }}
                className="w-full min-w-0 h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden group"
                style={{
                  ...PAYMENT_BUTTON_STYLE,
                  WebkitTapHighlightColor: 'transparent',
                  transform: 'translateY(-1px)',
                }}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, PAYMENT_BUTTON_HOVER_STYLE)
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, PAYMENT_BUTTON_STYLE)
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
                }}
              >
                <Image
                  src="/logos/icons8-bhim-48.png"
                  alt="Payment"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain relative z-10"
                  style={{
                    filter:
                      'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                  }}
                />
                <span
                  className="text-sm font-bold relative z-10 truncate"
                  style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}
                >
                  {t('openPayment')}
                </span>
              </Button>
            </div>
          )}
        </div>

      {/* Menu/Order & Location buttons */}
      <div className="contents">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            handleWhatsApp()
          }}
          className="order-7 min-w-0 h-11 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation border"
          style={{ 
            color: '#0F172A',
            background: '#FFFFFF',
            borderColor: 'rgba(37, 211, 102, 0.22)',
            boxShadow: '0 9px 18px rgba(0, 0, 0, 0.16), 0 4px 9px rgba(37, 211, 102, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
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
            e.currentTarget.style.boxShadow = '0 9px 18px rgba(0, 0, 0, 0.16), 0 4px 9px rgba(37, 211, 102, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <div className="w-5 h-5 relative">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-green-600">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>WhatsApp</span>
        </Button>

        <Button
          onClick={handleDirections}
          className="order-8 min-w-0 h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation"
          style={{ 
            color: '#0F172A',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
        >
          <MapPin className="w-5 h-5" style={{ color: '#EF4444', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} strokeWidth={2.5} />
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Location</span>
        </Button>
      </div>

      {/* Reviews and Share */}
      <div className="contents">
        <Link
          href="/reviews"
          onClick={(e) => e.stopPropagation()}
          className="order-9 min-w-0 h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation"
          style={{ 
            color: '#0F172A',
            boxShadow: '0 8px 16px rgba(234, 179, 8, 0.25), 0 4px 8px rgba(234, 179, 8, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
        >
          <Star className="w-4 h-4" style={{ color: '#EAB308' }} fill="#EAB308" strokeWidth={2.4} />
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Reviews</span>
        </Link>

        <Button
          onClick={handleShare}
          className="order-12 min-w-0 h-11 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation border"
          style={{ 
            color: '#0F172A',
            borderColor: 'rgba(10, 143, 199, 0.22)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F7FD 100%)',
            boxShadow: '0 9px 18px rgba(7, 90, 156, 0.17), 0 4px 9px rgba(15, 23, 42, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.96)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 11px 22px rgba(7, 90, 156, 0.17), 0 6px 12px rgba(43, 162, 76, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 9px 18px rgba(7, 90, 156, 0.17), 0 4px 9px rgba(15, 23, 42, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.96)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <Share2 className="w-4 h-4" style={{ color: '#075A9C' }} strokeWidth={2.4} />
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Share Card</span>
        </Button>
      </div>

      {/* Products & Brochures buttons – smooth scroll to home sections */}
      <div className="contents">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            scrollToSection('products')
          }}
          className="order-3 min-w-0 h-11 rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation border"
          style={{
            color: '#075A9C',
            background: '#FFFFFF',
            borderColor: 'rgba(10, 143, 199, 0.32)',
            boxShadow:
              '0 9px 18px rgba(7, 90, 156, 0.18), 0 4px 9px rgba(15, 23, 42, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.94)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              '0 12px 24px rgba(7, 90, 156, 0.22), 0 6px 12px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              '0 9px 18px rgba(7, 90, 156, 0.18), 0 4px 9px rgba(15, 23, 42, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.94)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FF] ring-1 ring-sky-200/90 shadow-sm">
            <PackageCheck className="h-4 w-4" style={{ color: '#075A9C' }} strokeWidth={2.5} />
          </span>
          <span className="text-sm font-bold" style={{ color: '#075A9C', fontSize: '14px' }}>
            Products
          </span>
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            scrollToSection('brochures')
          }}
          className="order-4 min-w-0 h-11 rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation border"
          style={{
            color: '#0F172A',
            background: '#FFFFFF',
            borderColor: 'rgba(29, 78, 216, 0.24)',
            boxShadow:
              '0 9px 18px rgba(29, 78, 216, 0.14), 0 4px 9px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.94)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              '0 9px 18px rgba(29, 78, 216, 0.14), 0 4px 9px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.94)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] ring-1 ring-indigo-200/90 shadow-sm">
            <BookOpen className="h-4 w-4" style={{ color: '#1D4ED8' }} strokeWidth={2.5} />
          </span>
          <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>
            Brochures
          </span>
        </Button>
      </div>

      {/* Services & Support — New Vision subpage actions */}
      <div className="contents">
        <Link
          href="/services"
          onClick={(e) => e.stopPropagation()}
          className="order-5 min-w-0 h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation border"
          style={{
            color: '#0F172A',
            borderColor: 'rgba(10, 143, 199, 0.3)',
            boxShadow: '0 9px 18px rgba(7, 90, 156, 0.17), 0 4px 9px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.94)',
            borderRadius: '16px',
            transform: 'translateY(-1px)',
          }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#F0F8FF] ring-1 ring-sky-200/90 shadow-sm">
            <FileText className="h-4 w-4" style={{ color: '#075A9C' }} strokeWidth={2.5} />
          </span>
          <span className="truncate text-sm font-bold">Services</span>
        </Link>

        <Link
          href="/support"
          onClick={(e) => e.stopPropagation()}
          className="order-6 min-w-0 h-11 rounded-2xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation border"
          style={{
            color: '#0F766E',
            background: '#FFFFFF',
            borderColor: 'rgba(15, 118, 110, 0.28)',
            boxShadow: '0 9px 18px rgba(15, 118, 110, 0.15), 0 4px 9px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.94)',
            borderRadius: '16px',
            transform: 'translateY(-1px)',
          }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] ring-1 ring-teal-200/90 shadow-sm">
            <Headphones className="h-4 w-4" style={{ color: '#0F766E' }} strokeWidth={2.5} />
          </span>
          <span className="truncate text-sm font-bold text-slate-900">Support</span>
        </Link>
      </div>

      {/* Save Contact & View Gallery — Mango shimmer + 2-circle gallery preview */}
      <div className="contents">
        <Button
          onClick={handleSaveContact}
          className="order-11 w-full min-w-0 h-11 bg-white/90 hover:bg-white backdrop-blur-md text-slate-700 rounded-2xl border-2 border-blue-500/70 hover:border-blue-600/90 relative overflow-hidden transition-all touch-manipulation"
          style={{
            boxShadow:
              '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            fontSize: '14px',
            WebkitTapHighlightColor: 'transparent',
            transform: 'translateY(-1px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              '0 10px 20px rgba(59, 130, 246, 0.25), 0 6px 12px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" style={{ color: '#1D4ED8' }} strokeWidth={2.4} />
            <span className="text-sm font-bold truncate" style={{ fontSize: '14px' }}>
              {t('saveContact')}
            </span>
          </div>
        </Button>

        <Link
          href="/gallery"
          className="order-10 min-w-0 h-11 bg-white backdrop-blur-md hover:bg-white rounded-2xl border transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-[0.97] touch-manipulation"
          style={{
            color: '#0F172A',
            borderColor: 'rgba(10, 143, 199, 0.18)',
            boxShadow:
              '0 9px 18px rgba(0, 0, 0, 0.16), 0 4px 9px rgba(7, 90, 156, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            borderRadius: '16px',
            WebkitTapHighlightColor: 'transparent',
            fontSize: '14px',
            transform: 'translateY(-1px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              '0 9px 18px rgba(0, 0, 0, 0.16), 0 4px 9px rgba(7, 90, 156, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
        >
          <div className="flex items-center -space-x-1.5 relative z-10">
            {GALLERY_ITEMS.slice(0, 2).map((item) => (
              <div
                key={item.src}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden relative border border-white"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-sm font-bold truncate" style={{ color: '#0F172A', fontSize: '14px' }}>
            Gallery
          </span>
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
                <div className="text-base font-semibold text-slate-800">Select Number to Call</div>
                <button
                  onClick={() => setCallDialogOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {siteConfig.contact.phones.map((phoneItem, index) => {
                  const phone = typeof phoneItem === 'string' ? phoneItem : phoneItem.number
                  const label = typeof phoneItem === 'string' ? undefined : phoneItem.label
                  
                  return (
                    <motion.button
                      key={phone}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleCall(phone)}
                      className="flex flex-col items-center gap-2 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                      {label && <span className="text-xs font-semibold text-slate-800 text-center">{label}</span>}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsApp Selector - Bottom Pop-out with Animation */}
      <AnimatePresence>
        {whatsappDialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWhatsappDialogOpen(false)}
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
                <div className="text-base font-semibold text-slate-800">Select Number for WhatsApp</div>
                <button
                  onClick={() => setWhatsappDialogOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {siteConfig.contact.phones.map((phoneItem, index) => {
                  const phone = typeof phoneItem === 'string' ? phoneItem : phoneItem.number
                  const label = typeof phoneItem === 'string' ? undefined : phoneItem.label
                  
                  return (
                    <motion.button
                      key={phone}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleWhatsAppClick(phone)}
                      className="flex flex-col items-center gap-2 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20BA5A] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      {label && <span className="text-xs font-semibold text-slate-800 text-center">{label}</span>}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
