'use client'

import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface CatalogItem {
  id: string
  title: string
  description: string
  logo: string
  details: string
  images: string[]
}

interface CatalogDrawerProps {
  item: CatalogItem
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CatalogDrawer({
  item,
  open,
  onOpenChange,
}: CatalogDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{item.title}</SheetTitle>
          <SheetDescription>{item.description}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.details}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              {item.images.slice(0, 6).map((img, index) => (
                <div
                  key={`${item.id}-gal-${index}`}
                  className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${item.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
