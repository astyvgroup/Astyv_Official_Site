import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import siteContent from '../../config/siteContent';
import { sendContactForm } from '../../utils/emailService';

export default function ContactForm() {
    const { form } = siteContent.contact;
    const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [errorDetail, setErrorDetail] = useState('');

    const validate = () => {
        const errs = {};
        if (!formData.name) errs.name = 'Name is required';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email required';
        if (!formData.company) errs.company = 'Company is required';
        if (!formData.service) errs.service = 'Please select a service';
        if (!formData.message || formData.message.length < 20) errs.message = 'Message must be at least 20 characters';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('sending');
        setErrorDetail('');
        try {
            await sendContactForm(formData);
            setStatus('success');
            setFormData({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
        } catch (err) {
            setErrorDetail(err?.message || '');
            setStatus('error');
        }
    };

    const inputCls = "w-full px-4 py-3 rounded-lg bg-dark-tertiary border border-white/10 text-white placeholder:text-zinc-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all";

    if (status === 'success') {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold mb-2">{form.successMessage}</p>
                <button onClick={() => setStatus('idle')} className="text-primary-400 text-sm hover:underline mt-4">Send another message</button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{form.fields.name.label}</label>
                    <input type="text" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder={form.fields.name.placeholder} className={inputCls} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{form.fields.email.label}</label>
                    <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder={form.fields.email.placeholder} className={inputCls} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{form.fields.company.label}</label>
                    <input type="text" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} placeholder={form.fields.company.placeholder} className={inputCls} />
                    {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{form.fields.phone.label}</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} placeholder={form.fields.phone.placeholder} className={inputCls} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{form.fields.service.label}</label>
                    <select value={formData.service} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))} className={`${inputCls} ${!formData.service ? 'text-zinc-600' : ''}`}>
                        <option value="">Select a service...</option>
                        {form.fields.service.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">{form.fields.budget.label}</label>
                    <select value={formData.budget} onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))} className={`${inputCls} ${!formData.budget ? 'text-zinc-600' : ''}`}>
                        <option value="">Select range...</option>
                        {form.fields.budget.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">{form.fields.message.label}</label>
                <textarea rows={5} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder={form.fields.message.placeholder} className={`${inputCls} resize-none`} />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>
            {status === 'error' && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-red-300">
                        <p>{form.errorMessage}</p>
                        {errorDetail && <p className="text-xs text-red-300/80 mt-1">{errorDetail}</p>}
                    </div>
                </div>
            )}
            <button type="submit" disabled={status === 'sending'} className="w-full py-3.5 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                {status === 'sending' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : form.submitButton}
            </button>
        </form>
    );
}
