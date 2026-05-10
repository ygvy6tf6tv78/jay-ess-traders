'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star, ExternalLink } from 'lucide-react'
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
  background:
    'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,252,240,0.95) 42%, rgba(255,255,255,0.98) 100%)',
  border: '1px solid rgba(251, 236, 137, 0.26)',
  boxShadow: '0 18px 36px rgba(15, 23, 42, 0.08)',
}

function getWriteReviewUrl(): string {
  if (siteConfig.google?.reviewsUrl) return siteConfig.google.reviewsUrl
  if (siteConfig.google?.placeId) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(siteConfig.google.placeId)}`
  }
  return siteConfig.google?.mapsUrl || '#'
}

function getViewOnGoogleUrl(data: ReviewsData | null): string {
  if (data?.googleUrl) return data.googleUrl
  if (siteConfig.google?.mapsUrl) return siteConfig.google.mapsUrl
  if (siteConfig.google?.placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${siteConfig.google.placeId}`
  }
  return '#'
}

export default function ReviewsPage() {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set())
  const [displayCount, setDisplayCount] = useState(3)

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
          const data = await response.json().catch(() => ({}))
          throw new Error(data.message || data.error || 'request_failed')
        }
        const data = await response.json()
        if (data.error) throw new Error(data.message || data.error)
        setReviewsData(data)
      } catch {
        setFetchFailed(true)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [placeId])

  const toggleReview = (index: number) => {
    setExpandedReviews((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const writeReviewUrl = getWriteReviewUrl()
  const googleReviewsUrl = getViewOnGoogleUrl(reviewsData)

  const handleWriteReview = () => {
    if (writeReviewUrl !== '#') {
      window.open(writeReviewUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const reviews = reviewsData?.reviews ?? []
  const showFallback = fetchFailed || !reviewsData || reviews.length === 0

  return (
    <main
      className="min-h-screen pb-12 relative z-10 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fefbf3 0%, #faf8f0 50%, #fefbf3 100%)' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FBEC89]/18 blur-3xl" />
        <div className="absolute top-[18rem] -left-16 h-64 w-64 rounded-full bg-[#1E4D3D]/10 blur-3xl" />
        <div className="absolute bottom-[8rem] right-[-4rem] h-72 w-72 rounded-full bg-[#FBEC89]/12 blur-3xl" />
      </div>

      {/* Header */}
      <div
        className="border-b sticky top-0 z-10 backdrop-blur-md shadow-sm"
        style={{
          backgroundColor: 'rgba(255, 251, 243, 0.95)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="max-w-md mx-auto pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-4 flex items-center gap-3">
          <Link
            href="/"
            prefetch
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors hover:bg-black/5 active:scale-[0.98] touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('fromReviews', 'true')
              }
            }}
          >
            <ArrowLeft className="h-6 w-6 text-slate-800" strokeWidth={2.25} aria-hidden />
          </Link>
          <h1 className="text-xl font-bold text-slate-800">Google Reviews</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-6 relative z-10">
        {/* Write a Review CTA — at top */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 rounded-[28px] p-6 text-center"
          style={cardStyle}
          id="write-review"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-5 h-5 fill-[#1E4D3D] text-[#1E4D3D]" />
            <h3 className="text-slate-800 font-bold text-lg">Review Us on Google</h3>
            <Star className="w-5 h-5 fill-[#1E4D3D] text-[#1E4D3D]" />
          </div>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            Share your experience and help others discover quality tiles & bathware in Akhnoor.
          </p>
          <motion.button
            onClick={handleWriteReview}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #1E4D3D 0%, #2F6B55 100%)',
              boxShadow: '0 18px 34px rgba(30, 77, 61, 0.24)',
            }}
          >
            <Star className="w-5 h-5 fill-white" />
            <span>Write a Review</span>
            <ExternalLink className="w-5 h-5" />
          </motion.button>
          <p className="text-slate-500 text-xs mt-3">Opens Google Maps to submit your review</p>
        </motion.div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-[24px] p-6 animate-pulse h-[150px]"
                style={cardStyle}
              />
            ))}
          </div>
        ) : showFallback ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-[28px] p-6 text-center"
            style={cardStyle}
          >
            <p className="text-slate-700 mb-4 leading-relaxed">
              Reviews are loading from Google or temporarily unavailable. You can still leave us a
              new review or open our Google profile.
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 text-white font-semibold py-3.5 px-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #1E4D3D 0%, #2F6B55 100%)',
                boxShadow: '0 18px 34px rgba(30, 77, 61, 0.24)',
              }}
            >
              View on Google
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        ) : (
          <>
            {/* Single rating summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6 text-center rounded-[28px] p-6"
              style={cardStyle}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(reviewsData!.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-2xl text-slate-800">
                  {reviewsData!.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-base text-slate-600">
                Based on {reviewsData!.totalReviews.toLocaleString()} reviews on Google
              </p>
            </motion.div>

            {/* Reviews list */}
            <div className="space-y-4 mb-6">
              {reviews.slice(0, displayCount).map((review, index) => {
                const isExpanded = expandedReviews.has(index)
                const shouldTruncate = review.text.length > 150
                return (
                  <motion.div
                    key={`${review.time}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="rounded-[24px] p-5 hover:shadow-lg transition-all relative overflow-hidden"
                    style={cardStyle}
                  >
                    <div className="absolute inset-x-5 top-3 h-8 rounded-full bg-[#FBEC89]/20 blur-2xl pointer-events-none" />
                    <div className="flex items-start gap-3 mb-3 relative z-10">
                      {review.profile_photo_url ? (
                        <Image
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FBEC89]/20"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #2F6B55 0%, #1E4D3D 100%)',
                          }}
                        >
                          <span className="text-white font-semibold text-base">
                            {review.author_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base text-slate-800">
                            {review.author_name}
                          </h3>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">
                          {review.relative_time_description}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`text-sm leading-relaxed text-slate-700 ${
                        shouldTruncate && !isExpanded ? 'line-clamp-3' : ''
                      }`}
                    >
                      {review.text}
                    </p>
                    {shouldTruncate && (
                      <button
                        type="button"
                        onClick={() => toggleReview(index)}
                        className="mt-2 text-sm font-semibold transition-colors text-[#1E4D3D] hover:text-[#2F6B55]"
                      >
                        {isExpanded ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {reviews.length > displayCount && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mb-6"
              >
                <button
                  type="button"
                  onClick={() => setDisplayCount(reviews.length)}
                  className="w-full text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #1E4D3D 0%, #2F6B55 100%)',
                    boxShadow: '0 18px 34px rgba(30, 77, 61, 0.24)',
                  }}
                >
                  View More ({reviews.length - displayCount} more)
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #1E4D3D 0%, #2F6B55 100%)',
                  boxShadow: '0 20px 36px rgba(30, 77, 61, 0.24)',
                }}
              >
                View All Reviews on Google
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </main>
  )
}
