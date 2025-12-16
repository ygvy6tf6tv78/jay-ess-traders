'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Brochure {
  title: string
  href: string
  sizeLabel: string
}

interface BrochureModalProps {
  brochure: Brochure
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BrochureModal({
  brochure,
  open,
  onOpenChange,
}: BrochureModalProps) {
  const pdfUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${brochure.href}` 
    : brochure.href

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = brochure.href
    link.download = brochure.title + '.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    onOpenChange(false)
  }

  const handleViewPDF = () => {
    window.open(pdfUrl, '_blank')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[280px] w-[90%] rounded-3xl p-5 z-[100] bg-white shadow-2xl" 
        style={{ 
          position: 'fixed', 
          top: '12%', 
          left: '50%', 
          transform: 'translateX(-50%) translateY(0)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-base font-bold text-slate-900 text-center">{brochure.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2.5">
          <Button
            onClick={handleViewPDF}
            className="w-full h-11 bg-teal-600/90 hover:bg-teal-700/90 text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-md text-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View PDF
          </Button>

          <Button
            onClick={handleDownload}
            className="w-full h-11 bg-teal-600/90 hover:bg-teal-700/90 text-white font-semibold rounded-full flex items-center justify-center gap-2 shadow-md text-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
