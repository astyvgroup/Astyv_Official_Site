import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import ContactForm from '../../ui/ContactForm';
import RevealOnScroll from '../../ui/RevealOnScroll';
import siteContent from '../../../config/siteContent';

const iconMap = { Mail, Phone, MapPin, Linkedin };

export default function ContactFormSection() {
    const { info } = siteContent.contact;

    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <RevealOnScroll>
                            <div className="p-6 md:p-8 lg:p-10 rounded-2xl border border-white/[0.06] bg-dark-secondary">
                                <ContactForm />
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Contact info */}
                    <div className="lg:col-span-2">
                        <RevealOnScroll delay={0.2}>
                            <h3 className="text-xl font-bold text-white mb-6">{info.heading}</h3>
                            <div className="space-y-6">
                                {info.items.map((item) => {
                                    const Icon = iconMap[item.icon] || Mail;
                                    return (
                                        <a
                                            key={item.label}
                                            href={item.link}
                                            target={item.link.startsWith('http') ? '_blank' : undefined}
                                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/20 transition-colors">
                                                <Icon className="w-5 h-5 text-primary-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                                                <p className="text-sm text-zinc-300 group-hover:text-primary-300 transition-colors">{item.value}</p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Map placeholder */}
                            <div className="mt-10 h-48 rounded-xl border border-white/[0.06] bg-dark-secondary overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-dark-tertiary flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-8 h-8 text-primary-400/50 mx-auto mb-2" />
                                        <p className="text-xs text-zinc-500">WeWork, Financial District</p>
                                        <p className="text-xs text-zinc-600">Hyderabad, India</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}
