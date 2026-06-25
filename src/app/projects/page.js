import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'Projects — David Lawal',
  description: 'Selected work by David Lawal — framework apps, complete business sites and systems-level tooling.',
};

export default function ProjectsPage() {
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
        <Projects />
      </div>
      <Footer />
    </main>
  );
}
