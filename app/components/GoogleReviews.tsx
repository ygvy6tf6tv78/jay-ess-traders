'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight, ChevronRight } from 'lucide-react'
import { siteConfig } from '../data/site'

interface Review {
  author_name: string
  author_url?: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface ReviewsData {
  rating: number
  totalReviews: number
  reviews: Review[]
  googleUrl?: string
  unavailable?: boolean
  message?: string
}

const cardStyle: React.CSSProperties = {
  border: '1px solid rgba(251, 236, 137, 0.22)',
  boxShadow: '0 14px 28px rgba(15, 23, 42, 0.08)',
}

function getWriteReviewUrl(): string {
  if (siteConfig.google?.reviewsUrl) return siteConfig.google.reviewsUrl
  if (siteConfig.google?.placeId) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(siteConfig.google.placeId)}`
  }
  return siteConfig.google?.mapsUrl || '#'
}

export default function GoogleReviews() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchFailed, setFetchFailed] = useState(false)

  const placeId = siteConfig.google?.placeId

  useEffect(() => {
    if (!placeId) {
      setLoading(false)
      setFetchFailed(true)
      return
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `/api/google-reviews?placeId=${encodeURIComponent(placeId)}`
        )

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || errorData.error || 'request_failed')
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.message || data.error)
        }

        setReviewsData(data)
      } catch {
        setFetchFailed(true)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [placeId])

  const writeUrl = getWriteReviewUrl()

  const openWriteReview = () => {
    if (writeUrl !== '#') window.open(writeUrl, '_blank', 'noopener,noreferrer')
  }

  // Skeleton
  if (loading) {
    return (
      <section id="reviews" className="w-full max-w-md mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="section-title-accent">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
              Google Reviews
            </h2>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-[24px] p-4 animate-pulse bg-white/95 h-[120px]"
              style={cardStyle}
            />
          ))}
        </div>
      </section>
    )
  }

  // Fallback when API fails or no place id — clean Mango-style CTA card, no raw errors
  const showFallback =
    fetchFailed ||
    !reviewsData ||
    !reviewsData.reviews?.length ||
    !Number.isFinite(reviewsData.rating)

  if (showFallback) {
    return (
      <section id="reviews" className="w-full max-w-md mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="section-title-accent">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
              Google Reviews
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-sm font-semibold text-white hover:text-white/90 transition-colors flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[24px] p-6 text-center bg-white/95"
          style={cardStyle}
        >
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-slate-800 text-base font-semibold mb-1">Love your visit?</p>
          <p className="text-slate-500 text-sm mb-5 leading-relaxed">
            Leave a quick note on Google — it helps neighbours find quality tiles & bathware.
          </p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={openWriteReview}
              className="block w-full font-semibold py-3.5 px-4 rounded-2xl shadow-[0_18px_34px_rgba(29,78,216,0.28)] hover:shadow-[0_22px_40px_rgba(29,78,216,0.34)] transition-all flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
                color: 'white',
              }}
            >
              Write a Review
              <Star className="w-4 h-4 fill-white text-white" />
            </button>
            <Link
              href="/reviews"
              className="block w-full font-semibold py-3.5 px-4 rounded-2xl shadow-[0_14px_28px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_34px_rgba(15,23,42,0.1)] transition-all flex items-center justify-center gap-2 bg-white text-slate-900"
              style={{ border: '1px solid rgba(251, 236, 137, 0.22)' }}
            >
              View Reviews Page
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </Link>
          </div>
        </motion.div>
      </section>
    )
  }

  const data = reviewsData!
  const displayReviews = data.reviews.slice(0, 2)

  return (
    <section id="reviews" className="w-full max-w-md mx-auto px-4 pt-8 pb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="section-title-accent">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
            Google Reviews
          </h2>
        </div>
        <Link
          href="/reviews"
          className="text-sm font-semibold text-white hover:text-white/90 transition-colors flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Rating summary white card with "Google" badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-5 rounded-[24px] p-5 bg-white/95"
        style={cardStyle}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(data.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-900 font-bold text-lg">{data.rating.toFixed(1)}</span>
            </div>
            <p className="text-slate-600 text-sm">
              Based on {data.totalReviews.toLocaleString()} reviews on Google
            </p>
          </div>
          <div className="rounded-full px-3 py-1.5 border border-[#FBEC89]/35 bg-[#fff8df] text-slate-700 text-xs font-semibold whitespace-nowrap">
            Google
          </div>
        </div>
      </motion.div>

      <div className="space-y-3.5">
        {displayReviews.map((review, index) => (
          <motion.div
            key={`${review.time}-${index}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
            className="rounded-[24px] p-[18px] hover:shadow-lg transition-all relative overflow-hidden bg-white/95"
            style={cardStyle}
          >
            <div className="flex items-start gap-3 mb-2 relative z-10">
              {review.profile_photo_url ? (
                <Image
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                  unoptimized
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  }}
                >
                  <span className="text-white font-semibold text-sm">
                    {review.author_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-sm text-slate-900">{review.author_name}</h3>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500">{review.relative_time_description}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed line-clamp-3 text-slate-700 relative z-10">
              {review.text}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5 space-y-3"
      >
        <Link
          href="/reviews"
          className="block w-full font-semibold py-3.5 px-4 rounded-2xl shadow-[0_14px_28px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_34px_rgba(15,23,42,0.1)] transition-all flex items-center justify-center gap-2 bg-white text-slate-900"
          style={{ border: '1px solid rgba(251, 236, 137, 0.22)' }}
        >
          View All Reviews
          <ArrowRight className="w-4 h-4 text-slate-900" />
        </Link>
        <button
          type="button"
          onClick={openWriteReview}
          className="block w-full font-semibold py-3.5 px-4 rounded-2xl shadow-[0_18px_34px_rgba(29,78,216,0.28)] hover:shadow-[0_22px_40px_rgba(29,78,216,0.34)] transition-all flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
            color: 'white',
          }}
        >
          Write a Review
          <Star className="w-4 h-4 fill-white text-white" />
        </button>
      </motion.div>
    </section>
  )
}
