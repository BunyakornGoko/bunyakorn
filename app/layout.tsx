import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bunyakorn-jet.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bunyakorn Pornsombatpaibool | Full-Stack Developer',
    template: '%s | Bunyakorn Pornsombatpaibool',
  },
  description: 'Result-oriented Full-Stack Developer with a strong foundation in Ruby on Rails, Golang, React, and PostgreSQL. Experienced in building scalable 3-tier architectures and integrating advanced AI solutions like GPT and MCP.',
  keywords: [
    'Full-Stack Developer', 'Ruby on Rails', 'Golang', 'React', 'PostgreSQL',
    'Software Engineer', 'Web Developer', 'AI Integration', 'Bangkok', 'KMUTT',
    'Bunyakorn', 'BunyakornGoko',
  ],
  authors: [{ name: 'Bunyakorn Pornsombatpaibool', url: 'https://github.com/BunyakornGoko' }],
  creator: 'Bunyakorn Pornsombatpaibool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Bunyakorn Pornsombatpaibool',
    title: 'Bunyakorn Pornsombatpaibool | Full-Stack Developer',
    description: 'Result-oriented Full-Stack Developer with a strong foundation in Ruby on Rails, Golang, React, and PostgreSQL. Experienced in building scalable 3-tier architectures and integrating advanced AI solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bunyakorn Pornsombatpaibool — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bunyakorn Pornsombatpaibool | Full-Stack Developer',
    description: 'Result-oriented Full-Stack Developer with a strong foundation in Ruby on Rails, Golang, React, and PostgreSQL.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <SmoothScroll>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </SmoothScroll>
      </body>
    </html>
  )
}
