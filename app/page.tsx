import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Testimonials } from '@/components/sections/Testimonials';
import { Projects } from '@/components/sections/Projects';
import { Stats } from '@/components/sections/Stats';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/ui/Footer';
import { StatusTerminal } from '@/components/ui/StatusTerminal';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Testimonials />
        <Projects />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <StatusTerminal />
    </>
  );
}
