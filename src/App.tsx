import { Background } from './components/Background';
import { SideNav } from './components/SideNav';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { KeyboardNavigation } from './components/KeyboardNavigation';

export default function App() {
  return (
    <>
      <KeyboardNavigation />
      <ScrollProgress />
      <Cursor />
      <Background />
      <SideNav />
      <MobileNav />
      <ThemeSwitcher />
      <main className="pb-24 sm:pb-0 pl-0 sm:pl-32 md:pl-40 lg:pl-48 relative">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
