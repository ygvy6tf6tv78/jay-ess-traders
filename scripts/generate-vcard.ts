import { writeFileSync } from 'fs'
import { join } from 'path'
import { siteConfig } from '../app/data/site'

function generateVCard() {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${siteConfig.name}`,
    `ORG:${siteConfig.name}`,
    `TITLE:${siteConfig.tagline}`,
  ]

  siteConfig.contact.phones.forEach((phoneItem, index) => {
    const phone = typeof phoneItem === 'string' ? phoneItem : phoneItem.number
    const type = index === 0 ? 'WORK' : 'VOICE'
    const cleaned = phone.replace(/\D/g, '')
    lines.push(`TEL;TYPE=${type}:+91${cleaned}`)
  })

  lines.push(`EMAIL;TYPE=INTERNET:${siteConfig.contact.email}`)
  
  // Format address for vCard
  const addressParts = siteConfig.contact.address.split(',').map(s => s.trim())
  lines.push(`ADR;TYPE=WORK:;;${addressParts.join(';')};;`)
  lines.push(`URL:${siteConfig.url}`)
  
  lines.push('END:VCARD')

  const vcard = lines.join('\r\n')
  const outputPath = join(process.cwd(), 'public', 'jay-ess-traders.vcf')
  
  writeFileSync(outputPath, vcard, 'utf-8')
  console.log(`✅ vCard generated successfully at: ${outputPath}`)
}

generateVCard()

