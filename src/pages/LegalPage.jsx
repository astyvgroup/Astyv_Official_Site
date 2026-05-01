import { motion } from 'framer-motion';
import siteContent from '../config/siteContent';
import SEOHead from '../components/seo/SEOHead';
import RevealOnScroll from '../components/ui/RevealOnScroll';

export default function LegalPage({ doc = 'privacy' }) {
    const data = siteContent.legal[doc];
    if (!data) return null;

    return (
        <>
            <SEOHead page={doc} />
            <motion.main
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="pt-32 pb-24"
            >
                <div className="container-custom max-w-3xl">
                    <RevealOnScroll>
                        <span className="text-xs uppercase tracking-[0.25em] text-primary-400 font-semibold">
                            Legal
                        </span>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">{data.title}</h1>
                        <p className="mt-4 text-sm text-zinc-500">Last updated: {data.lastUpdated}</p>
                        <p className="mt-8 text-base md:text-lg text-zinc-300 leading-relaxed">{data.intro}</p>
                    </RevealOnScroll>

                    <div className="mt-16 space-y-12">
                        {data.sections.map((s, i) => (
                            <RevealOnScroll key={i} delay={0.05 * i}>
                                <section>
                                    <h2 className="text-xl md:text-2xl font-bold text-white">{s.heading}</h2>
                                    <p className="mt-4 text-base text-zinc-400 leading-relaxed">{s.content}</p>
                                </section>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </motion.main>
        </>
    );
}
