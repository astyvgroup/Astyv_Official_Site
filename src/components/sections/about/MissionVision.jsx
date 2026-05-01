import RevealOnScroll from '../../ui/RevealOnScroll';
import siteContent from '../../../config/siteContent';

export default function MissionVision() {
    const { mission, vision } = siteContent.about;
    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    <RevealOnScroll>
                        <div className="p-8 lg:p-10 rounded-2xl border border-white/[0.06] bg-dark-secondary">
                            <div className="w-12 h-1 bg-primary-500 rounded-full mb-6" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{mission.heading}</h2>
                            <p className="text-zinc-400 leading-relaxed">{mission.text}</p>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.15}>
                        <div className="p-8 lg:p-10 rounded-2xl border border-white/[0.06] bg-dark-secondary">
                            <div className="w-12 h-1 bg-primary-500 rounded-full mb-6" />
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{vision.heading}</h2>
                            <p className="text-zinc-400 leading-relaxed">{vision.text}</p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
