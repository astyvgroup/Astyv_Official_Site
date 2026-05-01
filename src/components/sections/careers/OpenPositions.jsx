import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobListingCard from '../../ui/JobListingCard';
import EmptyStateCareers from '../../ui/EmptyStateCareers';
import ApplicationForm from '../../ui/ApplicationForm';
import SectionHeading from '../../ui/SectionHeading';
import siteContent from '../../../config/siteContent';
import { fetchCareersData, getActiveListings, filterByDepartment } from '../../../utils/careersData';

export default function OpenPositions() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDept, setSelectedDept] = useState('All');
    const [applyingTo, setApplyingTo] = useState(null);
    const { departments } = siteContent.careers;

    useEffect(() => {
        fetchCareersData().then(data => {
            setListings(getActiveListings(data));
            setLoading(false);
        });
    }, []);

    const filtered = filterByDepartment(listings, selectedDept);

    const handleApply = (listing) => {
        setApplyingTo(listing);
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        setApplyingTo(null);
        document.body.classList.remove('modal-open');
    };

    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    </div>
                ) : listings.length === 0 ? (
                    <>
                        <EmptyStateCareers />
                        <div className="max-w-xl mx-auto mt-12 p-8 rounded-2xl border border-white/[0.06] bg-dark-secondary">
                            <ApplicationForm isGeneral role="General Application" />
                        </div>
                    </>
                ) : (
                    <>
                        <SectionHeading title="Open Positions" subtitle={`${listings.length} roles available across our teams.`} />

                        {/* Department filter */}
                        <div className="flex flex-wrap justify-center gap-2 mb-10">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDept(dept)}
                                    className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${selectedDept === dept
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>

                        {/* Job listings */}
                        <div className="space-y-4 max-w-4xl mx-auto">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((listing, i) => (
                                    <motion.div
                                        key={listing.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <JobListingCard listing={listing} onApply={handleApply} index={i} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {filtered.length === 0 && (
                                <p className="text-center text-zinc-500 py-8">No positions in this department right now.</p>
                            )}
                        </div>

                        {/* General application CTA */}
                        <div className="max-w-xl mx-auto mt-20 p-8 rounded-2xl border border-white/[0.06] bg-dark-secondary">
                            <ApplicationForm isGeneral role="General Application" />
                        </div>
                    </>
                )}
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {applyingTo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
                        onClick={closeModal}
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-dark-primary rounded-t-2xl md:rounded-2xl border border-white/[0.06] p-6 md:p-8"
                        >
                            <button onClick={closeModal} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl">&times;</button>
                            <div className="mb-6">
                                <p className="text-xs text-primary-400 uppercase tracking-wider mb-1">{applyingTo.department} · {applyingTo.type}</p>
                                <h2 className="text-xl font-bold text-white">{applyingTo.title}</h2>
                            </div>
                            <ApplicationForm role={applyingTo.title} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
