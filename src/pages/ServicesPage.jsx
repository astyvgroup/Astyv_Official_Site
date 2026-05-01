import PageTransition from '../components/layout/PageTransition';
import ServicesHero from '../components/sections/services/ServicesHero';
import ServiceDetail from '../components/sections/services/ServiceDetail';
import TechStack from '../components/sections/services/TechStack';
import CTASection from '../components/sections/home/CTASection';
import SEOHead from '../components/seo/SEOHead';

export default function ServicesPage() {
    return (
        <>
            <SEOHead page="services" />
            <PageTransition>
                <main>
                    <ServicesHero />
                    <ServiceDetail />
                    <TechStack />
                    <CTASection />
                </main>
            </PageTransition>
        </>
    );
}
