# Jay Ess Traders - Digital Business Card

Premium digital business card for Jay Ess Traders - Exclusive Dealer for Tiles, Bathware, Switches & Paint in Akhnoor.

## Features

- 🎨 Premium green glassy brochure cards with flip animation
- 💙 Blue gradient "Get in Touch" section
- ⭐ Google Reviews integration with real-time fetching
- 📸 Gallery with photos and videos
- 📞 Call popup animation
- 📍 Interactive location map
- 💳 Payment links integration
- 📱 Fully responsive and mobile-optimized
- ✨ Premium animations and glassmorphism effects

## Deployment Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory and add:

```env
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

**Google Place ID**: `ChIJ8fYmGcBjHjkRTYEHZnZ9MyE`

### 2. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/onelinkcards/jay-ess-traders)

Or manually:

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Deploy
vercel --prod
```

### 3. Environment Variables in Vercel

Add the following environment variable in Vercel dashboard:
- `GOOGLE_PLACES_API_KEY` = Your Google Places API key

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Server will start on http://localhost:3000
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Shadcn/ui
- **PDF Handling**: React PDF
- **Image Optimization**: Next.js Image

## Contact Information

**Jay Ess Traders**
- 📍 Chowkibal, Kupwara Road, Akhnoor, Jammu
- 📞 +91 70064 10506, +91 95411 24856
- 📧 jesstraders123@gmail.com
- ⏰ Mon-Sun: 9:00 AM - 8:00 PM

## License

© 2024 Jay Ess Traders. All rights reserved.
