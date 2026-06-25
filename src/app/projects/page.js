import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import CustomCursor from '@/components/CustomCursor';
import ProjectsShowcase from '@/components/ProjectsShowcase';

export const metadata = {
  title: 'Projects — David Lawal',
  description:
    'Selected work by David Lawal — framework apps, complete business sites and systems-level tooling, with a live GitHub repository browser.',
};

export default function ProjectsPage() {
  return (
    <main>
      <CustomCursor />
      <CursorGlow />
      <Navbar />
      <Background />
      <div className="relative z-10">
        <ProjectsShowcase />
      </div>
      <Footer />
    </main>
  );
}
