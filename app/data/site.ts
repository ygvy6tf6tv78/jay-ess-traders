import { galleryPhotoSrcList } from './galleryImages'

/** Shared showcase URLs for catalog detail lightboxes — uses showroom photos until brand-specific assets exist. */
const catalogGallerySrcs = galleryPhotoSrcList()

export const siteConfig = {
  name: "Jay Ess Traders",
  tagline: "Exclusive Dealer of Simpolo Tiles and Bath",
  serviceTagline: "Tiles • Bathware • Switches • Paints",
  keywordBadges: [
    "Authorised Dealer",
    "Curated Premium Range",
    "Quick Delivery",
  ] as string[],
  url: "https://jayess.onelink.cards",
  
  contact: {
    phones: [
      { number: "9541124856", label: "Main Office" },
      { number: "7006121541", label: "Sales" },
      { number: "9419162736", label: "Support" }
    ],
    email: "jayesstraders2024@gmail.com",
    address: "Kashmir Complex, Jay Ess Towers, Near BSF Camp, Vill. Karangi, Sohal Road, Akhnoor",
    mapQuery: "Jay Ess Traders, Sohal Road, Akhnoor",
    storeHours: "Mon - Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 6:00 PM",
  },
  
  whatsapp: {
    defaultPhone: "9541124856",
    defaultMessage: "Hi Jay Ess Traders, I'm interested in tiles and bathware.",
  },
  
  brands: [
    {
      name: "Simpolo",
      tagline: "Tiles & Bath",
      logo: "/logos/simpolo.png",
    },
    {
      name: "Jaquar",
      tagline: "Bathware",
      logo: "/logos/jaquar.jpg",
    },
    {
      name: "Legrand",
      tagline: "Switches",
      logo: "/logos/legrand.jpg",
    },
    {
      name: "Berger Paints",
      tagline: "Paints",
      logo: "/logos/images.jpeg",
    },
  ],
  
  about: {
    title: "Premium Building Materials",
    description: "We supply premium tiles, bath fittings, electrical switches, and paints from trusted brands. Visit our store for curated selections, quick delivery, and reliable after sales support.",
  },
  
  catalog: [
    {
      id: "simpolo-tiles",
      title: "Simpolo Tiles",
      description: "Floor and wall tiles for homes and commercial spaces.",
      logo: "/logos/simpolo.png",
      details: "Explore our extensive range of Simpolo tiles including vitrified, ceramic, glazed vitrified tiles (GVT), and double charge tiles. Perfect for residential and commercial applications with superior strength and aesthetics.",
      images: catalogGallerySrcs,
    },
    {
      id: "jaquar-bathware",
      title: "Jaquar Bathware",
      description: "Faucets, showers, sanitaryware, wellness range.",
      logo: "/logos/jaquar.jpg",
      details: "Complete bathroom solutions featuring premium faucets, rain showers, sanitaryware, wellness products, and accessories. Experience luxury and innovation in every product.",
      images: catalogGallerySrcs,
    },
    {
      id: "legrand-switches",
      title: "Legrand Switches",
      description: "Switches, sockets, MCBs, modular systems.",
      logo: "/logos/legrand.jpg",
      details: "World-class electrical solutions including modular switches, sockets, distribution boards, MCBs, and home automation systems. Safety meets elegance.",
      images: catalogGallerySrcs,
    },
    {
      id: "nerolac-paints",
      title: "Berger Paints",
      description: "Interior and exterior paints with expert shade guidance.",
      logo: "/logos/images.jpeg",
      details: "Comprehensive range of interior and exterior emulsions, wood finishes, and protective coatings. Get expert color consultation and shade selection guidance.",
      images: catalogGallerySrcs,
    },
  ],
  
  brochures: [
    {
      title: "Spectra",
      href: "/brochures/001-SPECTRA-COLLECTION-SIMPOLO.pdf",
      sizeLabel: "PDF",
    },
    {
      title: "Rockdeck",
      href: "/brochures/001-ROCKDECK-Collection-Outdoor & Parking-Simpolo.pdf",
      sizeLabel: "PDF",
    },
    {
      title: "Forza",
      href: "/brochures/009-FORZA-Collection-Highgloss-Simpolo.pdf",
      sizeLabel: "PDF",
    },
    {
      title: "Supra Intra",
      href: "/brochures/014-SUPRA-INTRA-Collection-Simpolo.pdf",
      sizeLabel: "PDF",
    },
    {
      title: "Prozzo",
      href: "/brochures/021-Prozzo 120x180cm Catalogue Collection Simpolo.pdf",
      sizeLabel: "PDF",
    },
    {
      title: "Competitive 2.0",
      href: "/brochures/simpolo_competitive_2.0_collection_catalogue_feb_25.pdf",
      sizeLabel: "PDF",
    },
  ],
  
  social: {
    facebook: "",
    instagram: "https://www.instagram.com/jayesstraders/",
    twitter: "",
    linkedin: "",
  },
  
  google: {
    placeId: "ChIJ8fYmGcBjHjkRTYEHZnZ9MyE",
    mapsUrl: "https://maps.app.goo.gl/NfaKbcaukTmfBAdJ8",
    reviewsUrl: "https://search.google.com/local/writereview?placeid=ChIJ8fYmGcBjHjkRTYEHZnZ9MyE",
  },
  
  seo: {
    title: "Jay Ess Traders - Premium Tiles, Bathware, Switches & Paint | Akhnoor",
    description: "Exclusive dealer of Simpolo Tiles, Jaquar Bathware, Legrand Switches, and Berger Paints in Akhnoor. Visit our store for premium building materials and expert guidance.",
    keywords: "tiles akhnoor, bathware akhnoor, simpolo tiles, jaquar bathware, legrand switches, berger paints, building materials akhnoor",
  },
  
  credits: {
    designer: "RepixelX Studio",
    designerUrl: "https://repixelx.com",
  },
}

export type SiteConfig = typeof siteConfig

