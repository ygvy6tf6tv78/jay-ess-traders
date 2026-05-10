'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import Catalog from './components/Catalog'
import Brochures from './components/Brochures'
import Gallery from './components/Gallery'
import GoogleReviews from './components/GoogleReviews'
import SocialConnect from './components/SocialConnect'
import ContactCard from './components/ContactCard'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 2.5 seconds on every load (first visit and refresh)
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // Handle scroll to gallery section when coming from gallery page
  useEffect(() => {
    // Check if we're coming from gallery page
    const fromGallery = sessionStorage.getItem('fromGallery')
    
    if (fromGallery === 'true') {
      // Remove the flag
      sessionStorage.removeItem('fromGallery')
      
      // Skip loading screen
      setShowLoading(false)
      
      // Scroll to gallery section
      setTimeout(() => {
        const gallerySection = document.getElementById('gallery')
        if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else if (!showLoading) {
      // If there's a #gallery hash on refresh, remove it and scroll to top
      if (window.location.hash === '#gallery') {
        window.history.replaceState(null, '', window.location.pathname)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [showLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!showLoading && (
        <main className="min-h-screen pb-12 relative z-10">
          <Hero />
          <About />
          <Catalog />
          <Brochures />
          <WhyChooseUs />
          <Gallery />
          <GoogleReviews />
          <SocialConnect />
          <ContactCard />
          <Footer />
          <BackToTop />
        </main>
      )}
    </>
  )
}
