import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import siteContent from '../../../config/siteContent';
import RevealOnScroll from '../../ui/RevealOnScroll';
import KineticHeading from '../../ui/KineticHeading';

export default function FAQSection() {
    const { overline, heading, subheading, items } = siteContent.home.faq;
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section id="faq" className="section-padding relative">
            <div className="container-custom max-w-4xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <RevealOnScroll>
                        <span className="text-xs uppercase tracking-[0.25em] text-primary-400 font-semibold">
                            {overline}
                        </span>
                    </RevealOnScroll>
                    <KineticHeading
                        text={heading}
                        as="h2"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-white"
                    />
                    <RevealOnScroll delay={0.2}>
                        <p className="text-base md:text-lg text-zinc-400 mt-6">{subheading}</p>
                    </RevealOnScroll>
                </div>

                <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                    {items.map((it, i) => {
                        const isOpen = openIdx === i;
                        return (
                            <RevealOnScroll key={i} delay={0.03 * i}>
                                <div
                                    itemScope
                                    itemType="https://schema.org/Question"
                                    itemProp="mainEntity"
                                    className="rounded-xl glass border border-white/5 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenIdx(isOpen ? -1 : i)}
                                        className="w-full flex items-center justify-between gap-6 p-6 text-left hover:bg-white/[0.02] transition-colors"
                                        aria-expanded={isOpen}
                                    >
                                        <h3 itemProp="name" className="text-base md:text-lg font-semibold text-white">
                                            {it.q}
                                        </h3>
                                        <span className={`shrink-0 w-9 h-9 rounded-full grid place-items-center transition-all ${isOpen ? 'bg-primary-500 text-white rotate-180' : 'bg-white/5 text-primary-400'}`}>
                                            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                itemScope
                                                itemType="https://schema.org/Answer"
                                                itemProp="acceptedAnswer"
                                            >
                                                <div className="px-6 pb-6 pt-0">
                                                    <p itemProp="text" className="text-sm md:text-base text-zinc-400 leading-relaxed">
                                                        {it.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                <RevealOnScroll className="mt-12 text-center">
                    <p className="text-sm text-zinc-500">
                        Still have questions?{' '}
                        <a href="mailto:hr@astyv.com" className="text-primary-400 hover:text-primary-300 underline underline-offset-4">
                            Email Astyv directly
                        </a>
                        .
                    </p>
                </RevealOnScroll>
            </div>
        </section>
    );
}
