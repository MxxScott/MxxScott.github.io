import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'David Lawal — Frontend Engineer',
  description:
    'David Lawal — Frontend engineer specializing in Nuxt, React/Next.js, and immersive 3D web experiences. Also fluent in Python, C, and C++.',
  keywords: [
    'frontend developer',
    'Nuxt',
    'React',
    'Next.js',
    'Three.js',
    'David Lawal',
    'MxxScott',
  ],
  openGraph: {
    title: 'David Lawal — Frontend Engineer',
    description: 'Building professional, complex, and immersive web experiences.',
    url: 'https://mxxscott.github.io',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
