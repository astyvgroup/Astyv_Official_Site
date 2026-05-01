import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import siteContent from '../../config/siteContent';
import useScrollProgress from '../../hooks/useScrollProgress';
import BrandLogo from '../ui/BrandLogo';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScrollProgress();
    const location = useLocation();
    const { nav } = siteContent;

    useEffect(() => {
        setScrolled(scrollY > 50);
    }, [scrollY]);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong border-b border-white/5' : 'bg-transparent'}`}
                style={{ height: scrolled ? '64px' : 'var(--nav-height)' }}
            >
                <div className="container-custom h-full flex items-center justify-between">
                    {/* Brand: purple "A" icon mark on transparent bg */}
                    <Link
                        to="/"
                        className="relative z-10 flex items-center gap-2 transition-all duration-300"
                        aria-label="Astyv home"
                        data-cursor="Home"
                    >
                        <BrandLogo
                            variant="iconTransparent"
                            alt="Astyv"
                            className={`w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`}
                        />
                        <span className="sr-only">Astyv</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {nav.links.map((link) => {
                            const active = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    data-cursor={link.label}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary-300 ${active ? 'text-primary-300' : 'text-zinc-300'}`}
                                >
                                    {link.label}
                                    {active && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <Link
                            to={nav.ctaButton.path}
                            data-cursor="Talk"
                            className="ml-3 inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full bg-primary-500 !text-white hover:bg-primary-600 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5"
                        >
                            {nav.ctaButton.label}
                            <ArrowRight size={14} />
                        </Link>

                        <ThemeToggle className="ml-3" />
                    </div>

                    <div className="lg:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative z-10 p-2 text-zinc-300"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div className="absolute inset-0 bg-dark-primary/95 backdrop-blur-xl" />
                        <div className="relative h-full flex flex-col items-center justify-center gap-8 px-6">
                            {nav.links.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: i * 0.06, duration: 0.3 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-3xl font-bold transition-colors ${location.pathname === link.path ? 'text-primary-400' : 'text-white hover:text-primary-300'}`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                            >
                                <Link
                                    to={nav.ctaButton.path}
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-full bg-primary-500 !text-white shadow-lg shadow-primary-500/30"
                                >
                                    {nav.ctaButton.label}
                                    <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
