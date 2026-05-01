import { Globe, GraduationCap, Heart, Rocket, GitBranch, TrendingUp } from 'lucide-react';
import RevealOnScroll from '../../ui/RevealOnScroll';
import GlowCard from '../../ui/GlowCard';
import SectionHeading from '../../ui/SectionHeading';
import siteContent from '../../../config/siteContent';

const iconMap = { Globe, GraduationCap, Heart, Rocket, GitBranch, TrendingUp };

export default function WhyWorkHere() {
    const { perks } = siteContent.careers;

    return (
        <section className="section-padding bg-dark-secondary">
            <div className="container-custom">
                <SectionHeading title="Why Join Astyv" subtitle="We invest in our people as seriously as we invest in our clients." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {perks.map((perk, i) => {
                        const Icon = iconMap[perk.icon] || Rocket;
                        return (
                            <RevealOnScroll key={perk.title} delay={i * 0.08}>
                                <GlowCard className="h-full">
                                    <Icon className="w-8 h-8 text-primary-400 mb-4" />
                                    <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{perk.description}</p>
                                </GlowCard>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
