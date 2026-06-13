import Navbar from '@/components/Navbar';
import Background from '@/components/Background';
import { FlowSection } from '@/components/Flow';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import CustomCursor from '@/components/CustomCursor';
import IntroAnimation from '@/components/IntroAnimation';

export default function Home() {
  return (
    <main>
      <IntroAnimation />
      <CustomCursor />
      <CursorGlow />
      <Navbar />
      <Background />
      <div className="relative z-10">
        <FlowSection id="top" first>
          <Hero />
        </FlowSection>
        <FlowSection id="about">
          <About />
        </FlowSection>
        <FlowSection id="skills">
          <Skills />
        </FlowSection>
        <FlowSection id="projects">
          <Projects />
        </FlowSection>
        <FlowSection id="contact" last>
          <Contact />
        </FlowSection>
      </div>
      <Footer />
    </main>
  );
}
