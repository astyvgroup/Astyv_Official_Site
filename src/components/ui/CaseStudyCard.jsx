import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CaseStudyCard({ study, index = 0, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            onClick={onClick}
            className="group cursor-pointer rounded-xl overflow-hidden border border-white/[0.06] bg-dark-secondary hover:border-primary-500/30 transition-all duration-500"
        >
            {/* Image placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary-900/40 to-dark-tertiary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/20">
                        {study.industry}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">{study.client}</p>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                    {study.title}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4">{study.challenge}</p>
                <div className="flex items-center gap-1 text-sm text-primary-400 font-medium group-hover:gap-2 transition-all">
                    View case study <ArrowRight size={14} />
                </div>
            </div>
        </motion.div>
    );
}
