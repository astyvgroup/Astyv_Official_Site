import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, center = true, light = true }) {
    return (
        <div className={`mb-16 ${center ? 'text-center' : ''}`}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-dark-primary'}`}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`text-base md:text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-zinc-400' : 'text-zinc-600'}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
