import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import siteContent from '../../config/siteContent';

export default function TestimonialSlider() {
    const { testimonials } = siteContent.home;
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((c) => (c + 1) % testimonials.length);
    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

    return (
        <div className="relative max-w-4xl mx-auto">
            <div className="relative min-h-[280px] flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="text-center px-4"
                    >
                        <Quote className="w-10 h-10 text-primary-500/30 mx-auto mb-6" />
                        <p className="text-lg md:text-xl lg:text-2xl text-zinc-300 leading-relaxed mb-8 italic">
                            &ldquo;{testimonials[current].quote}&rdquo;
                        </p>
                        {(testimonials[current].author || testimonials[current].title) && (
                            <div>
                                {testimonials[current].author && (
                                    <p className="text-white font-semibold">{testimonials[current].author}</p>
                                )}
                                {testimonials[current].title && (
                                    <p className="text-sm text-zinc-500">{testimonials[current].title}</p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
                <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary-500/50 transition-all"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-primary-500 w-6' : 'bg-zinc-600'
                                }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-primary-500/50 transition-all"
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
