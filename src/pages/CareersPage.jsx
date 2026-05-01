import PageTransition from '../components/layout/PageTransition';
import CareersHero from '../components/sections/careers/CareersHero';
import WhyWorkHere from '../components/sections/careers/WhyWorkHere';
import OpenPositions from '../components/sections/careers/OpenPositions';
import SEOHead from '../components/seo/SEOHead';

export default function CareersPage() {
    return (
        <>
            <SEOHead page="careers" />
            <PageTransition>
                <main>
                    <CareersHero />
                    <WhyWorkHere />
                    <OpenPositions />
                </main>
            </PageTransition>
        </>
    );
}
