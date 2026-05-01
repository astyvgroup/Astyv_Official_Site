import PageTransition from '../components/layout/PageTransition';
import AboutHero from '../components/sections/about/AboutHero';
import MissionVision from '../components/sections/about/MissionVision';
import Timeline from '../components/sections/about/Timeline';
import CultureValues from '../components/sections/about/CultureValues';
import CTASection from '../components/sections/home/CTASection';
import SEOHead from '../components/seo/SEOHead';

export default function AboutPage() {
    return (
        <>
            <SEOHead page="about" />
            <PageTransition>
                <main>
                    <AboutHero />
                    <MissionVision />
                    <CultureValues />
                    <Timeline />
                    <CTASection />
                </main>
            </PageTransition>
        </>
    );
}
