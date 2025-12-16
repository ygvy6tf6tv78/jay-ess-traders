'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}
    >
      <div className="flex flex-col items-center" style={{ transform: 'translateY(-10%)' }}>
        {/* Square Border with Logo and Scanning Animation - Center */}
        <div className="relative mb-6">
          {/* Square Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-40 h-40 bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden border-2 border-slate-200 relative"
          >
            {/* Logo in Center */}
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/logos/jay-ess-logo.jpg"
                alt="Jay Ess Traders"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Scanning Line */}
            <motion.div
              className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent pointer-events-none"
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0.3
              }}
              style={{
                boxShadow: '0 0 20px rgba(20, 184, 166, 0.8), 0 0 40px rgba(20, 184, 166, 0.5)'
              }}
            />

            {/* Corner Indicators */}
            <motion.div
              className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400 rounded-tl-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400 rounded-tr-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400 rounded-bl-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400 rounded-br-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </motion.div>
        </div>

        {/* Welcome to Company Name - Below Square, Small Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-slate-400 mb-1">
            Welcome to
          </p>
          <p className="text-base font-bold text-white">
            Jay Ess Traders
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
