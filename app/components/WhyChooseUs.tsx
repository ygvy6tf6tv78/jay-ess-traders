'use client'

import { motion } from 'framer-motion'
import { Award, BadgeCheck, Truck, Headphones } from 'lucide-react'

const whyChooseUs = [
  {
    id: 'why-1',
    icon: Award,
    title: 'Authorised Brand Dealer',
    description:
      'Exclusive dealer of Simpolo Tiles & Bath, Jaquar, Legrand and Berger Paints.',
  },
  {
    id: 'why-2',
    icon: BadgeCheck,
    title: 'Curated Premium Range',
    description:
      'Hand-picked tiles, bathware, switches and paints for every budget and style.',
  },
  {
    id: 'why-3',
    icon: Truck,
    title: 'Quick & Safe Delivery',
    description:
      'Reliable delivery across Akhnoor and surrounding regions, packed safely.',
  },
  {
    id: 'why-4',
    icon: Headphones,
    title: 'Expert After-Sales Support',
    description:
      'Friendly team for shade selection, fitting guidance and post-purchase help.',
  },
]

export default function WhyChooseUs() {
  return (
    <motion.section
      id="why-us"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <div className="section-title-accent mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-left">
            Why Choose Us?
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-300/90 font-normal text-left">
          Authorised Dealer • Curated Range • Trusted Service
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {whyChooseUs.map((service, index) => {
          const IconComponent = service.icon
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
              className="group relative rounded-[25px] p-5 overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 35%, #ffffff 72%, #F0F9FF 100%)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                boxShadow:
                  '0 10px 28px rgba(15, 23, 42, 0.08), 0 2px 10px rgba(59, 130, 246, 0.14)',
              }}
            >
              <div className="absolute inset-x-0 top-0 h-20 opacity-65 pointer-events-none bg-gradient-to-b from-white/85 to-transparent" />
              <div className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.22em] text-slate-400">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10 flex items-start gap-4 transition-all duration-300 group-hover:-translate-y-0.5">
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-200/70"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, #BFDBFE 100%)',
                    boxShadow:
                      '0 8px 18px rgba(59, 130, 246, 0.18), inset 0 1px 0 rgba(255,255,255,0.92)',
                  }}
                >
                  <IconComponent
                    className="w-7 h-7 relative z-10"
                    style={{ color: '#1D4ED8' }}
                    strokeWidth={2}
                  />
                </div>

                <div className="flex-1 relative z-10 pr-7">
                  <h3
                    className="font-bold text-base mb-1.5 leading-tight"
                    style={{ color: '#1e293b' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#475569' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
