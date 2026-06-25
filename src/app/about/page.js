import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'About — David Lawal',
  description: 'David Lawal — frontend engineer building complete, immersive web experiences.',
};

export default function AboutPage() {
  return (
    <main>
      <CustomCursor />
      <CursorGlow />
      <Navbar />
      <Background />
      <div className="relative z-10 pb-10">
        <div className="mx-auto max-w-6xl px-6 pt-28">
          <a href="/" className="link-underline text-sm text-muted transition-colors hover:text-ink">← Back home</a>
        </div>
        <About />
        <Skills />
      </div>
      <Footer />
    </main>
  );
}
