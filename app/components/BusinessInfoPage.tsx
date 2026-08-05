'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Bath,
  Boxes,
  Building2,
  HelpCircle,
  ClipboardCheck,
  Handshake,
  LayoutGrid,
  PackageSearch,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { siteConfig } from '../data/site'
import { GALLERY_ITEMS } from '../data/galleryImages'
import { getWhatsAppLink } from '../lib/phone'

type PageKind = 'services' | 'support'

type PageItem = {
  title: string
  description: string
  image: string
  icon: LucideIcon
}

const pageContent: Record<PageKind, { title: string; eyebrow: string; description: string; items: PageItem[] }> = {
  services: {
    title: 'Services',
    eyebrow: 'Project Help',
    description: 'Expert assistance for tiles, bathware, product selection and project requirements.',
    items: [
      { title: 'Tile Consultation', description: 'Compare tile sizes, finishes and applications with practical guidance for your space.', image: GALLERY_ITEMS[0].src, icon: LayoutGrid },
      { title: 'Bathroom Planning', description: 'Choose coordinated bathware and fittings based on layout, usage and finish preferences.', image: GALLERY_ITEMS[1].src, icon: Bath },
      { title: 'Product Selection', description: 'Shortlist suitable products across trusted brands for your style, budget and requirements.', image: GALLERY_ITEMS[2].src, icon: ClipboardCheck },
      { title: 'Bulk Supply', description: 'Get quantity-based product assistance for larger residential and commercial requirements.', image: GALLERY_ITEMS[3].src, icon: Boxes },
      { title: 'Delivery Assistance', description: 'Receive clear assistance with product readiness, pickup and dispatch coordination.', image: GALLERY_ITEMS[4].src, icon: Building2 },
      { title: 'Contractor Support', description: 'Help contractors confirm product specifications, quantities and current availability.', image: GALLERY_ITEMS[5].src, icon: Handshake },
    ],
  },
  support: {
    title: 'Support',
    eyebrow: 'Customer Care',
    description: 'Quick help for product queries, specifications, orders and post-purchase assistance.',
    items: [
      { title: 'Product Enquiry', description: 'Ask about available tile, bathware, switch and paint ranges from our partner brands.', image: GALLERY_ITEMS[1].src, icon: HelpCircle },
      { title: 'Stock Assistance', description: 'Check current availability and suitable alternatives before planning your purchase.', image: GALLERY_ITEMS[2].src, icon: PackageSearch },
      { title: 'Size & Specification Help', description: 'Confirm dimensions, finishes and product specifications for accurate selection.', image: GALLERY_ITEMS[3].src, icon: Ruler },
      { title: 'Installation Guidance', description: 'Get product-specific preparation and installation guidance for your contractor.', image: GALLERY_ITEMS[4].src, icon: Wrench },
      { title: 'Order Assistance', description: 'Receive help reviewing product details and quantities before finalising an order.', image: GALLERY_ITEMS[5].src, icon: ShoppingCart },
      { title: 'After-Sales Support', description: 'Connect with our team for product-related help after your purchase.', image: GALLERY_ITEMS[0].src, icon: ShieldCheck },
    ],
  },
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#25D366" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function BusinessInfoPage({ kind }: { kind: PageKind }) {
  const content = pageContent[kind]

  const enquiryLink = (item?: string) =>
    getWhatsAppLink(
      siteConfig.whatsapp.defaultPhone,
      item
        ? `Hi Jay Ess Traders, I need help with ${item}. Please share more details.`
        : `Hi Jay Ess Traders, I need help with ${content.title.toLowerCase()}. Please assist me.`,
    )

  return (
    <main className="min-h-screen bg-[#F6FAFD] px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-md">
        <header
          className="mb-4 overflow-hidden rounded-[28px] border border-white/20 p-3.5 text-white shadow-[0_14px_30px_rgba(7,90,156,0.20)]"
          style={{ background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)' }}
        >
          <div className="relative flex items-center justify-between">
            <Link
              href="/"
              className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/12 text-white ring-1 ring-white/20 transition-transform active:scale-95"
              aria-label="Back to card"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="pointer-events-none absolute inset-x-0 px-12 text-center text-[1.65rem] font-black leading-tight tracking-tight">
              {content.title}
            </h1>
            <span className="z-10 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ring-1 ring-white/20">
              {content.eyebrow}
            </span>
          </div>

          <p className="mt-3 px-1 text-sm font-medium leading-6 text-white/85">{content.description}</p>

          <nav className="mt-4 grid grid-cols-3 gap-2" aria-label="Business information">
            <Link href="/" className="inline-flex h-10 items-center justify-center rounded-xl bg-white/12 text-xs font-bold ring-1 ring-white/20">
              Home
            </Link>
            <Link
              href="/services"
              className="inline-flex h-10 items-center justify-center rounded-xl text-xs font-bold ring-1 ring-white/20"
              style={{ background: kind === 'services' ? '#FFFFFF' : 'rgba(255,255,255,0.12)', color: kind === 'services' ? '#075A9C' : '#FFFFFF' }}
            >
              Services
            </Link>
            <Link
              href="/support"
              className="inline-flex h-10 items-center justify-center rounded-xl text-xs font-bold ring-1 ring-white/20"
              style={{ background: kind === 'support' ? '#FFFFFF' : 'rgba(255,255,255,0.12)', color: kind === 'support' ? '#075A9C' : '#FFFFFF' }}
            >
              Support
            </Link>
          </nav>
        </header>

        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg font-black text-slate-950">{content.title}</h2>
            <p className="mt-1 text-[13px] font-medium leading-snug text-slate-500">How can we help?</p>
          </div>
          <span className="rounded-full bg-[#EAF5FE] px-2.5 py-1 text-xs font-black text-[#075A9C]">{content.items.length}</span>
        </div>

        <div className="grid gap-4">
          {content.items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
                className="overflow-hidden rounded-[28px] border border-[#D8EAF8] bg-white p-2 shadow-[0_18px_38px_rgba(7,90,156,0.11),inset_0_1px_0_rgba(255,255,255,0.96)]"
              >
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[22px] bg-[#EAF5FE]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="448px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/30 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-white backdrop-blur-md">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                    {content.title}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-black tracking-[0.12em] text-[#075A9C] shadow-md">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="px-3 pb-3 pt-3.5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1F8FF] ring-1 ring-[#D8EAF8]">
                      <Icon className="h-5 w-5 text-[#075A9C]" strokeWidth={2.4} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[17px] font-black leading-tight text-slate-950">{item.title}</h3>
                      <p className="mt-1.5 text-[13px] font-medium leading-5 text-slate-600">{item.description}</p>
                    </div>
                  </div>

                  <a
                    href={enquiryLink(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Enquire about ${item.title} on WhatsApp`}
                    className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[#D8EAF8] bg-white text-[13px] font-black text-slate-900 shadow-[0_8px_16px_rgba(15,23,42,0.09)] transition-transform active:scale-[0.98]"
                  >
                    <WhatsAppMark />
                    Enquire on WhatsApp
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        <a
          href={enquiryLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#075A9C] px-5 text-sm font-black text-white shadow-[0_12px_24px_rgba(7,90,156,0.3)] transition-all hover:bg-[#086fab] active:scale-[0.98]"
        >
          <WhatsAppMark />
          Enquire on WhatsApp
        </a>
      </div>
    </main>
  )
}
