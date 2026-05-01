import PageTransition from '../components/layout/PageTransition';
import CaseStudiesHero from '../components/sections/caseStudies/CaseStudiesHero';
import CaseStudyDetail from '../components/sections/caseStudies/CaseStudyDetail';
import CTASection from '../components/sections/home/CTASection';
import SEOHead from '../components/seo/SEOHead';

export default function CaseStudiesPage() {
    return (
        <>
            <SEOHead page="caseStudies" />
            <PageTransition>
                <main>
                    <CaseStudiesHero />
                    <CaseStudyDetail />
                    <CTASection />
                </main>
            </PageTransition>
        </>
    );
}
