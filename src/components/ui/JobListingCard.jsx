import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';

export default function JobListingCard({ listing, onApply, index = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group p-6 rounded-xl border border-white/[0.06] bg-dark-secondary hover:border-primary-500/30 transition-all duration-300"
        >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 text-xs rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                            {listing.department}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs rounded-full bg-white/5 text-zinc-400">
                            {listing.type}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                        {listing.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-3 line-clamp-2">{listing.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {listing.location}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {listing.experience}</span>
                        <span className="flex items-center gap-1"><Briefcase size={12} /> {listing.type}</span>
                    </div>
                </div>
                <button
                    onClick={() => onApply(listing)}
                    className="shrink-0 px-6 py-2.5 text-sm font-semibold rounded-full bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 flex items-center gap-2"
                >
                    Apply <ArrowRight size={14} />
                </button>
            </div>
        </motion.div>
    );
}
