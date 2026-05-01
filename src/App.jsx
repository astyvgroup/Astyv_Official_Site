import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import siteContent from './config/siteContent';
import validateContent from './config/content/_validate';

// Layout (kept eager — needed on every page)
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

// New MagicCursor (CursorFollower remains available in components/ui/ but
// is no longer mounted globally to avoid double cursors)
import MagicCursor from './components/effects/MagicCursor';

// Global effects added in the redesign — additive, never replace existing
import ScrollProgressBar from './components/effects/ScrollProgressBar';
import AuroraBackground from './components/effects/AuroraBackground';

// Pages — code-split for faster first paint and better SEO scores
const HomePage         = lazy(() => import('./pages/HomePage'));
const AboutPage        = lazy(() => import('./pages/AboutPage'));
const ServicesPage     = lazy(() => import('./pages/ServicesPage'));
const CaseStudiesPage  = lazy(() => import('./pages/CaseStudiesPage'));
const CareersPage      = lazy(() => import('./pages/CareersPage'));
const ContactPage      = lazy(() => import('./pages/ContactPage'));
const AdminPage        = lazy(() => import('./pages/AdminPage'));
const ComingSoonPage   = lazy(() => import('./pages/ComingSoonPage'));
const LegalPage        = lazy(() => import('./pages/LegalPage'));

function PageFallback() {
    return (
        <div className="min-h-screen grid place-items-center bg-[#0A0A0A]">
            <div
                className="w-12 h-12 rounded-full"
                style={{
                    background: 'radial-gradient(circle, #852BED 0%, transparent 70%)',
                    animation: 'glow-pulse 1.4s ease-in-out infinite',
                }}
            />
        </div>
    );
}

function AnimatedRoutes() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    const launchMode = siteContent.launch.launchMode;

    if (launchMode === 'coming-soon' && !isAdmin) {
        // Single-page mode — only show coming-soon, redirect everything else to /
        return (
            <Suspense fallback={<PageFallback />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<ComingSoonPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        );
    }

    return (
        <>
            {!isAdmin && <Navbar />}
            <AnimatePresence mode="wait">
                <Suspense fallback={<PageFallback />}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/"             element={<HomePage />} />
                        <Route path="/about"        element={<AboutPage />} />
                        <Route path="/services"     element={<ServicesPage />} />
                        <Route path="/case-studies" element={<CaseStudiesPage />} />
                        <Route path="/careers"      element={<CareersPage />} />
                        <Route path="/contact"      element={<ContactPage />} />
                        <Route path="/privacy"      element={<LegalPage doc="privacy" />} />
                        <Route path="/terms"        element={<LegalPage doc="terms" />} />
                        <Route path="/cookies"      element={<LegalPage doc="cookies" />} />
                        <Route path="/admin"        element={<AdminPage />} />
                        <Route path="*"             element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </AnimatePresence>
            {!isAdmin && <Footer />}
        </>
    );
}

function App() {
    useEffect(() => {
        validateContent(siteContent);
    }, []);

    const launchMode = siteContent.launch.launchMode;

    return (
        <BrowserRouter>
            <ScrollToTop />
            {/* Global effects — work everywhere, gracefully degrade on touch / reduced-motion */}
            <ScrollProgressBar />
            {/* MagicCursor is the new enhanced cursor; CursorFollower is kept available
                if anyone imports it directly. We only mount one to avoid duplicate cursors. */}
            <MagicCursor />
            {/* Aurora is rendered as a low-opacity, fixed-position page background.
                Skipped on the coming-soon mode (it has its own bespoke background). */}
            {launchMode !== 'coming-soon' && <AuroraBackground intensity="subtle" />}
            <AnimatedRoutes />
        </BrowserRouter>
    );
}

export default App;
