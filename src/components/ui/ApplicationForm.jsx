import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import siteContent from '../../config/siteContent';
import { sendApplication } from '../../utils/applicationService';

export default function ApplicationForm({ role = '', isGeneral = false }) {
    const content = siteContent.careers.applicationForm;
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', role: role || '', linkedin: '', coverNote: '',
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const fileInputRef = useRef(null);

    const validate = () => {
        const errs = {};
        if (!formData.name || formData.name.length < 2) errs.name = 'Name is required (min 2 characters)';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email is required';
        if (!resumeFile) errs.resume = 'Please upload your resume (PDF)';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            setErrors(prev => ({ ...prev, resume: 'Only PDF files are accepted' }));
            return;
        }
        if (file.size > content.fields.resume.maxSizeMB * 1024 * 1024) {
            setErrors(prev => ({ ...prev, resume: `File must be under ${content.fields.resume.maxSizeMB}MB` }));
            return;
        }
        setResumeFile(file);
        setErrors(prev => { const { resume, ...rest } = prev; return rest; });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('sending');
        try {
            await sendApplication(formData, resumeFile);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', role: '', linkedin: '', coverNote: '' });
            setResumeFile(null);
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold mb-2">{content.successMessage}</p>
                <button onClick={() => setStatus('idle')} className="text-primary-400 text-sm hover:underline mt-4">
                    Submit another application
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-2xl font-bold text-white mb-2">
                {isGeneral ? content.generalHeading : content.heading}
            </h3>
            {isGeneral && (
                <p className="text-zinc-400 text-sm mb-6">{content.generalSubheading}</p>
            )}

            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">{content.fields.name.label}</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={content.fields.name.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-dark-tertiary border border-white/10 text-white placeholder:text-zinc-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">{content.fields.email.label}</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={content.fields.email.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-dark-tertiary border border-white/10 text-white placeholder:text-zinc-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone & Role row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{content.fields.phone.label}</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder={content.fields.phone.placeholder}
                        className="w-full px-4 py-3 rounded-lg bg-dark-tertiary border border-white/10 text-white placeholder:text-zinc-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{content.fields.role.label}</label>
                    <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        placeholder={content.fields.role.placeholder}
                        className="w-full px-4 py-3 rounded-lg bg-dark-tertiary border border-white/10 text-white placeholder:text-zinc-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                    />
                </div>
            </div>

            {/* LinkedIn */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">{content.fields.linkedin.label}</label>
                <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    placeholder={content.fields.linkedin.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-dark-tertiary border border-white/10 text-white placeholder:text-zinc-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                />
            </div>

            {/* Cover Note */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">{content.fields.coverNote.label}</label>
                <textarea
                    rows={4}
                    value={formData.coverNote}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverNote: e.target.value }))}
                    placeholder={content.fields.coverNote.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-dark-tertiary border border-white/10 text-white placeholder:text-zinc-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none"
                />
            </div>

            {/* Resume Upload */}
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">{content.fields.resume.label}</label>
                {resumeFile ? (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-tertiary border border-primary-500/30">
                        <FileText className="w-5 h-5 text-primary-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{resumeFile.name}</p>
                            <p className="text-xs text-zinc-500">{(resumeFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                        <button type="button" onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="text-zinc-400 hover:text-red-400">
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-white/10 hover:border-primary-500/30 cursor-pointer transition-colors"
                    >
                        <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                        <p className="text-sm text-zinc-400">Click to upload PDF</p>
                        <p className="text-xs text-zinc-600 mt-1">Max {content.fields.resume.maxSizeMB}MB</p>
                    </div>
                )}
                <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                {errors.resume && <p className="text-red-400 text-xs mt-1">{errors.resume}</p>}
            </div>

            {/* Error banner */}
            {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-sm text-red-300">{content.errorMessage}</p>
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
                {status === 'sending' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : content.submitButton}
            </button>
        </form>
    );
}
