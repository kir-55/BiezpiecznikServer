import './ds';
import './styles/global.css';
import { TopBar } from './sections/TopBar';
import { Hero } from './sections/Hero';
import { Demo } from './sections/Demo';
import { Problem } from './sections/Problem';
import { HowItWorks } from './sections/HowItWorks';
import { Benefits } from './sections/Benefits';
import { Privacy } from './sections/Privacy';
import { Sources } from './sections/Sources';
import { Download } from './sections/Download';
import { Install } from './sections/Install';
import { Faq } from './sections/Faq';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';

export function App() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Demo />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Privacy />
        <Sources />
        <Download />
        <Install />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
