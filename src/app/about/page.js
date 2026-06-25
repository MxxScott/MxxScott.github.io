import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'About — David Lawal',
  description:
    'David Lawal — frontend engineer building complete, immersive web experiences in Nuxt, React/Next.js and 3D, on a systems foundation of Python, C and C++.',
};

export default function AboutPage() {
  return (
    <main>
      <CustomCursor />
      <CursorGlow />
      <Navbar />
      <Background />
      <div className="relative z-10 pb-12">
        <header className="mx-auto max-w-6xl px-6 pt-32">
          <a href="/" className="link-underline text-sm text-muted transition-colors hover:text-ink">← Back home</a>
          <h1 className="display-sm mt-8 max-w-3xl">Frontend engineer, systems-curious.</h1>
          <p className="mt-4 max-w-xl text-muted">
            The story, the stack, and the foundations underneath — plus what I&apos;m building lately.
          </p>
        </header>
        <About />
        <Skills />
      </div>
      <Footer />
    </main>
  );
}
