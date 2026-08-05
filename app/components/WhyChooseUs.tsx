'use client'

import { motion } from 'framer-motion'
import { Award, BadgeCheck, Palette, Headphones } from 'lucide-react'
import Image from 'next/image'

const whyChooseUs = [
  {
    id: 'why-1',
    icon: Award,
    title: 'Authorised Brand Dealer',
    description:
      'Exclusive dealer of Simpolo Tiles & Bath, Jaquar, Legrand and Berger Paints.',
    image: '/gallery/81947586-5d98-4cd1-83f8-621a036ede24.jpg',
  },
  {
    id: 'why-2',
    icon: BadgeCheck,
    title: 'Curated Premium Range',
    description:
      'Hand-picked tiles, bathware, switches and paints for every budget and style.',
    image: '/gallery/67bdec89-1436-492e-b9b9-a4f7f4e6f01b.jpg',
  },
  {
    id: 'why-3',
    icon: Palette,
    title: 'Expert Product Guidance',
    description:
      'Helpful in-store guidance for tiles, fittings, switches, finishes and colour selection.',
    image: '/gallery/9c2f479d-8027-4f20-9102-4a360cb91c5c.jpg',
  },
  {
    id: 'why-4',
    icon: Headphones,
    title: 'Expert After-Sales Support',
    description:
      'Friendly team for shade selection, fitting guidance and post-purchase help.',
    image: '/gallery/7e768fdd-6abc-4bf7-9919-d8b6b432afba.jpg',
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
      className="w-full max-w-md mx-auto py-6"
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
              className="group relative min-h-[132px] rounded-[26px] p-5 overflow-hidden"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(10, 143, 199, 0.3)',
                boxShadow:
                  '0 16px 34px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(7, 90, 156, 0.13), inset 0 1px 0 rgba(255,255,255,0.96)',
              }}
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[52%] overflow-hidden" aria-hidden>
                <Image src={service.image} alt="" fill className="scale-105 object-cover opacity-[0.48] saturate-[0.9]" sizes="230px" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/65 to-white/10" />
              </div>
              <div className="absolute inset-x-0 top-0 h-16 opacity-70 pointer-events-none bg-gradient-to-b from-white/90 to-transparent" />
              <div className="absolute right-4 top-4 rounded-full border border-sky-200/80 bg-[#EEF7FF]/90 px-2 py-1 text-[9px] font-black tracking-[0.18em] text-[#075A9C] shadow-sm backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10 flex items-start gap-4 transition-all duration-300 group-hover:-translate-y-0.5">
                <div
                  className="relative z-10 w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0 border border-sky-200/80"
                  style={{
                    background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)',
                    boxShadow:
                      '0 10px 22px rgba(7, 90, 156, 0.28), inset 0 1px 0 rgba(255,255,255,0.24)',
                  }}
                >
                  <IconComponent
                    className="w-7 h-7 relative z-10"
                    style={{ color: '#FFFFFF' }}
                    strokeWidth={2}
                  />
                </div>

                <div className="flex-1 relative z-10 pr-7">
                  <h3
                    className="font-black text-[17px] mb-1.5 leading-tight tracking-[-0.01em]"
                    style={{ color: '#1e293b' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-[13.5px] font-medium leading-relaxed"
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
