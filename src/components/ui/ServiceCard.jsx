import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, BrainCircuit, Code2, Users, ArrowRight } from 'lucide-react';
import GlowCard from './GlowCard';

const iconMap = { Lightbulb, BrainCircuit, Code2, Users };

export default function ServiceCard({ icon, title, description, link, index = 0 }) {
    const Icon = iconMap[icon] || Code2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <GlowCard className="h-full">
                <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">{description}</p>
                    <Link
                        to={link}
                        className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors group"
                    >
                        Learn more
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </GlowCard>
        </motion.div>
    );
}
