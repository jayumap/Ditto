import Navbar from '../components/sections/Navbar';
import HeroSection from '../components/sections/HeroSection';
import HowItWorks from '../components/sections/HowItWorks';
import FeaturesSection from '../components/sections/FeaturesSection';
import StatsBar from '../components/sections/StatsBar';
import SampleMatchCard from '../components/sections/SampleMatchCard';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/sections/Footer';

/**
 * Landing page — composes all sections in the correct order.
 * @param {{ onSearch?: (username: string) => void }} props
 */
export default function LandingPage({ onSearch }) {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection onSearch={onSearch} />
        <HowItWorks />
        <FeaturesSection />
        <StatsBar />
        <SampleMatchCard />
        <CTASection onSearch={onSearch} />
      </main>
      <Footer />
    </>
  );
}
