import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Instagram, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import siteContent from '../../config/siteContent';
import BrandLogo from '../ui/BrandLogo';

export default function Footer() {
    const { footer, brand } = siteContent;
    const year = new Date().getFullYear();

    const socialIcons = {
        linkedin: Linkedin,
        twitter: Twitter,
        github: Github,
        instagram: Instagram,
    };

    return (
        <footer className="relative border-t border-white/5 bg-dark-secondary/40 backdrop-blur-sm">
            {/* Subtle gradient accent on top edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

            <div className="container-custom py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-block mb-5" aria-label="Astyv — Building What's Next">
                            <BrandLogo variant="fullTransparent" alt="Astyv — Building What's Next" className="h-16 w-auto" />
                        </Link>
                        <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-5">
                            {footer.description || brand.description}
                        </p>

                        {/* Quick contact info */}
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-start gap-3 text-xs text-zinc-500">
                                <MapPin size={14} className="text-primary-400 mt-0.5 shrink-0" />
                                <span>{brand.address.line1}, {brand.address.area}, {brand.address.city}, {brand.address.state} {brand.address.zip}</span>
                            </li>
                            <li className="flex items-center gap-3 text-xs text-zinc-500">
                                <Mail size={14} className="text-primary-400 shrink-0" />
                                <a href={`mailto:${brand.email}`} className="hover:text-primary-300 transition-colors">{brand.email}</a>
                            </li>
                            <li className="flex items-center gap-3 text-xs text-zinc-500">
                                <Phone size={14} className="text-primary-400 shrink-0" />
                                <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="hover:text-primary-300 transition-colors">{brand.phone}</a>
                            </li>
                        </ul>

                        <div className="flex gap-3">
                            {Object.entries(brand.social).map(([key, url]) => {
                                const Icon = socialIcons[key];
                                if (!Icon || !url) return null;
                                return (
                                    <motion.a
                                        key={key}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2, scale: 1.05 }}
                                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary-300 hover:border-primary-500/50 transition-colors duration-200"
                                        aria-label={key}
                                        data-cursor={key}
                                    >
                                        <Icon size={16} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footer.columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-[0.2em]">
                                {col.title}
                            </h4>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="group inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-primary-300 transition-colors duration-200"
                                        >
                                            {link.label}
                                            <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                        <p className="text-xs text-zinc-500">
                            {footer.copyright.replace('{year}', year)}
                        </p>
                        {footer.legalLine && (
                            <p className="text-xs text-zinc-600">{footer.legalLine}</p>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {footer.bottomLinks.map((link) => (
                            link.external ? (
                                <a
                                    key={link.label}
                                    href={link.path}
                                    className="text-xs text-zinc-500 hover:text-primary-300 transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    to={link.path}
                                    className="text-xs text-zinc-500 hover:text-primary-300 transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
