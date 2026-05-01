import PageTransition from '../components/layout/PageTransition';
import PointCloudHero from '../components/sections/home/PointCloudHero';
import HeroSection from '../components/sections/home/HeroSection';
import ServicesPreview from '../components/sections/home/ServicesPreview';
import StatsBar from '../components/sections/home/StatsBar';
import WhyAstyv from '../components/sections/home/WhyAstyv';
import ProcessJourney from '../components/sections/home/ProcessJourney';
import IndustriesSection from '../components/sections/home/IndustriesSection';
import CaseStudiesPreview from '../components/sections/home/CaseStudiesPreview';
import TechMarqueeSection from '../components/sections/home/TechMarqueeSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';
import InsightsSection from '../components/sections/home/InsightsSection';
import FAQSection from '../components/sections/home/FAQSection';
import CTASection from '../components/sections/home/CTASection';
import SEOHead from '../components/seo/SEOHead';

export default function HomePage() {
    return (
        <>
            <SEOHead page="home" />
            <PageTransition>
                <main>
                    {/* Above-the-fold (kept) */}
                    <PointCloudHero />
                    <HeroSection />

                    {/* Existing sections (untouched) */}
                    <ServicesPreview />
                    <StatsBar />
                    <WhyAstyv />

                    {/* New: 6-step process journey */}
                    <ProcessJourney />

                    {/* New: industries served */}
                    <IndustriesSection />

                    {/* Existing case studies preview */}
                    <CaseStudiesPreview />

                    {/* New: tech stack marquee */}
                    <TechMarqueeSection />

                    {/* Existing testimonials (kept) */}
                    <TestimonialsSection />

                    {/* New: insights/blog teaser */}
                    <InsightsSection />

                    {/* New: FAQ — also feeds JSON-LD FAQPage for SEO */}
                    <FAQSection />

                    {/* Final CTA */}
                    <CTASection />
                </main>
            </PageTransition>
        </>
    );
}
