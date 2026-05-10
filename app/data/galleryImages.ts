/**
 * Gallery imagery — local files inside public/gallery so Next/Image serves them directly.
 * Add or replace assets in that folder and update this list to keep grids in sync.
 */
export const GALLERY_ITEMS: { src: string; alt: string }[] = [
  { src: '/gallery/81947586-5d98-4cd1-83f8-621a036ede24.jpg', alt: 'Tile showroom display 1' },
  { src: '/gallery/67bdec89-1436-492e-b9b9-a4f7f4e6f01b.jpg', alt: 'Tile showroom display 2' },
  { src: '/gallery/9c2f479d-8027-4f20-9102-4a360cb91c5c.jpg', alt: 'Tile showroom display 3' },
  { src: '/gallery/7e768fdd-6abc-4bf7-9919-d8b6b432afba.jpg', alt: 'Tile showroom display 4' },
  { src: '/gallery/d2356eb6-ad0c-41d1-9057-ff587d296666.jpg', alt: 'Tile showroom display 5' },
  { src: '/gallery/c30c8f8d-e079-422a-a55c-be8c8f428521.jpg', alt: 'Tile showroom display 6' },
]

export const GALLERY_VIDEOS: { src: string; alt: string }[] = [
  { src: '/gallery/IMG_3806.mov', alt: 'Showroom video 1' },
  { src: '/gallery/IMG_3491.mp4', alt: 'Showroom video 2' },
  { src: '/gallery/IMG_3498.mov', alt: 'Showroom video 3' },
]

export const galleryPhotoSrcList = () => GALLERY_ITEMS.map((item) => item.src)
