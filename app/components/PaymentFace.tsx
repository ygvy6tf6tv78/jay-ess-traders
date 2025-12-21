'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, ArrowLeft, Check, CreditCard, Shield, Lock } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'

interface PaymentFaceProps {
  upiId: string
  upiName: string
  amountINR?: number
  upiQrImageUrl?: string
  bank?: {
    bankName: string
    accountNumberMasked: string
    ifsc: string
    accountHolder: string
  }
  onBack: () => void
}

// Build UPI deep link - Secure and properly encoded
function buildUpiLink(upiId: string, upiName: string, amount?: number): string {
  // URLSearchParams automatically encodes special characters like @
  const params = new URLSearchParams({
    pa: upiId, // Payee Address (UPI ID) - @ symbol will be encoded as %40
    pn: upiName, // Payee Name
    cu: 'INR', // Currency
  })
  if (amount && amount > 0) {
    params.set('am', amount.toString())
  }
  return `upi://pay?${params.toString()}`
}

// Copy to clipboard with toast
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return { copy, copied }
}

export default function PaymentFace({
  upiId,
  upiName,
  amountINR,
  upiQrImageUrl,
  bank,
  onBack,
}: PaymentFaceProps) {
  const { t } = useLanguage()
  const { copy: copyUpi, copied: upiCopied } = useCopyToClipboard()
  const { copy: copyBank, copied: bankCopied } = useCopyToClipboard()
  const { copy: copyAccountHolder, copied: accountHolderCopied } = useCopyToClipboard()
  const { copy: copyBankName, copied: bankNameCopied } = useCopyToClipboard()
  const { copy: copyAccountNumber, copied: accountNumberCopied } = useCopyToClipboard()
  const { copy: copyIFSC, copied: ifscCopied } = useCopyToClipboard()
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [bankTransferModalOpen, setBankTransferModalOpen] = useState(false)

  const upiLink = buildUpiLink(upiId, upiName, amountINR)

  // Build Paytm app deep link with UPI ID - Secure and optimized
  const buildPaytmLink = () => {
    // URLSearchParams automatically encodes @ symbol as %40
    const params = new URLSearchParams({
      pa: upiId, // Payee Address (UPI ID) - Same account for all apps
      pn: upiName, // Payee Name
      cu: 'INR', // Currency
    })
    if (amountINR && amountINR > 0) {
      params.set('am', amountINR.toString()) // Amount
    }
    // Paytm deep link - opens Paytm app directly with pre-filled UPI ID
    return `paytmmp://pay?${params.toString()}`
  }

  // Build Google Pay deep link - Secure and optimized
  const buildGooglePayLink = () => {
    // URLSearchParams automatically encodes @ symbol as %40
    const params = new URLSearchParams({
      pa: upiId, // Payee Address (UPI ID) - Same account for all apps
      pn: upiName, // Payee Name
      cu: 'INR', // Currency
    })
    if (amountINR && amountINR > 0) {
      params.set('am', amountINR.toString()) // Amount
    }
    // Google Pay deep link - opens Google Pay app directly with pre-filled UPI ID
    return `tez://upi/pay?${params.toString()}`
  }

  // Build PhonePe UPI link - Secure and optimized
  const buildPhonePeLink = () => {
    // URLSearchParams automatically encodes @ symbol as %40
    const params = new URLSearchParams({
      pa: upiId, // Payee Address (UPI ID) - Same account for all apps
      pn: upiName, // Payee Name
      cu: 'INR', // Currency
    })
    if (amountINR && amountINR > 0) {
      params.set('am', amountINR.toString()) // Amount
    }
    // PhonePe deep link - opens PhonePe app directly with pre-filled UPI ID
    return `phonepe://pay?${params.toString()}`
  }

  const handlePayWithPaytm = () => {
    try {
      const paytmLink = buildPaytmLink()
      setPaymentModalOpen(false)
      
      // Open Paytm app with UPI ID pre-filled
      window.location.href = paytmLink
      
      // Smart fallback: if Paytm app doesn't open, use standard UPI link
      setTimeout(() => {
        if (document.hasFocus()) {
          // App didn't open, fallback to standard UPI
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      // Fallback to standard UPI link on error
      window.open(upiLink, '_blank')
      setPaymentModalOpen(false)
    }
  }

  const handlePayWithGooglePay = () => {
    try {
      const googlePayLink = buildGooglePayLink()
      setPaymentModalOpen(false)
      
      // Open Google Pay app with UPI ID pre-filled
      window.location.href = googlePayLink
      
      // Smart fallback: if Google Pay app doesn't open, use standard UPI link
      setTimeout(() => {
        if (document.hasFocus()) {
          // App didn't open, fallback to standard UPI
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      // Fallback to standard UPI link on error
      window.open(upiLink, '_blank')
      setPaymentModalOpen(false)
    }
  }

  const handlePayWithPhonePe = () => {
    try {
      const phonePeLink = buildPhonePeLink()
      setPaymentModalOpen(false)
      
      // Open PhonePe app with UPI ID pre-filled
      window.location.href = phonePeLink
      
      // Smart fallback: if PhonePe app doesn't open, use standard UPI link
      setTimeout(() => {
        if (document.hasFocus()) {
          // App didn't open, fallback to standard UPI
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      // Fallback to standard UPI link on error
      window.open(upiLink, '_blank')
      setPaymentModalOpen(false)
    }
  }

  const handleCopyUpi = () => {
    copyUpi(upiId)
  }

  const handleCopyBank = () => {
    if (bank) {
      const bankDetails = `Bank: ${bank.bankName}\nAccount: ${bank.accountNumberMasked}\nIFSC: ${bank.ifsc}\nHolder: ${bank.accountHolder}`
      copyBank(bankDetails)
    }
  }

  const handleCopyAccountHolder = () => {
    if (bank) {
      copyAccountHolder(bank.accountHolder)
    }
  }

  const handleCopyBankName = () => {
    if (bank) {
      copyBankName(bank.bankName)
    }
  }

  const handleCopyAccountNumber = () => {
    if (bank) {
      copyAccountNumber(bank.accountNumberMasked)
    }
  }

  const handleCopyIFSC = () => {
    if (bank) {
      copyIFSC(bank.ifsc)
    }
  }

  // Handle Escape key to go back
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onBack])

  return (
    <div
      className="rounded-[28px] shadow-2xl overflow-y-auto border border-slate-800 relative w-full"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #157C82 0%, #111315 100%)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
        minHeight: '580px'
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-6 text-center" style={{ minHeight: '100%', paddingBottom: '1.5rem', pointerEvents: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full max-w-sm"
        >
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
              {t('securePayment')}
            </h2>
            <div className="flex items-center justify-center gap-2 text-white/70 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>{t('secureEncrypted')}</span>
            </div>
          </motion.div>

          {/* Transfer via Bank Button */}
          {bank && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="mb-4"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setBankTransferModalOpen(true)
                }}
                className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-bold py-3 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-20 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label={t('transferViaBank')}
              >
                <CreditCard className="w-5 h-5 pointer-events-none" />
                <span className="pointer-events-none">{t('transferViaBank')}</span>
              </motion.button>
            </motion.div>
          )}

          {/* Payment Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="space-y-2.5 mb-3 relative z-20"
          >
            {/* Pay via UPI Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setPaymentModalOpen(true)
              }}
              className="w-full bg-[#00BAF2] hover:bg-[#0099CC] text-white font-bold py-3 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer relative z-30 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="Pay via UPI"
            >
              {/* Horizontal Payment Logos */}
              <div className="flex items-center gap-1.5">
                <Image
                  src="/logos/icons8-paytm-48.png"
                  alt="Paytm"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <Image
                  src="/logos/icons8-google-pay-48.png"
                  alt="Google Pay"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <Image
                  src="/logos/icons8-phone-pe-48.png"
                  alt="PhonePe"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span>{t('payViaUPI')}</span>
            </motion.button>

            {/* Back Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onBack()
              }}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label={t('backToDetails')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToDetails')}</span>
            </motion.button>
          </motion.div>

          {/* Helper Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mt-4"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-400" />
              <p className="text-white/80 text-xs font-medium">
                {t('securePaymentGateway')}
              </p>
            </div>
            <p className="text-white/60 text-xs">
              {t('worksWith')}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* OneLink Branding - Bottom Edge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 pb-3 pt-2 px-4"
      >
        <div className="flex items-center justify-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <Shield className="w-3.5 h-3.5" style={{ color: '#ffffff' }} />
            <span 
              className="text-xs font-semibold flex items-center gap-1.5"
              style={{ 
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              Secure payment gateway
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
              OneLink
            </span>
            <Image
              src="/gallery/onelink.png"
              alt="OneLink Logo"
              width={32}
              height={11}
              className="opacity-100 brightness-0 invert"
              quality={100}
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Payment Options Modal - Same Card */}
      <AnimatePresence>
        {paymentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-[28px] flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(21, 124, 130, 0.95) 0%, rgba(17, 19, 21, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setPaymentModalOpen(false)
              }
            }}
          >
            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[28px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-50 w-full max-w-sm px-6"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto' }}
            >
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight drop-shadow-lg text-center">
                Choose Payment App
              </h3>
              
              <div className="space-y-3 mb-4 relative z-30">
                {/* Paytm Button - Blur Background */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handlePayWithPaytm()
                  }}
                  className="w-full bg-[#00BAF2]/20 hover:bg-[#00BAF2]/30 backdrop-blur-md border-2 border-[#00BAF2]/50 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 py-3 px-6 cursor-pointer touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    pointerEvents: 'auto',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none'
                  }}
                  aria-label="Pay with Paytm"
                >
                  <Image
                    src="/logos/icons8-paytm-48.png"
                    alt="Paytm"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                    style={{ pointerEvents: 'none' }}
                  />
                  <span className="text-white font-bold text-base">Paytm</span>
                </motion.button>

                {/* Google Pay Button - Blur Background */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handlePayWithGooglePay()
                  }}
                  className="w-full bg-[#4285F4]/20 hover:bg-[#4285F4]/30 backdrop-blur-md border-2 border-[#4285F4]/50 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 py-3 px-6 cursor-pointer touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    pointerEvents: 'auto',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none'
                  }}
                  aria-label="Pay with Google Pay"
                >
                  <Image
                    src="/logos/icons8-google-pay-48.png"
                    alt="Google Pay"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                    style={{ pointerEvents: 'none' }}
                  />
                  <span className="text-white font-bold text-base">Google Pay</span>
                </motion.button>

                {/* PhonePe Button - Blur Background */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handlePayWithPhonePe()
                  }}
                  className="w-full bg-[#5F259F]/20 hover:bg-[#5F259F]/30 backdrop-blur-md border-2 border-[#5F259F]/50 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 py-3 px-6 cursor-pointer touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    pointerEvents: 'auto',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none'
                  }}
                  aria-label="Pay with PhonePe"
                >
                  <Image
                    src="/logos/icons8-phone-pe-48.png"
                    alt="PhonePe"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                    style={{ pointerEvents: 'none' }}
                  />
                  <span className="text-white font-bold text-base">PhonePe</span>
                </motion.button>
              </div>

              {/* Close Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setPaymentModalOpen(false)
                }}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span>{t('close')}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bank Transfer Modal Overlay - Same Card */}
      <AnimatePresence>
        {bankTransferModalOpen && bank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-[28px] flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(21, 124, 130, 0.95) 0%, rgba(17, 19, 21, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setBankTransferModalOpen(false)
              }
            }}
          >
            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[28px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-sm px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight drop-shadow-lg text-center">
                {t('bankDetails')}
              </h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4 space-y-3">
                <div className="space-y-3">
                  {/* Account Holder Name */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-[10px] mb-0.5">{t('accountHolderName')}</p>
                      <p className="text-white font-semibold text-sm">{bank.accountHolder}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyAccountHolder}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                      aria-label="Copy Account Holder Name"
                    >
                      {accountHolderCopied ? (
                        <Check className="w-4 h-4 text-green-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Bank Name */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-[10px] mb-0.5">{t('bankName')}</p>
                      <p className="text-white font-semibold text-sm">{bank.bankName}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyBankName}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                      aria-label="Copy Bank Name"
                    >
                      {bankNameCopied ? (
                        <Check className="w-4 h-4 text-green-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Account Number */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-[10px] mb-0.5">{t('accountNumber')}</p>
                      <p className="text-white font-bold text-base tracking-wide">{bank.accountNumberMasked}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyAccountNumber}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                      aria-label="Copy Account Number"
                    >
                      {accountNumberCopied ? (
                        <Check className="w-4 h-4 text-green-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* IFSC Code */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-[10px] mb-0.5">{t('ifscCode')}</p>
                      <p className="text-white font-bold text-base tracking-wide">{bank.ifsc}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyIFSC}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                      aria-label="Copy IFSC Code"
                    >
                      {ifscCopied ? (
                        <Check className="w-4 h-4 text-green-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setBankTransferModalOpen(false)}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="pointer-events-none">{t('close')}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

