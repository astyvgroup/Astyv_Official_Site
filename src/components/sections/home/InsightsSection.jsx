import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import siteContent from '../../../config/siteContent';
import RevealOnScroll from '../../ui/RevealOnScroll';
import KineticHeading from '../../ui/KineticHeading';
import TiltCard from '../../ui/TiltCard';

export default function InsightsSection() {
    const { overline, heading, subheading, items, cta } = siteContent.home.insights;

    return (
        <section id="insights" className="section-padding relative">
            <div className="container-custom">
                <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
                    <div className="max-w-2xl">
                        <RevealOnScroll>
                            <span className="text-xs uppercase tracking-[0.25em] text-primary-400 font-semibold">
                                {overline}
                            </span>
                        </RevealOnScroll>
                        <KineticHeading
                            text={heading}
                            as="h2"
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-white"
                        />
                        <RevealOnScroll delay={0.2}>
                            <p className="text-base text-zinc-400 mt-4 max-w-xl">{subheading}</p>
                        </RevealOnScroll>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((post, i) => (
                        <RevealOnScroll key={post.slug} delay={0.07 * i}>
                            <TiltCard intensity={6} className="h-full rounded-2xl">
                                <article className="h-full p-7 rounded-2xl glass border border-white/5 hover:border-primary-500/40 transition-colors flex flex-col group cursor-pointer" data-cursor="Read soon">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[10px] uppercase tracking-widest font-semibold text-primary-400 bg-primary-500/10 border border-primary-500/30 px-2.5 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-primary-300 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-6 flex items-center justify-between">
                                        <span className="text-xs text-zinc-500">{post.date}</span>
                                        <motion.span
                                            whileHover={{ x: 3, y: -3 }}
                                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-colors"
                                        >
                                            <ArrowUpRight size={16} />
                                        </motion.span>
                                    </div>
                                </article>
                            </TiltCard>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
