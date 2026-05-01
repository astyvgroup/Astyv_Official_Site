import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from '../../ui/RevealOnScroll';
import TechPill from '../../ui/TechPill';
import siteContent from '../../../config/siteContent';

export default function CaseStudyDetail() {
    const { studies } = siteContent.caseStudies;

    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom space-y-24">
                {studies.map((study, si) => (
                    <RevealOnScroll key={study.id}>
                        <div id={study.id} className="scroll-mt-24">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">{study.industry}</span>
                                    <span className="text-xs text-zinc-500">{study.client}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{study.title}</h2>
                            </div>

                            {/* Challenge & Solution */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                                <div className="p-6 lg:p-8 rounded-xl border border-white/[0.06] bg-dark-secondary">
                                    <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">The Challenge</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{study.challenge}</p>
                                </div>
                                <div className="p-6 lg:p-8 rounded-xl border border-white/[0.06] bg-dark-secondary">
                                    <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Our Solution</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{study.solution}</p>
                                </div>
                            </div>

                            {/* Results table */}
                            <div className="rounded-xl border border-white/[0.06] bg-dark-secondary overflow-hidden mb-8">
                                <div className="p-4 border-b border-white/[0.06]">
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Results</h3>
                                </div>
                                <div className="divide-y divide-white/[0.06]">
                                    {study.results.map((result) => (
                                        <div key={result.metric} className="grid grid-cols-3 gap-4 p-4 text-sm">
                                            <span className="text-zinc-400">{result.metric}</span>
                                            <span className="text-zinc-500 text-center">{result.before}</span>
                                            <span className="text-primary-400 font-semibold text-center">{result.after}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2">
                                {study.technologies.map((tech) => (
                                    <TechPill key={tech} name={tech} />
                                ))}
                            </div>

                            {si < studies.length - 1 && <div className="mt-24 border-b border-white/[0.06]" />}
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    );
}
