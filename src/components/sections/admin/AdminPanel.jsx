import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Download, Copy, Pencil, Trash2, ToggleLeft, ToggleRight, Search, Check, X, Save } from 'lucide-react';
import { verifyPassword, createSession, isSessionValid, clearSession } from '../../../utils/adminAuth';
import { fetchCareersData } from '../../../utils/careersData';
import siteContent from '../../../config/siteContent';
import logoLight from '../../../assets/brand/logo-light.svg';

// =====================================================================
// Admin Login Component
// =====================================================================
function AdminLogin({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const valid = await verifyPassword(password);
        if (valid) {
            createSession();
            onLogin();
        } else {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm p-8 rounded-2xl border border-white/[0.06] bg-dark-secondary"
            >
                <div className="text-center mb-8">
                    <img src={logoLight} alt={siteContent.brand.name} className="h-8 mx-auto mb-6" />
                    <h1 className="text-xl font-bold text-white">Admin Access</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(false); }}
                        placeholder="Enter password"
                        autoFocus
                        className={`w-full px-4 py-3 rounded-lg bg-dark-tertiary border text-white placeholder:text-zinc-600 outline-none transition-all mb-4 ${error ? 'border-red-500 animate-[shake_0.3s_ease-in-out]' : 'border-white/10 focus:border-primary-500'}`}
                    />
                    {error && <p className="text-red-400 text-xs mb-4">Incorrect password</p>}
                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full py-3 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 disabled:opacity-50 transition-all"
                    >
                        {loading ? 'Verifying...' : 'Enter'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

// =====================================================================
// Job Editor Component
// =====================================================================
function JobEditor({ listing, departments, onSave, onCancel }) {
    const [form, setForm] = useState(listing || {
        id: '', title: '', department: departments[1] || '', location: '', type: 'Full-Time',
        experience: '', description: '', responsibilities: '', requirements: '', niceToHave: '',
        active: true, postedDate: new Date().toISOString().split('T')[0],
    });

    const isNew = !listing;

    const handleSave = () => {
        const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const saved = {
            ...form,
            id: form.id || `${slug}-${Date.now().toString(36)}`,
            responsibilities: typeof form.responsibilities === 'string' ? form.responsibilities.split('\n').filter(Boolean) : form.responsibilities,
            requirements: typeof form.requirements === 'string' ? form.requirements.split('\n').filter(Boolean) : form.requirements,
            niceToHave: typeof form.niceToHave === 'string' ? form.niceToHave.split('\n').filter(Boolean) : form.niceToHave,
        };
        onSave(saved);
    };

    const inputCls = "w-full px-3 py-2.5 rounded-lg bg-dark-tertiary border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:border-primary-500 outline-none transition-all";

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">{isNew ? 'Add New Listing' : 'Edit Listing'}</h2>
                <button onClick={onCancel} className="text-zinc-400 hover:text-white"><X size={20} /></button>
            </div>

            <div>
                <label className="block text-xs text-zinc-400 mb-1">Job Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Senior Full-Stack Engineer" className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs text-zinc-400 mb-1">Department *</label>
                    <select value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} className={inputCls}>
                        {departments.filter(d => d !== 'All').map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-zinc-400 mb-1">Type</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className={inputCls}>
                        {['Full-Time', 'Part-Time', 'Contract', 'Contract-to-Hire'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs text-zinc-400 mb-1">Location</label>
                    <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="Remote (US/EU)" className={inputCls} />
                </div>
                <div>
                    <label className="block text-xs text-zinc-400 mb-1">Experience</label>
                    <input value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} placeholder="5+ years" className={inputCls} />
                </div>
            </div>
            <div>
                <label className="block text-xs text-zinc-400 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief job description..." className={`${inputCls} resize-none`} />
            </div>
            <div>
                <label className="block text-xs text-zinc-400 mb-1">Responsibilities (one per line)</label>
                <textarea rows={4} value={Array.isArray(form.responsibilities) ? form.responsibilities.join('\n') : form.responsibilities} onChange={e => setForm(p => ({ ...p, responsibilities: e.target.value }))} className={`${inputCls} resize-none`} />
            </div>
            <div>
                <label className="block text-xs text-zinc-400 mb-1">Requirements (one per line)</label>
                <textarea rows={4} value={Array.isArray(form.requirements) ? form.requirements.join('\n') : form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} className={`${inputCls} resize-none`} />
            </div>
            <div>
                <label className="block text-xs text-zinc-400 mb-1">Nice to Have (one per line)</label>
                <textarea rows={3} value={Array.isArray(form.niceToHave) ? form.niceToHave.join('\n') : form.niceToHave} onChange={e => setForm(p => ({ ...p, niceToHave: e.target.value }))} className={`${inputCls} resize-none`} />
            </div>
            <div className="flex items-center gap-3">
                <label className="text-xs text-zinc-400">Active</label>
                <button onClick={() => setForm(p => ({ ...p, active: !p.active }))} className="text-primary-400">
                    {form.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-zinc-500" />}
                </button>
            </div>
            <div className="flex gap-3 pt-4">
                <button onClick={handleSave} className="flex-1 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-all flex items-center justify-center gap-2">
                    <Save size={14} /> {isNew ? 'Add Listing' : 'Save Changes'}
                </button>
                <button onClick={onCancel} className="px-6 py-2.5 rounded-full border border-white/10 text-zinc-400 text-sm hover:text-white transition-all">Cancel</button>
            </div>
        </motion.div>
    );
}

// =====================================================================
// Admin Dashboard Component
// =====================================================================
function AdminDashboard({ onLogout }) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list'); // list | edit | export
    const [editingListing, setEditingListing] = useState(null);
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const departments = siteContent.careers.departments;

    useEffect(() => {
        fetchCareersData().then(data => {
            setListings(data.listings || []);
            setLoading(false);
        });
    }, []);

    const filtered = listings.filter(l =>
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.department.toLowerCase().includes(search.toLowerCase())
    );

    const handleSaveListing = (saved) => {
        if (editingListing) {
            setListings(prev => prev.map(l => l.id === saved.id ? saved : l));
        } else {
            setListings(prev => [...prev, saved]);
        }
        setView('list');
        setEditingListing(null);
    };

    const toggleActive = (id) => {
        setListings(prev => prev.map(l => l.id === id ? { ...l, active: !l.active } : l));
    };

    const deleteListing = (id) => {
        setListings(prev => prev.filter(l => l.id !== id));
        setDeleteConfirm(null);
    };

    const exportData = () => {
        return JSON.stringify({ lastUpdated: new Date().toISOString(), listings }, null, 2);
    };

    const downloadJSON = () => {
        const blob = new Blob([exportData()], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'careers.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyJSON = () => {
        navigator.clipboard.writeText(exportData());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const activeCount = listings.filter(l => l.active).length;
    const inactiveCount = listings.length - activeCount;

    return (
        <div className="min-h-screen bg-dark-primary">
            {/* Top bar */}
            <div className="border-b border-white/[0.06] bg-dark-secondary">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logoLight} alt="Astyv" className="h-6" />
                        <span className="text-sm font-semibold text-zinc-400">Admin</span>
                    </div>
                    <button onClick={onLogout} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button onClick={() => { setView('list'); setEditingListing(null); }} className={`px-4 py-2 text-sm rounded-lg transition-all ${view !== 'export' ? 'bg-primary-500/10 text-primary-400' : 'text-zinc-400 hover:text-white'}`}>
                        Job Listings
                    </button>
                    <button onClick={() => setView('export')} className={`px-4 py-2 text-sm rounded-lg transition-all ${view === 'export' ? 'bg-primary-500/10 text-primary-400' : 'text-zinc-400 hover:text-white'}`}>
                        Export JSON
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                    </div>
                ) : view === 'export' ? (
                    /* Export View */
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white">Export careers.json</h2>
                                <p className="text-sm text-zinc-500 mt-1">{activeCount} active, {inactiveCount} inactive listings</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={copyJSON} className="px-4 py-2 text-sm rounded-lg border border-white/10 text-zinc-300 hover:text-white flex items-center gap-2 transition-all">
                                    {copied ? <><Check size={14} className="text-green-400" /> Copied!</> : <><Copy size={14} /> Copy</>}
                                </button>
                                <button onClick={downloadJSON} className="px-4 py-2 text-sm rounded-lg bg-primary-500 text-white hover:bg-primary-600 flex items-center gap-2 transition-all">
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        </div>
                        <div className="rounded-xl border border-white/[0.06] bg-dark-secondary overflow-hidden">
                            <pre className="p-6 text-xs text-zinc-300 font-mono overflow-auto max-h-[70vh] leading-relaxed">{exportData()}</pre>
                        </div>
                        <p className="text-xs text-zinc-600 mt-4">Replace <code className="text-zinc-500">public/data/careers.json</code> in your repo and push to GitHub.</p>
                    </div>
                ) : view === 'edit' || editingListing !== null ? (
                    /* Editor View */
                    <div className="max-w-2xl">
                        <JobEditor
                            listing={editingListing}
                            departments={departments}
                            onSave={handleSaveListing}
                            onCancel={() => { setView('list'); setEditingListing(null); }}
                        />
                    </div>
                ) : (
                    /* List View */
                    <div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="relative w-full sm:w-72">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..." className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-dark-secondary border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:border-primary-500 outline-none" />
                            </div>
                            <button onClick={() => { setView('edit'); setEditingListing(null); }} className="px-4 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 flex items-center gap-2 transition-all shrink-0">
                                <Plus size={16} /> Add New Listing
                            </button>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                            {/* Table header */}
                            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_120px] gap-4 px-4 py-3 bg-dark-secondary border-b border-white/[0.06] text-xs text-zinc-500 uppercase tracking-wider">
                                <span>Title</span><span>Department</span><span>Location</span><span>Status</span><span>Actions</span>
                            </div>

                            {filtered.length === 0 ? (
                                <p className="text-center text-zinc-500 py-12">No listings found.</p>
                            ) : (
                                filtered.map((listing) => (
                                    <div key={listing.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_120px] gap-2 md:gap-4 px-4 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors items-center">
                                        <div>
                                            <p className="text-sm font-medium text-white">{listing.title}</p>
                                            <p className="text-xs text-zinc-600 md:hidden">{listing.department} · {listing.location}</p>
                                        </div>
                                        <span className="hidden md:block text-sm text-zinc-400">{listing.department}</span>
                                        <span className="hidden md:block text-sm text-zinc-500">{listing.location}</span>
                                        <div>
                                            <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${listing.active ? 'bg-green-500/10 text-green-400' : 'bg-zinc-500/10 text-zinc-500'}`}>
                                                {listing.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => { setEditingListing(listing); setView('edit'); }} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-all" title="Edit">
                                                <Pencil size={14} />
                                            </button>
                                            <button onClick={() => toggleActive(listing.id)} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-primary-400 transition-all" title="Toggle active">
                                                {listing.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                                            </button>
                                            <button onClick={() => setDeleteConfirm(listing.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-all" title="Delete">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete confirmation modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/70" onClick={() => setDeleteConfirm(null)} />
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative p-6 rounded-xl bg-dark-secondary border border-white/[0.06] max-w-sm w-full">
                            <h3 className="text-white font-bold mb-2">Delete Listing?</h3>
                            <p className="text-sm text-zinc-400 mb-6">
                                Are you sure you want to delete &ldquo;{listings.find(l => l.id === deleteConfirm)?.title}&rdquo;? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => deleteListing(deleteConfirm)} className="flex-1 py-2.5 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
                                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-full border border-white/10 text-zinc-400 text-sm hover:text-white">Cancel</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// =====================================================================
// Admin Page — Combines Login + Dashboard
// =====================================================================
export { AdminLogin, AdminDashboard };
