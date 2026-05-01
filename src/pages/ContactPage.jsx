import PageTransition from '../components/layout/PageTransition';
import ContactHero from '../components/sections/contact/ContactHero';
import ContactFormSection from '../components/sections/contact/ContactFormSection';
import SEOHead from '../components/seo/SEOHead';

export default function ContactPage() {
    return (
        <>
            <SEOHead page="contact" />
            <PageTransition>
                <main>
                    <ContactHero />
                    <ContactFormSection />
                </main>
            </PageTransition>
        </>
    );
}
